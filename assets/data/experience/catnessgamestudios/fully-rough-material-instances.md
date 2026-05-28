# Fully Rough Material Instances

<notice>

**Unreal Engine Version**: 4.27

</notice>

## Problem

Unreal Engine has a **Fully Rough** flag on `UMaterial` that tells the shader the material's roughness is constant at 1.0. When active, the shader skips roughness texture sampling and related calculations entirely, which saves GPU instructions and a texture sampler which is particularly valuable on mobile and console platforms where both are limited resources.

The problem is that this flag only existed on the base `UMaterial` class. Material Instances had no way to override it, meaning a single base material could not serve both a fully rough and a non-fully rough variant. The only option was to duplicate the material and set the flag at the base level, which increases the number of materials to maintain and the number of shader permutations to compile.

## Solution

The feature extends the Material Instance base property override system to include the Fully Rough flag, following the same pattern that already exists for other overridable properties such as two-sided, blend mode, or shading model.

When the override is enabled on a Material Instance, it takes full control of the fully rough state for that instance, regardless of what the parent material has set. When the override is disabled, the instance inherits the value from its parent, preserving existing behavior.

## Implementation

Two fields were added to `FMaterialInstanceBasePropertyOverrides`:

```cpp
uint8 bOverride_FullyRough : 1;
uint8 bFullyRough : 1;
```

The first acts as an enable flag; the second stores the actual value. When a Material Instance bakes its cached properties, it checks whether the override is active and falls back to the parent if not:

```cpp
if (BasePropertyOverrides.bOverride_FullyRough)
    bFullyRough = BasePropertyOverrides.bFullyRough;
else
    bFullyRough = Parent->IsFullyRough();
```

This works recursively up the instance chain. A Material Instance that inherits from another Material Instance will propagate the value all the way to the base material if no level sets an override.

The flag then flows through the shader compilation pipeline. `FMaterialResource::IsFullyRough()` queries the active instance or the base material, and `SetupMaterialEnvironment` converts the result into the shader compiler define `MATERIAL_FULLY_ROUGH`. The HLSL translator uses this define to skip roughness texture sampling and related instructions in the generated shader.

## Assessment

### Pros

- A single base material can now cover both fully rough and non-fully rough variants through instances, avoiding material duplication.
- The GPU benefit is the same as the original flag on base materials: one fewer texture sampler used and a simpler shader path, which can matter on platforms with tight sampler budgets.
- The override follows the same inheritance chain as other base property overrides, so the behavior is consistent and predictable across nested Material Instance hierarchies.

### Cons / Risks

- Enabling the override on a Material Instance forces a separate shader compilation for that variant. In projects with many Material Instances this can increase shader compilation times and the size of the shader cache.

## Code

<notice>

The full code will be available in the future.

</notice>
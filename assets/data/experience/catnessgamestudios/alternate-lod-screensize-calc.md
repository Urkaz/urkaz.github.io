# Alternate LOD Screen Size Auto-Calculation

<notice>

**Unreal Engine Version**: 4.27

</notice>

## Problem

Unreal Engine determines which LOD to display based on how large a mesh projects onto the screen, using a screen size threshold per LOD level. These thresholds can be set manually by artists or auto-computed by the engine.

Console and mobile platforms typically define a **MinLOD** value that prevents the engine from loading or rendering any LOD with a lower index, effectively capping the maximum quality displayed on that platform to save memory and GPU cost. The problem is that the screen size thresholds are not adjusted when MinLOD changes, remaining at the values originally calculated for the full LOD chain. This means the first visible LOD inherits a threshold that was designed for a higher-quality level, so LOD transitions start later and the visual progression no longer matches the original intent.

For example, with a 4-LOD mesh and MinLOD set to 1:

```
Default (MinLOD = 0):         With MinLOD = 1 (no fix):    With MinLOD = 1 (fixed):
LOD 0 -> LOD 1 at 0.7         LOD 1 -> LOD 2 at 0.5        LOD 1 -> LOD 2 at 0.7
LOD 1 -> LOD 2 at 0.5         LOD 2 -> LOD 3 at 0.2        LOD 2 -> LOD 3 at 0.5
LOD 2 -> LOD 3 at 0.2         LOD 3 -> lowest detail       LOD 3 -> lowest detail
LOD 3 -> lowest detail
```

Without the fix, LOD 1 only starts transitioning at 0.5 instead of 0.7, meaning the mesh stays at its lowest available quality for longer than intended.

## Solution

The feature calculates new screen size thresholds for each platform, shifting them so that the LOD transitions follow the same spacing as in the original chain, even when the first LODs are skipped.

The remapping is straightforward: for a platform with `MinLOD = N`, each LOD index `i` receives the screen size that LOD `i - N` had in the default (all-platforms) calculation. This effectively shifts the transition curve so that the first visible LOD inherits the wide screen range originally assigned to LOD 0, and subsequent LODs follow the same spacing as in the full chain.

```
Example: MinLOD = 2 on Switch
  LOD 2 (Switch) -> gets screen size of LOD 0 (default)
  LOD 3 (Switch) -> gets screen size of LOD 1 (default)
  LOD 4 (Switch) -> gets screen size of LOD 2 (default)
```

The result is stored as per-platform entries in the mesh's `FPerPlatformFloat ScreenSize` array, leaving the default values untouched for platforms with no MinLOD.

## Implementation

A boolean property `bOverrideAutoComputeLODScreenSize` was added to `UStaticMesh`. When set to true, the feature is active for that mesh. It is exposed as a checkbox in the Static Mesh Editor so artists can opt in without touching code.

Two functions were added to `UStaticMesh`:

```cpp
void UStaticMesh::RegenerateScreenSizeOverride();
void UStaticMesh::DisableScreenSizeOverride();
```

**`RegenerateScreenSizeOverride`** iterates all LOD source models and, for each platform that has a MinLOD defined, computes the remapped screen size and writes it as a per-platform override. It is called automatically on `PostLoad` so that overrides are always in sync with the mesh's current LOD data when the project is loaded.

**`DisableScreenSizeOverride`** removes all per-platform screen size entries added by this feature, sets `bOverrideAutoComputeLODScreenSize` to false, and triggers a mesh rebuild to restore the engine's default auto-computed values.

The override is also consumed inside `FStaticMeshRenderData::ResolveSectionInfo`, where per-platform screen sizes are resolved and applied to the final render data for each LOD.

## Assessment

### Pros

- Per-platform screen size overrides are stored alongside the default values, so PC and high-end platforms are entirely unaffected.
- The `bOverrideAutoComputeLODScreenSize` flag gives artists explicit control over which meshes use the feature, and `DisableScreenSizeOverride` provides a clean undo path.
- Beyond visual correctness, the fix also has a direct GPU benefit: because transitions now happen at higher screen size values, lower-detail LODs kick in earlier, meaning fewer polygons are drawn on screen at any given distance. This was one of the original goals of setting MinLOD in the first place, and without this fix that benefit is partially lost.

### Cons / Risks

- If a mesh has poorly generated LODs or LODs with too few polygons, applying this fix causes those levels to appear on screen earlier and at larger sizes than before. Transitions that were previously subtle may become more noticeable, or a LOD level that was acceptable at a small screen size may look visually inadequate when it kicks in earlier.

## Code

<notice>

The full code will be available in the future.

</notice>
# Instancing Tools

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Problem

Instanced Static Mesh Components (ISMCs) render multiple copies of the same mesh in a single draw call, making them a key tool for performance optimization on console and mobile. The problem is that once meshes are baked into an ISMC, individual instances cannot be selected or edited in the Unreal Editor viewport as the component treats them as a single unit. This forces a hard choice between performance and editability: use ISMCs and lose the ability to adjust individual instances, or keep separate actors and pay the draw call cost.

Additionally, converting a level's static mesh actors to ISMCs manually is tedious and error-prone, requiring careful property matching across meshes, materials, shadow settings, and collision.

## Solution

The plugin provides a two-part workflow: batch conversion of static mesh actors to ISMCs, and a per-instance edit mode that temporarily extracts individual instances back into editable actors, then re-integrates them into the ISMC after editing. Both operations are reversible and accessible from the Level Editor context menu via CatnessEditor's framework.

## Implementation

### Instancing workflow

Three conversion modes are available, all registered as Level Editor context menu actions:

- **Instance Selected**: Converts the currently selected `AStaticMeshActor`s to ISMC instances.
- **Instance All**: Converts every static mesh actor in the loaded level.
- **Instance Volume**: Takes a volume actor (trigger, blocking, etc.) and instances all static mesh actors within its bounds, determined via a box overlap trace.

All three converge on `InstanceActors()`, which groups actors by matching properties like mesh, materials, shadow flags, collision settings, virtual textures and custom depth, and for each group either reuses a compatible existing `ACatIns_InstancedMeshActor` in the world or spawns a new one. Original actors are destroyed after their transforms are transferred. The instanced actor auto-renames itself as instances are added or removed (`SM_Rock_42_instances`), making the level outliner easier to read.

<gallery>
    /img/experience/catness/instancing/menu_options.png|Contextual options using the Level Editor context menu via CatnessEditor's framework.
    /img/experience/catness/instancing/batch_instance.png|Some instancing options for bach operations.
</gallery>

### Per-instance editing

The key feature of the plugin is the ability to edit individual instances inside an ISMC. `UCatEd_InstancingManager` (a world subsystem) manages this via a **temporary proxy actor pattern**: instead of editing instances directly inside the component, which Unreal does not support, the plugin temporarily converts a clicked instance into a regular `AStaticMeshActor`, lets the editor handle it normally, and re-integrates it into the ISMC on deselection.

**Enabling Edit Mode** toggles a flag on `UCatEd_InstancingManager` via a context menu action. While active, clicking on an `ACatIns_InstancedMeshActor` in the viewport triggers the following:

```cpp
void UCatEd_InstancingManager::OnObjectSelected(UObject* Object)
{
    if (!GetEditModeEnabled()) return;

    // Find which exact instance was clicked
    TraceUnderCursor(HitResult);

    if (HitResult.Component == ISMC)
    {
        // Extract instance transform and remove from ISMC
        ISMC->GetInstanceTransform(HitResult.Item, Transform, true);
        InstancedActor->RemoveInstance(HitResult.Item);

        // Spawn a transient editable actor in its place
        ACatEd_TempActorInstance* TempActor = SpawnTempActorInstanceFromComponent(...);
        SpawnedActorsWithOwner.Add(TempActor, InstancedActor);
    }
}
```

The temporary actor is marked `RF_Transient` so it is never saved to disk, and a pre-save hook flushes all active temp actors before any level save as a safety measure.

When the user deselects the temp actor, `OnSelectionChanged()` detects it is no longer selected and calls `RestoreMeshActorToInstanced()`, which reads the (potentially modified) transform and properties and re-adds it to the ISMC:

```cpp
void UCatEd_InstancingManager::RestoreMeshActorToInstanced(
    ACatIns_InstancedMeshActor* Owner, ACatEd_TempActorInstance* TempActor)
{
    if (CompareComponentProperties(TempActor->Mesh, Owner->ISMC))
        Owner->AddInstanceFromComponent(TempActor->Mesh);
    else
        FindOrSpawnNewInstancedActorFromMeshActorDefault(TempActor);

    TempActor->Destroy();
}
```

If the user modified the instance's properties (e.g. changed its mesh or material), `CompareComponentProperties()` detects the mismatch and routes the instance to a different or new ISMC instead of the original one. The comparison covers 16 properties: mesh, materials, virtual textures, four shadow flags, custom depth/stencil, four collision properties, and decal reception.

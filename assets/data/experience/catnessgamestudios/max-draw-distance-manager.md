# Max Draw Distance Manager

<notice>

**Unreal Engine Version**: 4.27 - 5.6

</notice>

## Problem

Setting draw distances and culling parameters manually is impractical at scale. Meshes, decals, instanced meshes, and lights each need different treatment, and reasonable values depend on the object's size and the game's rendering budget rather than on designer judgement. Without a systematic approach, draw distances are either left at zero (never culled) or set inconsistently, making it difficult to hit stable performance targets on console.

## Solution

The plugin implements `UMaxDrawDistanceManager`, a `UGameInstanceSubsystem` that automatically calculates and applies draw distances, culling ranges, and shadow settings across all component types when a level loads or on demand. Processing runs on a worker thread with deferred application on the game thread, and an optional originals cache ensures that calling `ForceUpdate` at runtime always recalculates everything from the original values.

The system is configured through `CatnessMaxDrawDistanceManager.ini` with optional per-level overrides, and can be toggled or adjusted at runtime via CVars.

## Implementation

### Async processing

When a level loads, `UMaxDrawDistanceManager` dispatches `FIterateWorldTask` through Unreal's TaskGraph system as a fire-and-forget task on a normal-priority worker thread. The task iterates the actor list and runs all processor calculations. For each result it schedules a small `AsyncTask(ENamedThreads::GameThread, ...)` back onto the game thread to do the actual property writes and mark render state dirty. This split keeps the game thread free during iteration over large levels, with only the final writes touching it.

A level reload or a manual `ForceUpdate` call while the task is still running would produce incorrect results if the in-flight task continued writing to components from the previous level. To prevent this, a static `FThreadSafeCounter CurrentGeneration` is incremented before dispatching any new task. Each task captures the counter at creation and checks it against the current value at every actor iteration; if they differ, the task aborts immediately:

```cpp
// Inside DoTask(), per-actor loop
if (CapturedGeneration != CurrentGeneration.GetValue())
    return; // Abort — a newer task has been dispatched
```

### Originals cache

The originals cache stores the state of each component before the plugin first touched it. This is what makes `ForceUpdate` safe to call multiple times: every processor reads from the cache rather than the current live value, so calculations always start from the true pre-plugin state regardless of how many times the system has run.

Each processor maintains its own cache, keyed by `TWeakObjectPtr` to the component, with a `FCriticalSection` lock for thread safety since game thread writes and worker thread reads can overlap.

Two lifecycle events manage stale entries: `ClearCache` runs when a new persistent level loads, discarding all entries from the previous level; and `SweepStale` runs after garbage collection, removing entries whose `TWeakObjectPtr` has become invalid.

The cache is disabled by default (`bUseOriginalsCache = false`) to avoid memory overhead in shipped builds where `ForceUpdate` is never called at runtime.

### Processor architecture

The plugin has a separate processor class for each component type: `FMeshProcessor`, `FDecalProcessor`, `FLightProcessor`, `FInstancedMeshProcessor`, and `FLightClusterProcessor`. Each follows the same pattern: collect components from the actor, run calculations into temporary data structures on the worker thread, then schedule property writes on the game thread.

#### Mesh and instanced mesh

`FMeshProcessor` handles static and skeletal mesh components. Draw distance is computed from the component's bounding sphere radius. If `LDMaxDrawDistance` is already non-zero, the component is treated as having a designer-set value and is left alone unless `OverrideMaxDrawDistance` is set. The result is clamped to an optional `[MeshMinDistance, MeshMaxDistance]` range.

Small props rarely contribute meaningfully to scene lighting but carry the full shadow cost, so if the bounding sphere diameter falls below `DisableDynamicShadowsSizeThreshold` (default 50 cm), dynamic shadow casting is disabled.

For static meshes, `WorldPositionOffsetDisableDistance` can also be set to stop WPO evaluation beyond a given radius.

`FInstancedMeshProcessor` follows the same projection calculation but outputs a start/end culling distance pair instead of a single draw distance. The start defaults to 80% of the end (`StartCullingDistancePercentage`), creating a gradual fade rather than a hard pop. `AInstancedFoliageActor` is excluded as foliage manages its own culling.

#### Decals

`FDecalProcessor` sets `FadeScreenSize` rather than a draw distance. The processor uses the originals cache to detect whether a decal was left at Unreal's default value (`0.01`) or deliberately configured by a designer.

#### Lights

`FLightProcessor` handles point, spot, and rect lights with three independent calculations:

**Attenuation radius**: the quadratic falloff formula is inverted to find the radius at which a light's candela intensity produces a target density value, normalising effective light reach across the scene. The radius is never enlarged, only shrunk.

**MaxDrawDistance**: computed from the (potentially recalculated) attenuation radius, either via the projection matrix or as a direct multiplier of the radius.

**Shadow casting**: can be disabled globally via `ForceDisableAllShadowCasting`, or per-light based on the same density metric used for attenuation. A dim light with a large radius rarely justifies the shadow cost.

#### Light clustering

`FLightClusterProcessor` reduces light count in dense areas by disabling all but the most significant light in each spatial cluster. A greedy algorithm builds clusters: each unassigned light becomes a seed, pulling in all lights within `LightClusterRadius` (default 500 cm). Clusters below `LightClusterMinSize` (default 3) are skipped. Within each qualifying cluster, only the light with the highest candela intensity stays enabled.

Clustering always runs last in the task, after all actors have been iterated, because it needs the complete set of lights from the level.
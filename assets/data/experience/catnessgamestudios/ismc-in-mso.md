# ISMC in Mobile Software Occlusion

<notice>

**Unreal Engine Version**: 4.27

</notice>

## Problem

**Mobile Software Occlusion Culling** is a technique available in Unreal Engine for mobile platforms that reduces overdraw by determining which objects are fully hidden behind opaque geometry before the GPU renders them. It works by rasterizing a set of occluder meshes into a low-resolution software depth buffer on the CPU, then testing the bounding boxes of other scene objects against it. Objects that fail the test are discarded before any draw calls are issued.

**Instanced Static Mesh Components** (ISMC) store many instances of the same mesh at different positions, rotations, and scales. The occlusion system treated them like any other primitive, using the component's combined bounding box, which spans all instances together, as a single occluder. In a typical scene, that bounding box covers the entire area where the instances are spread, making it enormous so an occluder that large incorrectly marks a large portion of the scene as occluded, causing objects that are actually visible to be discarded and not rendered.

The root cause was architectural: the occluder collection interface was designed for single-mesh primitives. It had no way to iterate over individual instances, apply per-instance transforms, or filter out instances too small to be meaningful occluders.

## Solution

The change extends the occluder collection interface to accept a view reference, and implements per-instance occluder collection for `FInstancedStaticMeshSceneProxy`. Each instance is evaluated individually: its bounding box is scaled by its transform, its projected screen size is calculated against the current view, and only instances large enough to meaningfully occlude other geometry are added as occluders.

## Implementation

The `CollectOccluderElements` method on `FPrimitiveSceneProxy` was extended with an optional overload that receives a `FSceneView`:

```cpp
virtual int32 CollectOccluderElements(FOccluderElementsCollector& Collector, FSceneView& View) const;
```

The view reference gives the collector access to camera position and projection, which are needed to calculate per-instance screen sizes.

`FInstancedStaticMeshSceneProxy` overrides this method and iterates every instance in the component. For each one it:

1. Applies the instance's local transform to the mesh's bounding box to get accurate per-instance bounds.
2. Calculates the projected screen size of that instance using `ComputeBoundsScreenSize`.
3. Skips instances below the minimum screen size threshold (`r.so.MinScreenRadiusForOccluder`, default 0.075), which are too small to usefully occlude anything.
4. Adds the remaining instances as individual occluder elements.

To ensure the instance transform data is available on the CPU (where the software occlusion pass runs), the component is flagged to require CPU-accessible buffer access when `bUseAsOccluder` is enabled.

Because ISMCs can contribute many individual instances, they can push the total occluder count past the engine's limit (`r.so.MaxOccluderNum`, default 150). A new sorting pass was added that, when the limit is exceeded, sorts all collected occluders by distance to the camera and discards the furthest ones, keeping the closest occluders where culling is most effective. This is controlled by the CVar `r.so.SortExtraAndDiscard`.

By default, each instance added counts individually toward the `r.so.MaxOccluderNum` limit, so a single ISMC with 200 instances would consume 200 of the 150-slot budget and trigger the sorting pass on its own. The CVar `ism.CountAsOneInstanceForSoftwareOcclusion` changes this so the entire ISMC counts as a single occluder unit toward the budget regardless of how many instances it contributes, preserving slots for other primitives in the scene.

## Assessment

### Pros

- Fixes a correctness problem that was actively causing visible objects to be discarded due to the oversized combined bounding box.
- The per-instance screen size filter avoids adding occluders too small to be useful, keeping the CPU cost proportional to what actually matters.
- All tuning parameters (`r.so.MaxOccluderNum`, `r.so.SortExtraAndDiscard`, `ism.CountAsOneInstanceForSoftwareOcclusion`) are CVars configurable at runtime per platform.

### Cons / Risks

- Iterating every instance on the CPU adds work proportional to instance count, which can become a bottleneck on large ISMCs. The `ism.CountAsOneInstanceForSoftwareOcclusion` CVar reduces this at the expense of less accurate budget tracking.
- The distance-based sorting does not discard occluders behind the camera before sorting. Those instances consume budget slots but can never contribute to the occlusion buffer for the current frame, so the effective occluder budget is smaller than `r.so.MaxOccluderNum` suggests in scenes where many instances fall outside the view frustum.
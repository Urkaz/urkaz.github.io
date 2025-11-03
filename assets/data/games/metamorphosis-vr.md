# My role

This was one of the most demanding projects in terms of optimization that we had to port at Catness. The target platform was Meta Quest 2, which is less powerful than a Nintendo Switch and required significant graphical and gameplay adjustments.

I joined the team after 1-2 months of development, focusing exclusively on optimizing the different scenes.

## Challenges

### Tricount and MinLOD behavior

One of the main issues the game faced on Oculus Quest 2 was the high triangle count in each scene, which caused the game to run at very low frame rates.

In situations like this, I usually generate LODs for the meshes and adjust the MinLOD property so that the game defaults to using less detailed versions of the models. However, in this particular case, that approach wasn't enough to achieve the desired performance.

In Unreal Engine, LOD transitions are controlled by the Screen Size parameter, which determines when a mesh should switch to a different level of detail. The various Screen Size values can be thought of as circular thresholds surrounding the mesh: as the mesh gets smaller on screen, it crosses these thresholds and switches to lower LODs.

When the MinLOD is changed from 0 to 1, these circular thresholds remain in place, which effectively expands the central area where the highest LOD is displayed. After analyzing and identifying this behavior, I implemented a change so that the thresholds remain consistent while the Screen Size values shift accordingly.

For example, in the default setup:

* LOD 0 → switches to LOD 1 at a Screen Size of 0.7
* LOD 1 → switches to LOD 2 at 0.5
* LOD 2 → switches to LOD 3 at 0.2
* LOD 3 → lowest detail

If MinLOD is changed from 0 to 1, Unreal's default behavior results in the following transitions:

* LOD 1 → switches to LOD 2 at 0.5
* LOD 2 → switches to LOD 3 at 0.2
* LOD 3 → lowest detail

With my modification, the original Screen Size thresholds are preserved instead:

* LOD 1 → switches to LOD 2 at 0.7
* LOD 2 → switches to LOD 3 at 0.5
* LOD 3 → lowest detail

This helped a lot reducing the number of triangles drawn in some scenes (in some cases the amount was reduced by almost 50%), as LOD changed more frequently and near the camera.

### Drawcalls & Instancing

After resolving the triangle count issue, we noticed that the game was still struggling due to a high number of draw calls.

After analyzing the scenes, I developed an Instancing Tool that processes them directly in the Editor and automatically generates new components to handle mesh instancing.

Running this tool converted many static meshes into Instanced Mesh Components, which significantly reduced the overall draw call count and improved performance.

### Sofware Occlusion

Since the game was targeted for a mobile platform, we had to use the Forward Mobile Renderer, which required relying on Software Occlusion to cull distant meshes and reduce the number of rendered objects. However, this also had it's own challenges.

#### Instanced Static Meshes

The first issue we encountered after instancing almost all meshes was directly related to how Instanced Static Meshes were handled by the Software Occlusion algorithm when sorting primitives.

By default, the algorithm iterates through all mesh components in the scene, calculates their screen size, and processes the ones with the largest values first, until either the list is exhausted or a primitive limit is reached.

However, Instanced Mesh Components returned an abnormally large screen size value, representing the combined size of all instances, which caused unpredictable behavior in the algorithm.
Disabling instancing for Software Occlusion wasn't an option, since most of the scene was instanced, and almost nothing would be left for the occlusion process to handle.

To solve this, I modified the Software Occlusion algorithm to prioritize meshes based on their distance to the camera, while also applying a screen size threshold to discard smaller objects.

After several adjustments, I managed to achieve a stable solution that made Software Occlusion functional again, avoiding the default buggy behavior with Instanced Static Mesh Components.

#### Spline Meshes

Another issue with Software Occlusion was related to Spline Meshes. The meshes used by these components were not twisted or deformed to follow the spline during the occlusion process, which resulted in noticeable gaps in the occlusion. In other words, Spline Meshes aren't fully compatible with Software Occlusion, as they don't bend according to the spline shape.

To address this, we developed a tool that bakes spline meshes into static meshes, effectively avoiding this problem.

### Material optimization

After applying all the previous optimizations, the game still needed one final boost to reach our target of 4K resolution at 90 FPS.

To achieve this, I extended the Engine's functionality so that the "Fully Rough" parameter could also be overridden in Material Instances, not just in their parent Materialsm, since this option wasn't available in Unreal Engine 4 by default.

This required modifying the RHI and Material classes to support the new behavior. Once implemented, I manually reviewed every Material Instance in the project to determine whether the Fully Rough setting could be safely enabled.

As a result, many materials significantly reduced their complexity, leading to a noticeable and final performance improvement.

### Final package size and multiple OBB

The final APK was required to be smaller than 1 GB, which made it necessary to split the build into APK + OBB files. In addition, each OBB file also had to remain under 4 GB, adding another layer of complexity to the packaging process.

To handle this limitation, I reorganized the entire project structure so that Unreal Engine would generate multiple smaller .pak files instead of a few large ones. These .pak files were then distributed and merged into several OBB files, ensuring that each one stayed within the size constraints.

This restructuring was managed through Primary Asset IDs, which allowed the engine to properly reference, load, and stream assets across multiple OBB files without breaking dependencies or introducing loading errors.

# My role

This was one of the most demanding projects in terms of optimization that we had to port at Catness. The target platform was Meta Quest 2, which is less powerful than a Nintendo Switch and required significant graphical and gameplay adjustments.

I joined the team after 1-2 months of development, focusing exclusively on optimizing the different scenes.

## Challenges

<warning>Description in progress</warning>

### Polycount MinLOD behavior

Changed MinLOD behaviour to allow early LOD transitions when MinLOD is set to something different to 0.

### Drawcalls & Instancing

Created an Instancing Tool to help instancing all meshes in the scene.

### Sofware Occlusion

#### Spline Meshes

Spline Meshes aren't fully compatible with Software Occlusion, not bending with the Spline.
Created a tool to bake splines as Static Meshes.

#### Instanced Static Meshes

Changed the behavior of how ISMC are processed for Software Occlusion as they are a bit buggy.

### Material optimization

Added a "Fully Rough" override to Material Instances.

### Final package size and multiple OBB

The final APK file had to be less than 1GB, so we needed splitting into APK+OBB files.
I reorganized the entire project so Unreal created multiple smaller .pak files that could be merged into multiple OBB files, all using Primary Asset IDs.

* https://dev.epicgames.com/documentation/en-us/unreal-engine/asset-management-in-unreal-engine
* https://developers.meta.com/horizon/blog/introducing-multiple-expansion-files-for-mobile-rift-and-future-platforms/
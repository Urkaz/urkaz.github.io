# My role

Xuan Yuan Sword 7 is probably the biggest game that got ported in Catness Game Studios, and due to my good performance and results in previous projects, I've got assigned as the main developer for it.

My role here was achieving a good performance on Switch, optimizing GPU, CPU and Memory usage, without losing the original look of the game. Sometimes, when porting a game to consoles, you have to make decisions that have impact in the overall look of the game, but early on I decided that a game like this one should look on Switch as closely as possible to the original one. This caused some discussions in the office, as changing the look in a mor drastic way could made the game run better (like adding more fog or bloom to hide certan flaws), but that wasn't a desirable result for me (but I had to concede it sometimes).

I worked in this project from start to end, and eventually, some coworkers joined me, having to coordinate them and give them a common goal.

## Challenges

### CPU

#### Cloth Physics

One of the first things we noticed about the game was the usage of cloth phyisics in some of the main character outfits. This made the CPU struggle a lot, reducing the fps to 20 when only two simulated clothes were on the screen.

I implemented a frame skipping feature for cloth based on the screen size of the actor, so far away actors executed the cloth simulation less frequently than the main character, but this wasn't enough and it was still consuming a lot of CPU time.

I've reasearched what Unreal 4.24 was using for cloth physics, and it resulted to be the widespread Physics library. The source code and the tools used to compile it for Unreal were available in the source code, so I decided to recompile the entire library, removing some physic steps that weren't needed (some extra safety checks for example) and using the fastmath flag.

With those two changes, I managed to reach an acceptable CPU time, increasing the total of simulated cloths from 2 to 5 before reaching a critical point, leaving room for other CPU tasks.

#### Tick Interval Manager plugin

Some scenes had a big number of enemies around, patroling and awaiting for the player to be near before acting. All those actors were still ticking even if they were outside the player vision or far away.

I created a plugin (which was later used in other projects) that optimized the ticking actors. This plugin checked if the actor was recently rendered and the distance to the player, and applied a reduction of the Tick Interval dynamically to the actor itself and its components.

<gallery>
    /img/games/screenshots/xys7/tickmanager1.png | Distance and visibility configuration.
    /img/games/screenshots/xys7/tickmanager2.png | Tick optimization settings
</gallery>

#### Level streaming

The game seamlessly streams the differents levels while you travel using the Unreal's World Composition system. On Switch those loads caused severe time spikes, causing hitches constantly, interrupting the gameplay.

We considered using a loadign screen when those hitches happened, but that was not a good solution as they would still interrupt the gameplay.

After investigating how the system worked, I managed to reduce those hitches to almost zero by reducing the time budget per frame used for level streaming, reducing the number of actors spawned per frame, and disabling the automatic call to the garbage collector after the level finished streaming (at the cost of consuming more memory).

#### Other optimizations

Other optimizations we applied relied in applying [Profile-Guided Optimizations (PGO)](https://learn.microsoft.com/en-us/cpp/build/profile-guided-optimizations?view=msvc-170) using the built in Unreal tools, which provided us a few extra milliseconds.

I also analyzed the CPU load using the tools provided by Unreal and other propiertary tools by Nintendo. This analysis allowed me to change the affinity of some threads, moving some less time consuming threads out of the cores with more workload, for example.

### GPU

#### Poly count and drawcalls

One of the biggest GPU issues was the high poly count and number of draw calls in every scene. The first step was to generate LODs for the meshes and create proxy meshes using Unreal's HLOD (Hierarchical LOD) system.

<gallery>
    /img/games/screenshots/xys7/hlod.png | A proxy mesh with reduced poly count, and only one material with less details.
</gallery>

This took a lot of manual work as we had to go mesh by mesh to make sure everything still looked decent on Switch, aiming for a balance between visuals and performance. Even then, it wasn’t enough to prevent FPS drops in the heavier scenes.

#### Optimization plugin

During the project, I built a plugin to mass-process actors and tweak their settings for performance. It detects when a level (or sublevel) is loaded and launches an async task that processes all the actors based on the plugin's configuration.

I went with a runtime approach rather than an editor tool, so that we could have different optimization settings per platform, getting more optimized results on Switch than on PS5, for example.

The plugin started off just calculating Max Draw Distance values based on screen size, but grew into something more complete:

- Max Draw Distance: Calculated based on a screen size" threshold. If a mesh already has a "Max Draw Distance", it's only replaced if an override setting is enabled. You can also clamp the values to a min and max range to avoid very big or very small values.
- Disabling Dynamic Shadows for small objects: If an object is below a size threshold, its dynamic shadow gets disabled to save GPU.
- Decal fading: Calculates fade screen size for decals, so they disappear when far or small enough.
- Light tweaking: Scales down the attenuation radius of Point and Spot Lights, and auto-generates their Max Draw Distance and Fade Range.

All of this can be configured globally or per level, allowing more precise optimizations.

<gallery>
    /img/games/screenshots/xys7/mddm1.png | Main config, allowing per level settings.
    /img/games/screenshots/xys7/mddm2.png | Mesh "Max Draw Distance" calculation settings using the "Screen Size" as threshold, and disabling the shadows of small objects.
    /img/games/screenshots/xys7/mddm3.png | Before and after applying the "Max Draw Distance"Manager calculations to a PointLight with the default settings.
</gallery>

#### DeviceProfile and CustomProfile plugin

We tweaked the SwitchDeviceProfile a lot, disabling both major and minor features to get every bit of performance we could. But I wanted a more flexible system, so I made another plugin: the CustomProfile plugin.

The plugin let us create additional profiles and apply them dynamically in specific scenes or levels by demand. It works like a stack: when a custom profile is pushed, it stores the original CVar values and applies the new ones. When all profiles using a specific CVar are popped, the original value is restored and freed.

This system let us apply multiple profiles at once, even if they changed the same CVars. It also had support for Switch changes between docked and handheld mode without losing any modified CVars.

In the example below (which is not a Profile used in the game), there are two custom profiles: one for cinematics, and another that's applied in a specific scene of a specific level:

```ini
[Cinematic DeviceProfile]
DeviceType=Switch
BaseProfileName=

+CVars=r.SecondaryScreenPercentage.GameViewport=70
+CVars=r.DynamicRes.MinScreenPercentage=30

[Level5Scene12 DeviceProfile]
DeviceType=Switch
BaseProfileName=

+CVars=r.DefaultFeature.AmbientOcclusion=1
+CVars=r.DefaultFeature.MotionBlur=1
+CVars=r.DynamicRes.OperationMode=1
```

#### Other GPU optimizations

Some of the original post-processing effects were removed due to their high performance cost.

We also reimplemented a more efficient Depth of Field effect using [BokehDOF](https://www.adriancourreges.com/blog/2018/12/02/ue4-optimized-post-effects/#ue4_bokehdof), since the cheaper alternatives were deprecated in Unreal Engine 4.24 in favor of the Cinematic ("Diaphragm") DOF, which proved to be highly inefficient on the Nintendo Switch.

To improve performance and visual quality, we replaced real-time Screen Space Reflections with baked Reflection Captures, achieving more stable and accurate reflections than in the original game or other versions while using a more optimized approach.

For further performance gains, we enabled Distance Field Shadows instead of relying on fully real-time Cascaded Shadow Maps. Additionally, we had to disable the foliage wind effect, as all the alternatives we tested to keep it active resulted in significant GPU overhead. Ultimately, removing it was the only viable solution.


# My role

Xuan Yuan Sword 7 is probably the biggest game that Catness Game Studios has ported, and thanks to my good performance and results in previous projects, I was assigned as the main developer for it.

My job was to get the game running smoothly on Switch, optimizing GPU, CPU, and memory usage without compromising the original look of the game. When porting to consoles, you often have to make choices that affect how the game looks overall, but from the start, I felt that a game like this deserved to look on Switch as close as possible to the original from PC. That led to some internal debates, since taking more drastic visual shortcuts (like adding extra fog or bloom to hide some flaws) could have improved performance, but for me, that wasn’t the right direction (though I did have to give in sometimes).

I worked on the project from start to finish. Eventually, a few coworkers joined in, and I had to coordinate with them and make sure we were all working towards the same goal.

# Challenges

## CPU

### Cloth Physics

One of the first issues we noticed was the use of cloth physics in some of the main characters' outfits. It hit the CPU hard as just two simulated cloth elements on screen could drop the framerate to 20 FPS.

I added a frame-skipping system for cloth, based on how big the character appears on screen. This meant faraway characters ran their cloth simulation less often than the main character. But even with that, CPU usage was still too high.

I looked into what Unreal 4.24 was using for cloth physics and found it was based on the NvCloth library. The source code and the build tools were included in the engine, so I recompiled the whole library, removing some unnecessary physics steps (like extra safety checks), and enabled the fastmath flag.

With those two changes, I managed to cut CPU usage enough to support up to five cloth elements on screen instead of two, freeing up CPU resources for the rest of the game.

### Tick Interval Manager plugin

Some scenes had tons of enemies patrolling or waiting for the player. All those actors were still ticking, even if they were far from the camera or off-screen.

So I created a plugin (which ended up being reused in other projects) that dynamically adjusted tick intervals. It checked whether each actor had been rendered recently and how far it was from the player, and adjusted both the actor's tick rate and its components accordingly.

<gallery>
    /img/games/screenshots/xys7/tickmanager1.png | Distance and visibility configuration.
    /img/games/screenshots/xys7/tickmanager2.png | Tick optimization settings
</gallery>

### Level streaming

The game uses Unreal's World Composition system to stream levels seamlessly as the player moves through the world. But on Switch, that caused severe frame spikes, with constant hitches that interrupted gameplay.

We thought about adding a loading screen when streaming happened, but that wouldn't really solve the problem as it would still break immersion.

After digging into how the system worked, I managed to reduce those hitches to almost nothing by lowering the streaming time budget per frame, limiting how many actors could spawn at once, and disabling the automatic garbage collection after each level finished streaming (which did increase memory usage a bit, but was worth it).

### Other optimizations

We also used [Profile-Guided Optimizations (PGO)](https://learn.microsoft.com/en-us/cpp/build/profile-guided-optimizations?view=msvc-170) via Unreal’s built-in tools, which helped us squeeze out a few extra milliseconds.

On top of that, I analyzed CPU load using both Unreal's profiling tools and Nintendo's proprietary tools. That helped me reassign some thread affinties to improve overall performance, moving lighter tasks off the most loaded cores, for example.

## GPU

### Poly count and drawcalls

One of the biggest GPU issues was the high poly count and number of draw calls in every scene. The first step was to generate LODs for the meshes and create proxy meshes using Unreal's HLOD (Hierarchical LOD) system.

<gallery>
    /img/games/screenshots/xys7/hlod.png | A proxy mesh with reduced poly count, and only one material with less details.
</gallery>

This took a lot of manual work as we had to go mesh by mesh to make sure everything still looked decent on Switch, aiming for a balance between visuals and performance. Even then, it wasn’t enough to prevent FPS drops in the heavier scenes.

### Optimization plugin

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

### DeviceProfile and CustomProfile plugin

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

### Other GPU optimizations

Some of the original post-processing effects were removed due to their high performance cost.

We also reimplemented a more efficient Depth of Field effect using [BokehDOF](https://www.adriancourreges.com/blog/2018/12/02/ue4-optimized-post-effects/#ue4_bokehdof), since the cheaper alternatives were deprecated in Unreal Engine 4.24 in favor of the Cinematic ("Diaphragm") DOF, which proved to be highly inefficient on the Nintendo Switch.

To improve performance and visual quality, we replaced real-time Screen Space Reflections with baked Reflection Captures, achieving more stable and accurate reflections than in the original game or other versions while using a more optimized approach.

For further performance gains, we enabled Distance Field Shadows instead of relying on fully real-time Cascaded Shadow Maps. Additionally, we had to disable the foliage wind effect, as all the alternatives we tested to keep it active resulted in significant GPU overhead. Ultimately, removing it was the only viable solution.

## Memory

One of the main limitations we faced was the memory, since the Nintendo Switch only has 3GB available. The game used Unreal's World Composition system, which automatically loaded levels based on the player's distance. However, this ended up loading more levels than necessary, leading to out-of-memory crashes. To fix it, I adjusted several parameters and added custom conditions to the engine code to limit the number of levels loaded at once, significantly reducing memory usage.

I also analyzed memory consumption using tools like Memory Profiler 2, MemPro, and some simple custom tools I created. This helped identify and fix several memory leaks that were causing crashes.

Additionally, I disabled Unreal's Memory Cache system. While it can help reduce fragmentation and system calls, in our case it consistently increased memory usage, pushing the game over the limit. Disabling it reduced overall memory usage and improved stability.

## Compression

The initial builds of the game for Nintendo Switch were over 36GB, while the client needed it to fit on a 16GB cartridge.

After analyzing the project, I removed unused assets that were being referenced by default through the Primary Assets system, which significantly reduced the build size. I also compressed and re-encoded the video files using the same Criware Middleware (Softdec2) used in the original game.

Additionally, I backported some of the latest Oodle compression improvements from Unreal Engine 4.27 to our version (4.25), ultimately bringing the final build size down to 9.5GB.

## Engine version and Nintendo Switch SDK

The original project used Unreal Engine 4.24, which had limited support for Nintendo Switch and a different platform structure compared to what we were used to in other projects.

We initially upgraded the project to 4.25 and later to 4.26 to take advantage of the latest platform improvements and SDK updates. However, due to project-specific constraints, we ultimately had to stick with Unreal 4.25, which did not support the latest Nintendo SDK.

To resolve this, I backported several platform-related changes from versions 4.26 and 4.27 into 4.25, allowing the game to be built and run properly with the latest Nintendo Switch SDK.

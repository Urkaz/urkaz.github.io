# My role

This was my first project at Catness Game Studios. I was solely responsible for porting the game to Nintendo Switch, which involved analyzing the existing codebase, applying CPU and GPU optimizations, and improving engine-level systems.

## Challenges

### Memory and loading times

The project was brought to Catness after a previous studio was unable to fit the game within the Switch's 3GB memory limit. Upon investigation, we discovered that most game content was hard-referenced, which caused all procedural rooms and enemies to be loaded at startup.

I replaced around 75% of these hard references with soft references, enabling assets to be loaded at runtime, with asynchronous loading where possible. This significantly reduced the initial loading time and also improved the in-game load performance, although it still remained slower than the original version on other platforms.

### Loading screen plugin

To support the new asynchronous loading system, I developed a custom loading screen plugin (later reused in other projects) which using Unreal Engine's MoviePlayer system. The plugin also allowed music or sound effects to be played during loading, enhancing the player experience.

### Performance

While the game initially ran decently on Switch, two major issues impacted performance:

* Excessive use of dynamic lights.
* Heavy frame drops during procedural room generation.

#### 3D Light Max Draw Distance

The first optimization involved limiting dynamic lights using "Max Draw Distance" and "Max Distance Fade Range", but the default spherical approach wasn't precise enough for the compact rooms in the game.

To solve this, I extended the engine's light system to support a 3D vector-based "Max Draw Distance". This allowed for fine-tuned control of light influence volumes, significantly improving performance in enclosed areas.

<gallery>
    /img/games/screenshots/firegirl/maxdrawvector.png | A new 3D vector-based "Max Draw Distance" configuration for lights
    /img/games/screenshots/firegirl/maxdrawvectorvolume.png | Debug visualization showing the adjusted lighting volumes
</gallery>

#### Procedural Room Spawn Optimization

Procedural rooms were built using Blueprints containing large numbers of pre-placed, randomly selected elements. Some rooms spawned over 100 components, including meshes and child actors, causing severe frame drops.

To address this, I rewrote the room spawning logic to stagger the instantiation of components over multiple frames. Thanks to this change, rooms were spawned in a much more controlled manner, significantly reducing frame drops. However, minor stutters still occurred whenever a new room was loaded.

I had planned to continue optimizing this system further, but due to tight deadlines, we had to release the game with those small performance hiccups still present.
# My role

This was my first assignment in Catness Game Studios. I worked porting this game to Nintendo Switch in solitary, analyzing the code, performing CPU and GPU optimizations, and improving the engine code.

## Challenges

### Memory and loading times

The project came to Catness Game Studios as a result of another company not being able to fit the game in the Switch memory (3GB). We analyzed the game and how it was build, and noticed that the game had all assets hard referenced in most parts of the game, making it load every single procedural room and enemy on the initial load.

I changed almost the 75% of hard references with soft references that got loaded in runtime when needed, some asynchronously when the game allowed it. By doing this the initial loading time was reduced a lot, and removing the references also made all levels load faster, but still slow compared to the original game.

### Loading screen plugin

Related to the previous point, I developed a loading screen plugin (that was reused in the future in other games) to display asynchonous loading screens using the 
Unreal MoviePlayer loading screen implementation.

Additionally, the plugin allowed playing an audio or music during the loading screen.

### Performance

The game ran at a decent performance, but it had 2 problems:

* It used a lot of dynamic lights everywhere.
* The spawning of some procedural rooms caused severe framedrops.

#### 3D Light Max Draw Distance

The main optimization applied to the lights was the usage of the "Max Draw Distance" and "Max Distance Fade Range", but it was still enough due to the spherical nature this optimization has.

I modified the implementation of all lights "Max Draw Distance" to allow using a 3D distance instead of using a circular radius. This allowed me fine tweaking all lights in the game and reduce the turned on area to the minimum needed for the compact rooms, getting a substantial FPS boost.

<gallery>
    /img/games/screenshots/firegirl/maxdrawvector.png | A new "Max Draw Distance" config for lights using a 3D vector
    /img/games/screenshots/firegirl/maxdrawvectorvolume.png | The visualization of that config
</gallery>

#### Spreading the spawns

The game procedurally generates rooms, but those rooms are already prebuilt in Blueprints with elements that get randomly selected each time a room is spawned. Some rooms had more than 100 elements to spawn, including child actors, causing severe framedrops.

To achieve this I rewrote the code of the rooms, reducing the framedrops a lot by spawning the components, child actors, meshes, etc, in several frames instead of doing it in a single one.

With this change, the rooms spawned in a more controlled way, but they still caused small framedrops. I wanted to keep optimizing this part of the game, but due to time constraints, the game released with small frame drops each time a new room spawns.
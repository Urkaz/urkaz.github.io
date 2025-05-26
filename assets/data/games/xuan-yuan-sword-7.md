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


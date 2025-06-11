# Overview

This project was developed in Unreal Engine 4 as the final assignment for the "Master's degree in Videogame Programming" at U-Tad. We simulated the real-world development of a video game, collaborating with students from the Art and Design master's degrees and a professional game producer from the industry. The process followed a standard production pipeline, beginning with idea selection, followed by prototyping, and concluding with a full production phase.

# My role

I was appointed as the programming team representative in all meetings, acting as the main point of communication between the programmers and the design and art departments. I also coordinated task tracking during our daily meetings and helped maintain clear, ongoing communication between almost everyone involved in the project.

On the technical side, I was responsible for:

- Designing and implementing the game world generation and destruction systems.
- Developing an internal tool to help designers create the world more efficiently.
- Programming the fog of war effect.
- Creating and integrating in-game props.
- Implementing all UI elements related to costume selection, level selection, inventory, and the in-game HUD.

## Challenges

### Game World

I was responsible for designing and implementing the classes and structures that represented the game world, from the very beginning of development all the way through to the final version. This system was a core component of the game and evolved over time to incorporate additional functionality required by the other teams (Programming, Design, and Art).

The game world was built using a structure we referred to as "the Grid". This Grid was composed of Chunks, which were rectangular sections of the map representing prebuilt areas. Each Chunk, in turn, consisted of multiple Tiles, individual cubes that served as the smallest building blocks of the world.

<gallery>
    /img/games/screenshots/rhs/grid.png | The entire Grid
    /img/games/screenshots/rhs/chunks.png | A small Grid of 2x2x3 Chunks.
    /img/games/screenshots/rhs/tile.png | A single Tile
</gallery>

#### Optimizing Grid Rendering

Because ot this, we decided to change how the Grid was structured for the final game, making it a single Actor with multiple [Instanced Mesh Components](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine) (one for each different mesh, rendering all identical meshes in a single pass). The Instanced Mesh Component approach made the game run at very conmfortable FPS, significantly improving performance in every aspect. The Tiles ended being UObjects that only stored data.

To resolve this, we restructured the Grid for the final version of the game, implementing it as a single Actor containing multiple Instanced Mesh Components[Instanced Mesh Components](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine). This allowed all identical meshes to be rendered in a single draw call per type, drastically improving performance and ensuring stable, high frame rates. As a result, Tiles were converted into lightweight UObjects that only stored data, completely separating rendering from logic.

#### Tile Destruction System

Tile destruction introduced an additional layer of complexity to the Grid system, leading to two main challenges:

- Whenever a tile was destroyed, its neighboring tiles needed to be regenerated to ensure the pathfinding system could correctly recognize and navigate through the newly created gap when permitted.
- As mentioned earlier, Tiles were implemented as data-only UObjects, and one of their stored properties was the index of their corresponding mesh instance in the Instanced Static Mesh Component. The issue arose when removing a single instance: doing so would shift the indices of the remaining instances (e.g., deleting the first tile in a list of five would invalidate the stored indices of all subsequent tiles). To address this, we developed a custom Instanced Mesh Component class capable of handling these index changes safely. Additionally, when a tile is destroyed, the resulting debris is spawned as a separate Actor that contains a copy of the original tile, but uses a Destructible Mesh generated with[Apex Destruction](https://dev.epicgames.com/documentation/en-us/unreal-engine/apex?application_version=4.27).
- Destroying tiles required handling things like removing attached Props or making Entities fall if they were standing on them.

#### Data-Driven Tiles

Tiles are entirely defined by data stored in a Data Table, with each row representing a different type of tile. This setup gave artists and designers full control over the visual customization of each tile.

Beyond that, tiles could also include additional elements like Props, Entities, or Elements.

Tiles could be destroyed, though some special ones were protected (at the designer's discretion, see Map Tool below).For example, Bedrock tiles were indestructible, while Foundation tiles spawned a new tile when broken (for example, to represent the foundation of a destroyed building).

<gallery>
    /img/games/screenshots/rhs/tiletypes.png | The Tile types data table
    /img/games/screenshots/rhs/tiledt1.png | The properties of a single Tile
    /img/games/screenshots/rhs/tiledt2.png | The configurable visual representation of a single Tile
</gallery>

#### Fog of War

The final big challenge in the game world was implementing the Fog of War. After exploring several approaches, I went with a 2D system where each unit's vision was represented as a cylinder.

It used a dynamic texture that the code updated in real time, painting areas black or white depending on visibility, with support for a separate "explored" state between visible and hidden zones. This texture was then applied using a custom post-processing material I created.

The system ended up being almost standalone, easily reusable in other projects with minimal changes.

<gallery>
    /img/games/screenshots/rhs/fogofwar.png | The discovered area in the game map is the same area with white pixels from the texture in the post-process material.
</gallery>

#### Props

Props were decorative but interactive objects attached to Tiles, capable of triggering abilities via our Ability System when destroyed. Props can be attached to any of the six sides of a Tile, so if the Tile is destroyed, the attached Props are destroyed as well.

Their implementation went through several iterations as requirements evolved, but after close collaboration with the Design and Art teams, we made them Blueprint-implementable. The core logic was handled in code, which then called events on the Blueprint side, allowing designers and artists to add their own behavior. This made it possible to create more complex Props with components like lights, sound, and VFX, while still ensuring they responded properly to different situations.

<gallery>
    /img/games/screenshots/rhs/prop.png | The prop with 2 meshes, partices and sound.
    /img/games/screenshots/rhs/propcode.png | The blueprint code that managed the showing and hiding of the prop, made by the designers and art teams.
</gallery>

### Map tool

The Map Tool is an Engine module that includes all the code needed to give designers a way to build the different parts of the game world, called "Presets" in our project, which are essentially individual buildings composed of multiple chunks.

By clicking a custom button added to the editor toolbar, designers could open the tool, which launched two editor tabs, each with its own editor widget:

- One tab showed a complete list of the Tiles from the Data Table mentioned earlier (see "Data-Driven Tiles"). Each Tile appeared as a button with a visual preview of its mesh and default materials. Clicking on one would spawn it as an actor in the editor viewport.
- The other tab provided various tools for manipulating the spawned Tiles, managing the current selection, and adjusting visibility. It also allowed designers to load, save, and delete Presets from the Data Table.

<gallery>
    /img/games/screenshots/rhs/maptool.png | Two new tabs are opened when using the Map Tool. One in the left with different tools and controls. One in the bottom panel with a list of all existing Tiles.
</gallery>

#### Editor Tiles

The spawned Tiles are a special class of Tile that exists only within the Map Tool. They are programmed to snap to the grid when moved using the engine's standard actor manipulation tools and to respond dynamically to all property changes made by the designers.

All available properties for a Tile are accessible and editable from the Details panel, with bits of customization to prevent changes to values that depend on other properties (or example, the "Foundation" settings can only be edited if "Is Foundation" is enabled, and enabling "Is Foundation" disables the "Is Bedrock" option). When a property is modified, the Tile updates in real time, changing shape, colors, or spawning new elements to visually reflect the change in the editor.

<gallery>
    /img/games/screenshots/rhs/maptooltile.png | A Tile in the Map Tool with multiple properties changed by the designers (a prop, spawn point, element, etc).
    /img/games/screenshots/rhs/maptooltileproperties.png | All editable properties are accessible from the Details panel when selecting the Tile in the Editor.
</gallery>

Another feature I implemented for the Map Tool is full compatibility with the Undo/Redo system. All changes made to a Tile, regardless of how they are made, are transactional and fully support Undo/Redo. a functionality that the engine doesn't provide by default for custom actors like these.

#### Helping the designers

Working closely with the design team, I developed and added new features based on their feedback.

One of these features was the inclusion of various visual hints, some of them toggleable, to help them better visualize the world they were creating. These included bounding boxes for special Tiles, Chunks, and Props, as well as small spheres representing Enemy and Player spawn points.

After testing the first creations made with the tool, I also implemented a system to detect duplicate Tiles as a form of data validation before saving a Preset to the Data Table. In addition to showing an error message and highlighting the duplicates with a red bounding box, I created a dedicated folder in the World Outliner to help designers quickly locate the duplicate Tiles by just clicking them there.

<gallery>
    /img/games/screenshots/rhs/maptoolhelpercontrols.png | Visual hints for the designers
    /img/games/screenshots/rhs/maptoolduplicatefinder.png | Detection of duplicate tiles when saving the Preset
</gallery>

#### Saving and loading

Finally, the tool allows Presets (the set of Tiles placed by the designers, along with all their properties) to be stored in the Chunks Data Table, which is used during gameplay to populate the grid with content.

When the Save button is pressed, and the Preset is valid (i.e. contains no duplicate Tiles), the menu switches to a new interface with multiple selectors for Gameplay Tags. These tags are used by the Procedural Generator to populate the grid, so I collaborated closely with other developers to ensure the tool met their requirements too.

<gallery>
    /img/games/screenshots/rhs/pcgconnectioneditor.png | When saving a Preset, the menu changed to a different one allowing to select the GameplayTags used by the Procedural Generation amongst other properties.
    /img/games/screenshots/rhs/chunkstable.png | The Preset data is stored in a Data Table used by the Procedural Generator to feed the Grid with data.
</gallery>

### UI programming

I was responsible for programming most of the menus and UIs. This was my first time working with Unreal's UMG system, but I focused on creating small, reusable widgets for everything (tooltips, icons, character portraits, progress bars, etc). These widgets were spawned dynamically when needed, rather than being pre-placed in parent widgets, to avoid loading unnecessary elements.

Below is a brief description of each menu along with some screenshots.

#### Girl Costume Selection UI

This menu was somewhat challenging to implement, as it required the girls to always be visible on screen with changeable costumes. Loading and spawning Skeletal Meshes each time a costume was selected took too long, so I created a special character that preloaded all costumes and kept them synced with the same animation. This way, selecting a costume simply involved hiding the previous one and showing the new one. The girls were displayed in the UI using a render target.

After the selection was confirmed, a transformation animation was played. This reused the special characters with all Skeletal Meshes already loaded, allowing a seamless transition with additional decorative effects.

<gallery>
    /img/games/screenshots/rhs/costume1.png | Costume selection menu, hovering a costume shows a comparison of their stats.
    /img/games/screenshots/rhs/tr1.png | Transformation sequence after confirming the costumes.
    /img/games/screenshots/rhs/tr2.png | Transformation sequence after confirming the costumes.
</gallery>

#### Level Selection UI

The level selection UI was based on a metro network map. Missions were generated procedurally (by another programmer), so I had to read that data and generate the UI accordingly. The main challenge was figuring out how to spawn elements in the correct positions dynamically, since each game run had different missions and connections.

<gallery>
    /img/games/screenshots/rhs/metro1.png | An example of dynamically created level selection menu.
    /img/games/screenshots/rhs/metro2.png | Another example of dynamically created level selection menu.
    /img/games/screenshots/rhs/metro3.png
</gallery>

#### Inventory UI

The inventory menu displayed each girl's stats and abilities, and allowed equipping gems that would alter those stats in real time. Gems were equipped using a simple drag-and-drop system from the "Inventory" area to the "Equipped Gems" section. The girl's image was shown via a render target of a spawned character placed somewhere in the background.

<gallery>
    /img/games/screenshots/rhs/inventory1.png | Gem descriptions and stats changes.
    /img/games/screenshots/rhs/inventory2.png | Drag and drop of gems.
    /img/games/screenshots/rhs/inventory3.png | Insufficient magic points.
</gallery>

#### Game HUD

The game HUD is the player's main source of information during gameplay. I created multiple widgets that I reused for other menus, including portraits, bars, tooltips, buttons, status icons, and more. The HUD also included buttons to interact with the Grid on the right side, allowing players to change its visualization.

One of the most challenging parts of the HUD was displaying the small health bars and their related ailments. All elements in these bars were synchronized with many in-game events, so they needed to react properly and play animations to help players understand what was happening. These bars were particularly tricky because triggering animations through event-driven logic sometimes caused crashes due to synchronization issues between animations and the game's internal state.

<gallery>
    /img/games/screenshots/rhs/hud1.png | Main HUD of the game.
    /img/games/screenshots/rhs/hud2.png | Example of the mini health bars, ailments, and damage numbers.
    /img/games/screenshots/rhs/hud3.png | Start turn notice.
</gallery>

#### Results and Progression

After finishing a mission, the player received rewards and could level up the girls if they had earned enough experience during battle. At the end of a run, players also received items and unlocked new costumes for the girls through our progression system.

Both of these menus were relatively simple to implement and reused many of the widgets already created for the previous menus.

<gallery>
    /img/games/screenshots/rhs/results1.png | Results screen after finishing a mission.
    /img/games/screenshots/rhs/results2.png | Level up screen.
    /img/games/screenshots/rhs/progression1.png | Run progression screen, unlocking things for the next run.
    /img/games/screenshots/rhs/progression2.png | Rewards notification.
</gallery>

# Game Description

## Game Features

### Combine the elements

The group of girls can combine the elements (earth, water, fire and wind) to create new elements in the enviroment. All the elements apply different effects that affect the girls or the enemies. Watch where do you place a new element!

### Customize the girls

Select the costumes at the beginning of every run. Each of the costumes brings the girls an element and two unique abilities. Upgrade the stats of the girls when they level up in the run. Upgrade the costumes with the trophies of the fallen enemies. Equip the team with magical gems that can increase their capacities and also bring them new abilities.

### Break the environment

Destroy the city of Otakio to modify the battlefield or just because it's really fun to break the public property. Create new paths to explore the map and also get some rewards for entering in the buildings.

### Controls
- Move camera: W,A,S,D // Mouse Right Button
- Rotate camera: Q,E // Mouse Center Button
- Center camera on selected girl: SPACE
- Change zoom: Mouse Wheeel up/down
- Select option in GUI: Mouse left Button
- Combat Inspector: I // Shift
- Sight Level: RePag - AvPag // CRTL + Mouse wheel
- Pass Turn: ENTER
- Open Pause Menu: ESC // P
- Change selected girl: CRTL + 1/2/3/4 // TAB
- Jump ability: 1
- Girl first ability: 2
- Girl second ability: 3
- Gem Ability: 4
- Element Finisher: 5
- Chaos Finisher: 6

# Credits

## Art

- Ana Dasí Martínez
- Beatriz Rodríguez Fernández
- Emilio Parra Valle

## Programming

- Alfonso Torres Sánchez
- Diego Muñoz Martín
- Diego Vázquez Garrido
- Francesc Sánchez Rodrigo
- Jorge de Paz Cabañas
- Marcos Pérez González
- Sergio Jiménez Galiana
- Eduardo Urdaneta Cacheiro
- Adrián Delgado del Sol

## Game Design

- Xabier Villanueva Loureiro
- Carlos Martínez Ortega
- Fernando Palazuelo Ginzo
- José Andrés Lazareno Casado
- Luis Sagastibelza González
- Felipe Uemura Brito-Pedro

## Sound

- Joe Sturges
- Álvaro Valencia de Gracia

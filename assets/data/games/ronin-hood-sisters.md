# Overview

Made with Unreal Engine 4 as the final project for the "Master's degree in Videogame Programming" at U-Tad. We worked simulating the real production of a videogame, altogether with students from the Art and Design master's degrees from U-tad, as well as a game Producer from a real company. Starting from an idea selection, through a prototype phase and then a production phase.

# My role

I was designated as the representative of the programming team for all meetings, coordinating all programmers with the design and art team, and keep track of tasks during the dailies, keeping an active communication between almost everyone involved in the project.

For the programming part, I was in charge the generation and destruction of game world, and the development of a tool to help the designers with the creation of it. I also did the programming od the fog of war effect, the props, and the UI from level selection menu, from the inventory, and the in-game HUD.

## Challenges

### Game World

I was in charge of creating the classes and structures that represented the game world from the beggining to the end of the end of the development. This is a core element for the game and evolved through the time to add extra functionalities that all the other teams needed (Programming, Design and Art).

The game world is composed by something that we called "the Grid". At the same time, the Grid is made up of Chunks, rectangular areas of the map that represented prebuilt areas. And furthermore, each Chunk is made of Tiles, cubes that represent the minimal unit of the world.

<gallery>
    /img/games/screenshots/rhs/grid.png | The entire Grid
    /img/games/screenshots/rhs/chunks.png | A small Grid of 2x2x3 Chunks.
    /img/games/screenshots/rhs/tile.png | A single Tile
</gallery>

#### The Grid

One of the challenges that we faced in one of the first prototypes was the rendering of all tiles. We tried approaching them as 1 tile = 1 actor, but that made the game struggle a lot on the render thread as each mesh was generating multiple draw calls (and in a flat surface we already had 2.401 tiles each with its own mesh!).

Because ot this, we decided to change how the Grid was structured for the final game, making it a single Actor with multiple [Instanced Mesh Components](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine) (one for each different mesh, rendering all identical meshes in a single pass). The Instanced Mesh Component approach made the game run at very conmfortable FPS, significantly improving performance in every aspect. The Tiles ended being UObjects that only stored data.

The tile destruction added one level of complexity to the Grid, generating two different problems:

- Each time a tile was destroyed, the neighbors of that tile had to be regenerated to allow the patfinding pass through the new hole when allowed.
- As mentioned earlier, Tiles were only UObjects that store data. One of those variables was the index of its mesh in the Instanced Static Mesh. Removing a single instanced from an Instanced Mesh changed the indexes from the list (for example, removing a tile in the first position from a list of 5 elements made all stored indexes invalid). To fix this we had to create an special Instanced Mesh Component class that handled this special case. Additionally to the removal, the rubble that appears from a destoyed tile is created from a new spawned actor that contains a copy of the tile, but with a Destructible Mesh generated with [Apex Destruction](https://dev.epicgames.com/documentation/en-us/unreal-engine/apex?application_version=4.27).

#### Tiles from Data

The Tiles are 100% made from data contained in a Data Table. Each tile is represented by a different row, allowing visual customization for the artists and designers.

In addition to this, a tile could contain other things, like Props, Entities or Elements.

A tile can be destroyed, but some special tiles are protected against destruction (at the designer's discretion, see Map Tool below). We had Bedrock tiles, that were completely indestructible, and Foundation tiles, that spawned a new Tile when destroyed (for example, to represent the foundation of a destroyed building). Tile destruction was another challenge, as it had to for example, handle the destruction of all attached props, or make Entities fall if they were standing on it.

<gallery>
    /img/games/screenshots/rhs/tiletypes.png | The Tile types data table
    /img/games/screenshots/rhs/tiledt1.png | The properties of a single Tile
    /img/games/screenshots/rhs/tiledt2.png | The configurable visual representation of a single Tile
</gallery>

#### Fog of War

The last challenge in the game world was the implementation of the Fog of War. After analyzing multiple solutions I ended implementin a 2D system where the vision of the units was a cylinder.

It used a dynamic texture that the code painted black or white depending on the vision, with the capability to have an explored area between the real vision and the undicovered area. That texture was then applied and rendered in a postprocessing material that myself created.

The system was almost standalone, ready to be used in any other project with minimal changes.

<gallery>
    /img/games/screenshots/rhs/fogofwar.png | The discovered area in the game map is the same area with white pixels from the texture in the postprocess material.
</gallery>

#### Props

The Props are decorative objects that can be placed on Tiles. They can also be destroyed like the Tiles, but they activate an ability from the Ability System (made by other programmers) to generate an effect. They can be attached on each of the 6 sides of the Tiles, so if the containing tile was destroyed, the Props attached to it are destroyed too.

The implementation of the Props changed multiple times as they requirements and needs changed, but after working closely with both the Design and Art teams, we made them as Blueprint implementale objects. The code managed all the complex code and then called specific events in the Blueprint side where the designers and artists could add extra code. This allowed creating more complex props with more Actor Components (lights, sounds, VFX, etc) that still reacted accordingly to each situation.

<gallery>
    /img/games/screenshots/rhs/prop.png | The prop with 2 meshes, partices and sound.
    /img/games/screenshots/rhs/propcode.png | The blueprint code that managed the showing and hiding of the prop, made by the designers and art teams.
</gallery>

### Map tool

The Map Tool is an Engine module that contains all code that provides the designers with a tool to create the different parts of the world (called "Presets" in our game, consisting on individual buildings made of multiple chunks).

Using a cutom button in the editor toolbar, the designers could open the tool, which opened two editor tabs containing on editor widget each:

- The first one of the tabs contains a full list of the Tiles existing in the Tiles Data table mentioned earlier in the Tiles from Data section, being each tile a button with a visual representation of the mesh with all its default materials. Clickin on a Tile spawns it in the editor viewport as an actor.
- The other one contains multiple useful controls for manipulating the spawned tiles, the current selection and teir visibility. It also allows loading, saving and deleting presets from the data table.

<gallery>
    /img/games/screenshots/rhs/maptool.png | Two new tabs are opened when using the Map Tool. One in the left with different tools and controls. One in the bottom panel with a list of all existing Tiles.
</gallery>

#### Editor Tiles

The spawned tiles are a special class of Tile that only exists in the Map Tool. They are programmed to be snapped around when moved with the regular actor manipulation tools provived by the engine, and to be reactive to all property changes made by the designers.

ALL properties available for a Tile are availabe and editable from the Details panel, with bits of customization to prevent modifying values that are blocked by other properties (for example, the "Foundation" properties can only be edited if the variable "Is Foundation" is enabled, or enabling "Is Foundation" disables the selection of "Is Bedrock"). When any of the properties is edited, it changes shape, colors, or spaws different elements to visualize the changes in real time in the editor.

<gallery>
    /img/games/screenshots/rhs/maptooltile.png | A Tile in the Map Tool with multiple properties changed by the designers (a prop, spawn point, element, etc).
    /img/games/screenshots/rhs/maptooltileproperties.png | All editable properties are accessible from the Details panel when selecting the Tile in the Editor.
</gallery>

Another feature I implemented for the Map Tool regarding the Tiles is the compatibility with the Undo/Redo options. All changes made to a Tile by any means are transactional and are supported by Undo/Redo, allowing the designers to quickly undo an undesired action, something that the engine doesn't support on custom actors like this on by default.

#### Helping the designers

Working closely with the design team, I developed and added more features at their request.

One of those features was the addition of different visual hints, some toggleable from the menu, to help them visualizing better the world they were creating. This included bounding boxes for special Tiles, Chunks and Props, and also small spheres representing Enemy and Player spawn points.

Another feature added after testing the first creations with the tool was the detection of duplicated tiles, which served as a data validation step before storing the Preset to the data table. In addition to adding an error message to warn them and a red bounding box in the Tiles, I made a special folder in the World Outliner that helped selecting the duplicate tiles.

<gallery>
    /img/games/screenshots/rhs/maptoolhelpercontrols.png | Visual hints for the designers
    /img/games/screenshots/rhs/maptoolduplicatefinder.png | Detection of duplicate tiles when saving the Preset
</gallery>

#### Saving and loading

Finally, the tool has the ability to store the Preset (the set of tiles that the designers placed with all of their properties) in the Chunks Data Table used during the gameplay to fill the Grid with data.

When the Save button is pressed and if the Preset is valid (without duplicate Tiles), the menu changes to a different one wityh multiple selector for GameplayTags. Those tags are used by the Procedural Generator that fill the Grid with data, so I had to work closely with other developers too to match their needs in the tool.

The Save Preset menu allows the designers to choose the tags for each chunk contained in the Preset, mainly with the data used for the chunk connections from the Procedural Generator.

<gallery>
    /img/games/screenshots/rhs/pcgconnectioneditor.png | When saving a Preset, the menu changed to a different one allowing to select the GameplayTags used by the Procedural Generation amongst other properties.
    /img/games/screenshots/rhs/chunkstable.png | The Preset data is stored in a Data Table used by the Procedural Generator to feed the Grid with data.
</gallery>

### Level selection UI

<warning>This section is work in progress</warning>

### Inventory UI

<warning>This section is work in progress</warning>

### Game HUD

<warning>This section is work in progress</warning>

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

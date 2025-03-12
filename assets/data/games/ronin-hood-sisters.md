# Overview

Made with Unreal Engine 4 as the final project for the "Master's degree in Videogame Programming" at U-Tad. We worked simulating the real production of a videogame, altogether with students from the Art and Design master's degrees from U-tad, as well as a game Producer from a real company. Starting from an idea selection, through a prototype phase and then a production phase.

# My role

I was in charge of programming the game world and its destruction, generating it at runtime and helping the designers with a tool to create it. I also was in charge of the fog of war effect, and the programming of the UI from the inventory, level selection menu an in-game HUD.

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
    /img/games/screenshots/rhs/fogofwar.png | The discovered area in the game map is the same white pixels from the texture in the postprocess material.
</gallery>

### Map tool

<warning>This section is work in progress</warning>

<gallery>
    /img/games/screenshots/rhs/maptool.png | Two new tabs are opened when using the Map Tool. The on in the left has different tools and controls to manipulate the Tiles and some visibility controls. The tab in the bottom panel has a list of all existing Tiles allowing to spawn them with a click.
</gallery>

<gallery>
    /img/games/screenshots/rhs/maptooltile.png | A Tile in the Map Tool with multiple properties changed by the designers
    /img/games/screenshots/rhs/maptooltileproperties.png | All editable properties are accessible from the Details panel when selecting the Tile in the Editor.
</gallery>

<gallery>
    /img/games/screenshots/rhs/pcgconnectioneditor.png | When saving a Preset the menui changed to a different one allowing to select the GameplayTags used by the Procedural Generation amongst other properties.
    /img/games/screenshots/rhs/chunkstable.png | The Preset data is stored in a Data Table used by the Procedural Generator to feed the Grid with data.
</gallery>

### Inventory UI

<warning>This section is work in progress</warning>

### Level selection UI

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
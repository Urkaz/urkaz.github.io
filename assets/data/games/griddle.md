# Overview

Griddle is a puzzle game made in cocos-2d-x (for the "Software Engineering" subject of the "Degree on Video game Design and Development").
You should fill the cells of the board with the help of the numbers at the top and left sides to discover a hidden picture.

# My role

I was in charge programming the level selection menu and the griddle generation and gameplay.

## Challenges

### Data oriented puzzles

This type of game is given to having many levels, being each one a puzzle with a black and white pixel art picture.

I wanted the levels to be created by me and by other designers, so I created a simple puzzle generator python script that transformed human readable text files like the one below into a custom .dat data format that the game could read and interpret to generate the puzzles at runtime.

```xml
5
5
00100
00110
00110
00100
00100
Knife
Autor
```

The puzzle packs in the puzzle selection menu were also generated in the same way from readable text files to data files:

```xml
0 13 14 0 0
15 0 16 17 0
0 0 18 0 0
0 19 0 0 20
21 0 22 23 0
Fruits
```

# Game Description

## Game modes

Griddle has three game modes

- Normal mode: Every mistake substracts a life. When you reach zero lives, you can't continue solving the current Griddle and you will have to try again.
- Free mode: The errors aren't taken into account and the Griddle is considered resolved only when all the correct cells are marked.
- Bomb mode: This mode is similar to the Normal one, but each mistake will make some cells to explode, unmarking them.

## Controls

Menus:

- Left click: Select option/Griddle.

Resolving Griddle:

- Left click: Moves the board, marks cells.
- "+" key: Zoom in.
- "-" key: Zoom out.

# Credits

- Fran Sánchez Rodrigo: Gameplay and selection menu Programmer.
- Álvaro Delgado Ramos: Game and puzzle designer & Menu and tutorial Programmer.
- Jaime Lara: Puzzle designer.

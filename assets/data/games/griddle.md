# Overview

Griddle is a puzzle game developed in Cocos2d-x as part of the "Software Engineering" subject in the "Degree in Video game Design and Development".
The objective is to fill in the board’s cells using the numbers shown on the top and left edges to gradually reveal a hidden image.

# My role

I was responsible for programming the level selection menu as well as the generation and gameplay of the puzzles.

## Challenges

### Data oriented puzzles

This type of game usually includes a large number of levels, each one representing a black-and-white pixel art puzzle.

I wanted both myself and other designers to be able to easily create new levels, so I developed a simple Python script that converts human-readable text files (like the example below) into a custom .dat format. This format is read by the game at runtime to generate the puzzles dynamically.

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

Puzzle packs shown in the puzzle selection menu were also generated the same way, from plain text files to binary data files, making it easy to expand the game content:

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

Griddle features three different game modes:

- Normal Mode: Every mistake costs one life. Once you run out of lives, you can’t continue solving the current puzzle and will need to restart.
- Free Mode: Mistakes are not penalized. The puzzle is considered complete only when all the correct cells have been marked.
- Bomb Mode: Similar to Normal Mode, but every mistake causes some cells to "explode", unmarking them.

## Controls

Menus:

- Left Click: Select an option or puzzle.

In-Game (while solving a Griddle):

- Left Click: Move the board or mark cells.
- "+" key: Zoom in.
- "-" key: Zoom out.

# Credits

- Fran Sánchez Rodrigo: Gameplay and selection menu Programmer.
- Álvaro Delgado Ramos: Game and puzzle designer & Menu and tutorial Programmer.
- Jaime Lara: Puzzle designer.

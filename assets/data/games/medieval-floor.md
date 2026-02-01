# Overview

Made with Unreal Engine 4 in 3 weeks as the final assignment for the "Unreal Engine" subject of the "Master's degree in Videogame Programming" at U-Tad with other 4 people.

Play cooperating with 3 more friends to defend the town against enemy waves of increasing difficulty. The game has 4 player characters with 1 attack and 1 special ability, and 4 enemies each one with different behavior and stats. Kill enemies to get the highest possible score.

# My role

I was in charge programming the Controller assignment screen, the wave generation during the gameplay, and storing the max score in the save data.

# Challenges

## Controller assignment screen

The controller assignment screen allows the players to choose the controller used for each Player Controller, and so which player character is used during the gameplay.

This was a bit of a nightmare when I tried to mix keyboard and mouse with 3 Xbox controllers, and also trying to support PS4 controllers when the engine was not 100% prepared yet to support it natively on Windows.

I tried using the "RawInput" plugin but while it recognized correctly the input, I didn't have a way to identify different controllers as all of them were recognized as only one.

I ended disabling the "RawInput" plugin and kept the original implementation made, but as we were after the global pandemic I tried to make it work with remote play tools like [Parsec](https://parsec.app/), which we used during the development to test the game.

Finally, to be able to play in singleplayer I added a hack that made all players ready except one at choice, allowing you to play with any character.

## Wave generation

I created an UWaveManager object used in the GameMode to control all waves and spawns. Each enemy has a *difficulty value* assigned, and each wave is represented by a *wave difficulty* number. The enemy pool for that wave is randomly generated trying to fit that *wave difficulty* number.

The enemies are spawned from the Wave Manager in a variable number of spawn points, selected from a pool, depending on the total number of enemies in the enemy spawn pool.

The Wave Manager is an auto managed object, meaning that it starts spawning waves when the Game Mode tells it to start, and it knows when the next wave has to be spawned by itself, without any external function calls.

## What I learnt

Working in this game teached me how to manage multiple players and controllers in different ways and the options Unreal Engine 4 had for it.

Also, as this was my first game made with Unreal, I had the oportunity to experiment and work with their C++ framework as we decided to avoid using Blueprint code for most components and elements.

# Game Description

## Player Characters

- Player 1 (top left): **Archer**.
- Player 2 (top right): **Warrior**.
- Player 3 (bottom left): **Healer**.
- Player 4 (bottom right): **Wizard**.

## Controls

- **Space / A button (Xbox)**: Jump.
- **Enter / Menu button  (Xbox)**: Pause.
- **Left Click / RT  Button (Xbox)**: Basic Attack
  - The Healer has to use this to accumulate health to be able to heal using the special ability.
  - The Archer and Wizard can hold the button for a charged attack that deals more damage.
- **Right Click / LT  Button (Xbox)**: Special ability (affects nearby allies).
  - Archer: Increase attack speed.
  - Warrior: Increase defense.
  - Healer: Healing.
  - Wizard: Increase movement speed.

## Singleplayer hack for controller assignment

- Press the key 1 to 4 to assign all players except the one corresponding to the key pressed.
- Press the key 5 to unassign all players (in case you pressed 1-4 and you want to play with 3 friends).

## Enemies

- Warrior: A balanced enemy that deals normal damage.
- Rogue: An easy to kill enemy that tries to flee after hitting a player.
- Archer: They will try to damage you from the distance with deadly arrows.
- Armored Warrior: Heavily armored warrior with a lot of health and slow but deadly attacks.

## Credits

- Fran Sánchez: Controller assignment, gameplay (waves), and save data.
- Adrián Delgado: VFX, attacks, and special abilites.
- Alfonso Torres: Scene flow, UI, and Sounds.
- Diego Vázquez: Player characters logic and animations.
- Sergio Jiménez: Enemies AI and animations.

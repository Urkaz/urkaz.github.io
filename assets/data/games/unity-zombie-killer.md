# Overview

Made with Unity in 1 week as the final assignment for the "Unity" subject of the "Master's degree in Videogame Programming" at U-Tad.

Unity Zombie Killer is a first-person shooter that challenges us with dark, abandoned, and full of zombie scenarios. The player has three types of weapons, the ability to crouch, jump, and run. In order to escape and survive, you must collect three different objects in various locations, eliminating as many zombies as possible along the way.

# My role

I was in charge programming the enemy AI and the quest system.

## Challenges

### Enemy AI

One of the requirements of the assignment was making the enemy AI from scratch, so I wanted to practice what I learnt in the AI subject and implemented for this game a simple but functional state machine completely from scratch in C#.

The State machine consisted in 5 states: Idle, Wandering, Chasing, Attacking and Dead, being also reactive to the sound made by the weapons and the vision of the zombies.

### Quest system

Que quest system was added in a few hours, consisting in a small list of hand crafted quests with some game objects linked to them. When a quest was selected, its target game objectsand some lights became available on the map.

# Description

## Massive map with objectives!

The huge map has many locations: a lake, an urban area, desolate fields... In these areas, there are many buildings where you can enter and explore. In addition, in each mission there are three objects that once collected, the game is completed.

## Different types of weapons and pickups!
The player has three types of weapons: a gun, a submachine gun, and a shotgun. Each of them has its own munition that can run out at any time. Therefore, there are pickups all over the map both for life and munition of all types of weapons

## Enemies with various types of detection!

The artificial intelligence of the zombies includes both sound and vision detection. That is, if a noise is made near an enemy, they will detect the player immediately!
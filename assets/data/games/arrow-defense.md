# Overview

Arrow Defense is a project for "Design and Developent of Web Games" subject using Action Script 3 with Starting Framework, and the result was exported to Android using Adobe AIR.
In the game, you are under siege in your castle, and the enemy is firing a barrage of arrows. You need to protect yourself surviving the attack or counterattacking with the same weapon, the arrows.

# My role

I was responsible for programming the level selection menu, the arrow gameplay and combo system, and the level generation. I also handled the export to Android using Adobe AIR.

# Challenges

## Data oriented levels

One of our goals was to include multiple levels in the game, but we didn't want them hardcoded into the game logic. To solve this, I designed a custom XML format that allowed us to define level data externally, giving us the flexibility to create as many levels as we wanted with different properties.

The XML files defined various aspects of each level: duration, score targets, number of lives, arrow spawn probabilities, victory conditions, presence of fog layers, and the positions of the soldier platforms:

```xml
<Level>
    <properties time="120" points="600" lives="1" health="50" spawnMin="1" spawnMax="2.3" />
    <arrow type="normal" prob="50" vel="1"/>
    <arrow type="fire" prob="25" vel="1.5"/>
    <arrow type="ice" prob="25" vel="1.5"/>
    <panel type="fog"><status>false</status></panel>
    <soldier x="10" y="340" armor="1" platfLength="150" />
    <soldier x="20" y="220" armor="3" platfLength="300" />
</Level>
```

The level selector also used a custom XML file to manage the full list of levels and their properties.

# Game Description

Tap the arrows on the screen to break them, and do it in the bottom panel to collect them for double points and the chance to trigger combos for counterattacks.

<gallery>
    /img/games/screenshots/arrowdefense/tap1.png
</gallery>

## Level types

There are three level types. They share the same core mechanics but differ in victory conditions:

- Time levels: Survive until the timer runs out. You can break, collect, and combo arrows to earn a high score.
- Life levels: Counterattack with combos to push back the enemy (to the next level!). Each combo reduces the enemy's health.
- Combo levels: For some reason, the only way to win the battle (not the war) is by executing specific combos using the enemy's arrows.

## Arrows and Combos

Six different types of arrows fall from the sky, launched by your enemy:

!["Normal arrow"](/img/games/screenshots/arrowdefense/normal.png "Arrow Defense")
!["Fire arrow"](/img/games/screenshots/arrowdefense/fire.png "Arrow Defense")
!["Ice arrow"](/img/games/screenshots/arrowdefense/ice.png "Arrow Defense")
!["Electric arrow"](/img/games/screenshots/arrowdefense/electric.png "Arrow Defense")
!["Fast arrow"](/img/games/screenshots/arrowdefense/fast.png "Arrow Defense")
!["plant arrow"](/img/games/screenshots/arrowdefense/plant.png "Arrow Defense")

- Normal: Standard arrow with no special traits.
- Fire: Flaming arrow.
- Ice: Frozen arrow.
- Lightning: Electrically charged arrow.
- Quick: Falls faster than all the others.
- Plant: Wooden arrow with plant matter growing from it.

As mentioned earlier, tapping arrows in the bottom panel collects them, enabling you to perform combos. Combos consist of specific combinations of 2 arrows:

- Quick attack: 2 Normal + 1 Quick
- Fire attack: 2 Normal + 1 Fire
- Ice-Fire attack: 1 Fire + 1 Ice
- Lightning attack: 1 Lightning + 1 Quick
- Lightning-Fire attack: 1 Lightning + 1 Fire

Note: The combos are not shown on the screen! Sorry about that! D:

## Your soldiers

You have soldiers stationed on your castle walls, and they can be moved horizontally along their platforms.

!["Regular soldier"](/img/games/screenshots/arrowdefense/soldado_1.png "Arrow Defense")
!["Iron armored soldier"](/img/games/screenshots/arrowdefense/soldado_2.png "Arrow Defense")
!["Fire resistant armored soldier"](/img/games/screenshots/arrowdefense/soldado_3.png "Arrow Defense")

There are three types of armored soldiers:

- Regular Soldier: Dies if hit by any arrow.
- Iron Armored Soldier: Can withstand two normal arrows.
- Fire-Resistant Armored Soldier: Can take three normal arrows and is immune to fire arrows.

## Controls

Menus:

- Tap: Select options or levels

Ingame:

- Tap arrow: Destroy or collect it
- Drag soldier: Move the selected soldier along his platform

## Tools used

- FlashDevelop
- ActionScript 3 + Starling Framework
- Adobe AIR

## Disclaimer

Due to limitations in the platform (Flash exported via AIR), the game might not close correctly when pressing the Home or Back button on Android. If that happens, please close it manually from the recent apps list.

# Credits

- Fran Sánchez Rodrigo: Lead Programmer (Gameplay programmer)
- Álvaro Delgado Ramos: Game Design & Programmer (Menus and interfaces programmer, Game designer)
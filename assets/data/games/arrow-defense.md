# Overview

Arrow Defense is a project for "Design and Developent of Web Games" subject using Action Script 3 with Starting Framework, and the result was exported to Android using Adobe AIR.
In the game, you are under siege in your castle, and the enemy is shooting lots of arrows. You need to protect yourself surviving the attack or counterattacking with the same weapon, the arrows.

# My role

I was in charge programming the level selection menu, the arrow gameplay and combos, and the level generation. Also, I exported the game to Android using Adobe AIR.

## Challenges

### Data oriented levels

One of the things we wanted the game to have was a list of multiple levels, but we didn't want them hardcoded in some list inside the game code. I designed a custom xml files that allowed us to create the levels from data, allowing us to create an infinite amount of levels with different properties.

Those files allowed us to define the porperties of the level (time, points, lives, etc), the probability of each arrow spawn, victory conditions, if the level had a fog layer amd the position of the soldiers platforms:

    <Level>
        <properties time="120" points="600" lives="1" health="50" spawnMin="1" spawnMax="2.3" />
        <arrow type="normal" prob="50" vel="1"/>
        <arrow type="fire" prob="25" vel="1.5"/>
        <arrow type="ice" prob="25" vel="1.5"/>
        <panel type="fog"><status>false</status></panel>
        <soldier x="10" y="340" armor="1" platfLength="150" />
        <soldier x="20" y="220" armor="3" platfLength="300" />
    </Level>

The level selector also had a custom XML with the level list and the properties of each level.

# Description

Tap the arrows on the screen to break them, and do it in the bottom panel to collect (obtaining twice the normal points) and make combos to counterattack.

![Arrow defense screenshot](/img/games/screenshots/arrowdefense/tap1.png)

## Level types

There are three level types, all sharing the same mechanic but changing the victory conditions.

- Time levels: Survive until time runs out. You can break, collect and make combos with the arrows to obtain a high score.
- Life levels: Attack your enemy with combos to make them retreat (until the next level!). Each combo will decrease the enemy life points.
- Combo levels: For some reason, you can only win this battle (not the war) making specific combos with the enemy arrows.

## Arrows and Combos

Six different type of arrows will fall from the sky, sent by your enemy.

!["Normal arrow"](/img/games/screenshots/arrowdefense/normal.png "Arrow Defense")
!["Fire arrow"](/img/games/screenshots/arrowdefense/fire.png "Arrow Defense")
!["Ice arrow"](/img/games/screenshots/arrowdefense/ice.png "Arrow Defense")
!["Electric arrow"](/img/games/screenshots/arrowdefense/electric.png "Arrow Defense")
!["Fast arrow"](/img/games/screenshots/arrowdefense/fast.png "Arrow Defense")
!["plant arrow"](/img/games/screenshots/arrowdefense/plant.png "Arrow Defense")

- Normal: The most common arrow, without anything special.
- Fire: Burning arrow.
- Ice: Frozen arrow.
- Lightning: Arrow charged with electricity.
- Quick: An arrow that falls faster than any other one.
- Plant: Wooden arrow with some plant growing from it.

As mentioned before, touching the arrows in the bottom panel will collect them, allowing to make some combos. All are combinations of two or three specific arrows:

- Quick attack: 2 Normal + 1 Quick.
- Fire attack: 2 Normal + 1 Fire.
- Ice-Fire attack: 1 Fire + 1 Ice.
- Lightning attack: 1 Lightning + 1 Quick.
- Lightning-Fire attack: 1 Lightning + 1 Fire.

Note: The combos are not shown on the screen! Sorry about that! D:

## Your soldiers

You have some soldiers placed your wall. They can be moved on their platform horizontally.

!["Regular soldier"](/img/games/screenshots/arrowdefense/soldado_1.png "Arrow Defense")
!["Iron armored soldier"](/img/games/screenshots/arrowdefense/soldado_2.png "Arrow Defense")
!["Fire resistant armored soldier"](/img/games/screenshots/arrowdefense/soldado_3.png "Arrow Defense")

There are three armored soldiers:

- Regular soldier: He will die if some arrow touch him.
- Iron armored soldier: He will resist two normal arrows.
- Fire resistant armored soldier: It will resist three normal arrows. In addition, he has immunity to the fire arrows.

## Controls

Menus:

- Touch: Select options or level

Ingame:

- Touch arrow: Destroy or collect it.
- Drag soldier: Move selected soldier through his platform.

## Tools used

- Flash Develop
- Action Script 3 + Startling Framework
- Adobe AIR

## Disclaimer

For some reason, the game (a Flash file exported to Android with AIR), is not closing when pressing home or back, if this happens in your mobile, kill it in your recent apps list.

# Credits

- Fran Sánchez Rodrigo: Lead Programmer (Gameplay programmer)
- Álvaro Delgado Ramos: Game Design & Programmer (Menus and interfaces programmer, Game designer)
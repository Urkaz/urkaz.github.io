# Description

"More Cobblemon Stats" is a Minecraft Java Edition mod that adds more Stats to Cobblemon and some of its most common addons. Also applies some fixes to some of those addons.

<p align="center">
<a href="https://www.curseforge.com/minecraft/mc-mods/more-cobblemon-stats" target="_blank"><img src="https://img.shields.io/curseforge/dt/1512630?style=for-the-badge&logo=curseforge&label=CurseForge%20total%20downloads&color=f16436" alt="Curseforge total downloads"></a>
<br>
<a href="https://modrinth.com/mod/more-cobblemon-stats" target="_blank"><img src="https://img.shields.io/modrinth/dt/67ZupZ7K?style=for-the-badge&logo=modrinth&label=Modrinth%20total%20downloads&color=5da426" alt="Modrinth total downloads"></a>
</p>

## New Stats

8 new Statistics for base Cobblemon, and more than 40 for the most used and best Cobblemon addons.

<details>
<summary>Stats List</summary>

* [Cobblemon (1.7.3+1.21.1)](https://modrinth.com/mod/cobblemon)
    * Poké Balls Thrown
    * Poké Balls Thrown Hit
    * Pokémon Defeated
    * Pokémon Terastalized
    * Pokémon Mega Evolved
    * Pokémon Forme Changes
    * Pokémon Z-Moves Used
    * Pokémon Pokédex Seen: _(only updated when catching a Pokémon)_
* [Cobbledollars (2.0.0+Beta-5.1)](https://modrinth.com/mod/cobbledollars)
    * Cobbledollars Earned
    * Cobbledollars Lost
* [CobbleSafari (0.2.0)](https://modrinth.com/mod/cobblesafari)
    * Hoopa Rings Traversed
    * Safari Expeditions
    * Underground Treasures Found
    * (Visits to dimensions through Hoopa Rings):
        * Underground Adventures
        * Distortion World Visits
    * Secret Base Flags Stolen
    * Reward Balloons Looted
* [Cobblemon Quick Battle (1.3.8)](https://modrinth.com/mod/cobblemon-quick-battle)
    * Pokémon Quick Battles
    * Pokémon Quick Battles Won
    * Pokémon Quick Battles Started
* [Cobblemon Rustling Spots (2.0.1)](https://modrinth.com/mod/cobblemon-rustling-spots)
    * Rustling Spots Examined
* [Cobblemon Marks Quests (1.0.2)](https://www.curseforge.com/minecraft/mc-mods/cobblemon-marks-quests/)
    * Pokémon Marks Obtained
* [Cobblemon: Research Tasks (2.0)](https://modrinth.com/mod/cobblemon-research-tasks) (Fabric Only)
    * Taks Completed
    * Entries Completed: _(by claiming the completed reward)_
* [Cobblemon Ultra-Beasts (3.1)](https://www.curseforge.com/minecraft/mc-mods/cobblemon-ultra-beasts) (Fabric Only)
    * Ultra Wormholes Entered
* [Cobblemon Snap (1.1.2)](https://modrinth.com/mod/cobblemon-snap)
    * Photos Taken: _(by just taking photos)_
    * Photos Registered: _(photos taken that contained a Pokémon)_
    * Snapdex Entries: _(entries considered "captured" in the Snapdex)_
    * Total Pokémon Captured: _(total count of Pokémon that appeared in photos)_
* [PokeBike (1.8)](https://modrinth.com/mod/pokebike)
    * Distance by Bike
* [Cobblemon Expeditions (1.1.2/3)](https://modrinth.com/mod/cobblemon_expeditions)
    * Expeditions Started
    * Expeditions Canceled
    * Expeditions Finished
    * Expeditions With Failed Result
    * Expeditions With Partial Result
    * Expeditions With Great Result
    * Expeditions With Successful Result
* [Cobblemon: Shadowed Hearts (1.0.6)](https://modrinth.com/mod/cobblemon-shadowedhearts)
    * Shadow Pokémon Defeated
    * Shadow Pokémon Caught
    * Shadow Pokémon Purified
    * Shadow Pokémon Snagged
* [Cobblemon Battle Tower (1.10.19)](https://modrinth.com/mod/cobblemon-battle-tower)
    * Battles Won
    * Battles Lost
    * Runs Forfeited
    * Total Floors Completed
    * Total BP Earned
    * Best Win Streak
    * Highest Floor Reached
* [Cobblemon Wonder Trade (1.2.2)](https://modrinth.com/mod/cobblemon-wonder-trade)
    * Wonder Trades

</details>

## FTB Quests

You can use any of the new stats natively with FTB Quests! No special quest nodes or extra mods.

<details>
<summary>FTB Quests</summary>

FTB Quests native integration with "Stat" quest type:

<gallery>
    https://cdn.modrinth.com/data/67ZupZ7K/images/e8fca5b2576723a17e01e6b2b9bc38e51f5102af.png | FTB Quests native integration with "Stat" quest type.
</gallery>

</details>

## Compatibility Enhancements

The mod also adds a few fixes and ehnacements to other Cobblemon addons to improve the compatibility between them.

<details>
<summary>Enhancements</summary>

* [Cobblemon (1.7.3+1.21.1)](https://modrinth.com/mod/cobblemon)
    * Fixed cobblemon:dex_entries stat incrementing twice on each new entry registered.
* [CobbleSafari (0.2.0)](https://modrinth.com/mod/cobblesafari)
    * Incubators count for "Pokémon Eggs Hatched".
    * Wild Eggs count for "Pokémon Eggs Collected"
* [Cobblemon Quick Battle (1.3.8)](https://modrinth.com/mod/cobblemon-quick-battle)
    * Triggers BATTLE_FAINTED events so other mods could handle the defeat.
* [Cobblemon: Research Tasks (2.0)](https://modrinth.com/mod/cobblemon-research-tasks) (Fabric Only)
    * Correctly handles evolution through UI with the Pokémon inside the PokéBall.
* [Cobblemon Wonder Trade (1.2.2)](https://modrinth.com/mod/cobblemon-wonder-trade)
    * Awards cobblemon:traded stat.
* [Cobblemon: Shadowed Hearts (1.0.6)](https://modrinth.com/mod/cobblemon-shadowedhearts)
    * Added an extra check to only trigger Snag if it's a Trainer Pokémon.
* [Cobblemon Snap (1.1.2)](https://modrinth.com/mod/cobblemon-snap)
    * Records Pokémon captured in photos as "Seen" in the base Cobblemon Pokédex.
    * Fixes incorrect shiny odd calculation for Research Bonuses.

</details>
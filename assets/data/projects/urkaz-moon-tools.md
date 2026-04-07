# Overview

With more than 50k downloads, "Urkaz Moon Tools" is a Minecraft Java Edition mod that adds one item and one block that helps detecting the current Moon Phase. If other mods like Enhanced Celestials, Lunar or Bloodmoon are present, it offers compatibility ny showing the color of the current lunar event provided by those mods.

<p align="center">
<a href="https://www.curseforge.com/minecraft/mc-mods/urkaz-moon-tools" target="_blank"><img src="https://img.shields.io/curseforge/dt/362825?style=for-the-badge&logo=curseforge&label=CurseForge%20total%20downloads&color=f16436" alt="Curseforge total downloads"></a>
<br>
<a href="https://modrinth.com/mod/urkaz-moon-tools" target="_blank"><img src="https://img.shields.io/modrinth/dt/1sxtqgoT?style=for-the-badge&logo=modrinth&label=Modrinth%20total%20downloads&color=5da426" alt="Modrinth total downloads"></a>
</p>

# Challenges

One of the main challenges with this project, even though it is small, is maintaining it across multiple Minecraft versions while offering compatibility with other mods, which may not be available on all Minecraft versions.

I tend to support the most important minor releases from each major version (1.19.x, 1.20.x), but the code changes between versions are significant, even if they are called "minor".

# Description

## New items and blocks

<table width="100%">
    <tr>
        <td width="20%" align="center">
            <h3>Lunar Clock</h3><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/inv_clock.png">
        </td>
        <td width="50%">
            This clock shows the current Moon phase. Right-clicking with it in the hand will display the name of the phase in the chat.
        </td>
        <td width="30%" align="center">
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/recipe_clock.png"><br><i>Lunar Clock recipe</i>
        </td>
    </tr>
    <tr>
        <td width="20%" align="center" rowspan="2">
            <h3>Lunar Detector</h3><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/inv_sensor.png">
        </td>
        <td width="50%" rowspan="2">
            This block emits a Redstone signal depending on the current Moon phase. The Lunar detector only works during the night, but you can make it work all day in the mod settings.</br>
            The Redstone strength for each Moon phase can be configured too in the mod settings.
        </td>
        <td width="30%" align="center">
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/recipe_sensor.png"><br><i>Lunar Detector recipe</i>
        </td>
    </tr>
    <tr>
        <td align="center">
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/help_redstone.png" width="257" height="135"><br><i>Redstone signal</i>
        </td>
    </tr>
</table>

## Mod compatibility

<table width="100%">
    <tr>
        <td align="center">
        <a href="https://modrinth.com/mod/enhanced-celestials" target="_blank">
        <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/enhanced-celestials.png" width="100" height="100">
        </br>Enhanced Celestials
        </a></td>
        <td width="50%" rowspan="3">
            The moon icon in the Lunar Clock will be tinted of the same color as the Moon.<br><br>In the mod settings, the strength of the Lunar Detector can be set to emit extra Redstone during any event.
        </td>
    </tr>
    <tr>
        <td align="center">
        <a href="https://modrinth.com/mod/lunar" target="_blank">
        <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/lunar.png" width="100" height="100">
        </br>Lunar
        </a></td>
    </tr>
    <tr>
        <td align="center">
        <a href="https://modrinth.com/mod/crimson-moon-revived" target="_blank">
        <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/crimson_moon.png" width="100" height="100">
        </br>Crimson Moon
        </a></td>
    </tr>
    <tr>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/bloodmoon.png" width="100" height="100"></td>
        <td width="50%" rowspan="2">The moon icon in the Lunar Clock will become red during a Bloodmoon event or blue during the Harvestmoon.
            <ul>
                <li>
                    <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_110.png"> If both events appear simultaneously, the clock will display both at the same time (this may happen when playing with Both mods at the same time).
                </li>
            </ul>
            In the mod settings, the strength of the Lunar Detector can be set to emit extra Redstone during Harvestmoon and Bloodmoon:
            <ul>
                <li>
                    <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"> Bloodmoon: 9
                </li>
                <li>
                    <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_100.png"> Harvestmoon: 10
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td align="center">
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/nyx.png" width="100" height="100">
        </td>
    </tr>
</table>

## Dependencies

"Urkaz Moon Tools" requires the following mods to work:

<table width="100%">
    <tr>
        <td width="33%" align="center">1.18.3 - 1.21.1<br>Required</td>
    </tr>
    <tr>
        <td width="33%" align="center">Cloth Config API<br>
                <a href="https://modrinth.com/mod/cloth-config"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/cloth-config.png" width="100" height="100"></a>
        </td>
    </tr>
</table>

## Compatibility table

<ul>
  <li>❗ = Required to work</li>
  <!--li>❔ = Optional</li-->
  <li><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"> = Mod compatibility</li>
  <li><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_110.png"> = Legacy compatibility</li>
</ul>  

<table width="100%">
    <tr>
        <td align="center"></td>
        <td align="center">1.21.1</td>
        <td align="center">1.20.6</td>
        <td align="center">1.20.4</td>
        <td align="center">1.20.2</td>
        <td align="center">1.20.1</td>
        <td align="center">1.19.4</td>
        <td align="center">1.19.3</td>
        <td align="center">1.19.2</td>
        <td align="center">1.19.1</td>
        <td align="center">1.19</td>
        <td align="center">1.18.2</td>
        <td align="center">1.16.5</td>
        <td align="center">1.12.2</td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/cloth-config.png" width="20" height="20"> Cloth Config API
        </td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center">❗</td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/enhanced-celestials.png" width="20" height="20"> Enhanced Celestials
        </td>
<td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"></td>
    </tr>
   <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/lunar.png" width="20" height="20"> Lunar
        </td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/crimson_moon.png" width="20" height="20"> Crimson Moon
        </td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_10.png"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/bloodmoon.png" width="20" height="20"> Bloodmoon
        </td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_110.png"></td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/master/resources/thirdparty/nyx.png" width="20" height="20"> Nyx
        </td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"></td>
        <td align="center"><img src="https://raw.githubusercontent.com/Urkaz/UrkazMoonTools/1.12.2/src/main/resources/assets/urkazmoontools/textures/item/moonclock_110.png"></td>
    </tr>
</table>

# Overview

ItemNameLocalized was an addon for World of Warcraft that allowed you to see in the Item and Spell tooltips their name in a different language, always keeping the original name. This helped communicating with friends that played the game in english, or looking for help online in guides or forums.

# Challenges

## Blizzard API

The game didn't have a way to access the item names from other languages using the ingame LUA API, so I had to create my own database. My main source for this was the [Blizzard Official API](https://develop.battle.net/).

Using different endpoints from their API and a python script I myself created for this task, I downloaded all item names form all languages and stored them in Lua files in a shape of a big array.

The API suffered multiple changes through the time, making me to rewrite the script multiple times. Finally, due to [errors in the API not returning all available Items and Spells](https://us.forums.blizzard.com/en/blizzard/t/a-lot-of-spells-accessible-in-game-are-missing-in-the-api/14050) causing a lot of missing items for my Addon, and my lack of free time to play World of Warcraft to test the addon, I decided to stop the development of it.

## Memory consumption

The Addon started featuring only English, but with each new language I started supporting, the memory usage of having all items names in memory started to grow. Due to this, I separated each language in an individual addon in a form of a module.

With this approach I was able to handle better each language and have only loaded the selected language, "deleting" from the RAM all other languages, using only 30-40 MB of memory.

# Description

## Features

* Adds the Item name or Spell name to the tooltip title.
* Adds the Item name or Spell name on a single extra line on the tooltip.
* Generate Wowhead URLs of any item and spell with a command (/inl link [shift+click one or more items]).

## Languages supoported

* enUS
* esES
* frFR
* deDE
* itIT
* ptBR
* ruRU
* esMX
* koKR
* zhTW
* zhCN


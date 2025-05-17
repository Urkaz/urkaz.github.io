# My role

I joined the team to only help with the Xbox Engagement screen, but it become a bigger problem and we expected, and with the sum of new bugs emmerging made me join the team permanently until the end of the development.

The game was a co-development project with Shiver Entertainment. We received the game almost finished the main goal was fixing bugs and polishing the game to reach a gold version for Steam, while porting it to all console platforms.

We worked closely with the producer from Shiver Entertainment and with a QA team that tested the game in a daily basis, so we had to priorize the bugs according to the producer needs and communicate with the QA team.

## Challenges

### Multiplayer Xbox Engagement screen

In all of our portsd to Xbox we had to implement an interactive engagement screen where the user could press a button to select the initial user, and also react to all controller and user disconnection and changes in real time. As we were reusing old code, I decided to create a new plugin with all this code in a previous code, but it was completely focused in singleplayer games in mind.

This game required connecting more than one player, up to 4, during couch-coop games. To make this work I refactored most part of the Engagement plugin we already had to correctly handle multiple Xbox profiles and controllers at the same time.

All those changes weren't an easy task, but it got worse when it was sent to certification and the QA team repoted that we weren't supporting Guest users (local users without an account linked). This required more changes to the plugin and to the engine, having to backport some parts of Xbox profile handling code from Unreal 5 to Unreal 4 and working with low level SDK calls.

<gallery>
    /img/games/screenshots/unpublished1/xboxmenu.webp | Words can't express how much I hate user management in Xbox.
</gallery>

### Multiplayer Switch controllers

In a similar but more simple way, I did some changes to the engine code handling the Nintendo Switch controllers to improve how and when the Controller Applet was displayed.

### Steam Deck

This was the first project that we ported to Steam Deck. It required further CPU and GPU optimization due to the lower specs compared to the other consoles.

To fully support Steam Deck, I implemented a few methods to detect the Steam Deck system language (something that Unreal doesn't do in 4.27) and to allow checking if the game was running on it or in a regular computer.

Another problem that I had to fix in Steam Deck was a constat stuttering caused by the just-in-time shader compilation. To get rid of that stuttering I generated the PSO (Pipeline State Object) cache, which hold information about shaders and the state of the graphics pipeline to avoid shader compilation in runtime and prevent the stuttering.

### Save data refactor

The game saved the progress very frequently, so to avoid having problems with certification (I'm looking at you, Nintendo Switch) I refactored how the game saved the data, queueing the different operations and only processing one save operation at a time, and setting a time interval between operations.

I had to made changes to the Nintendo Switch code to allow receiving events when the application closed, so we could store all remaining operations in the queue before the game closed. This change was not required in other consoles as they were already handling this event by default.

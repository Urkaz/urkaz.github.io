# My role

I initially joined the team to help exclusively with the Xbox Engagement screen, but the task turned out to be more complex than expected. As new bugs began to surface, I ultimately stayed on the project full-time until the end of development.

The game was a co-development effort with Shiver Entertainment. We received the project nearly finished, with our primary responsibilities being bug fixing and polishing to reach the gold version for Steam, while also handling the porting process to all console platforms.

We worked closely with the producer at Shiver Entertainment and a QA team that tested the game daily. As a result, we had to prioritize bugs based on the producer's needs and maintain clear communication with QA.

## Challenges

### Multiplayer Xbox Engagement screen

For all our Xbox ports, we were required to implement an interactive engagement screen where the user selects their profile by pressing a button, and also handle controller and user disconnections or changes in real time. While we had existing code for this, it was designed with single-player experiences in mind.

This game supported local co-op for up to four players, which meant the system had to handle multiple Xbox profiles and controllers simultaneously. To achieve this, I created a new plugin based on that older code, which was originally designed with single-player games in mind.

Implementing these changes was already a challenge, but things became even more complicated during certification and the QA team reported that Guest users (local users without linked accounts) weren't correctly supported. Addressing this required additional modifications to both the plugin and the engine, including backporting parts of the Xbox profile handling code from Unreal Engine 5.1 to Unreal Engine 4.27, and working directly with low-level SDK functions.

<gallery>
    /img/games/screenshots/unpublished1/xboxmenu.webp | Words can't express how much I hate user management in Xbox.
</gallery>

### Multiplayer Switch controllers

Similarly, though less complex, I made modifications to the engine's code handling of Nintendo Switch controllers to improve how and when the Controller Applet was displayed.

### Steam Deck

This was the first project we ported to Steam Deck, which demanded additional CPU and GPU optimizations due to its lower specs compared to other platforms.

To properly support the Steam Deck, I implemented a method to determine whether the game was running on Steam Deck versus a regular PC, and a methord to detect the system language (something Unreal Engine 4.27 doesn't handle).

One major issue I addressed was frequent stuttering due to just-in-time shader compilation. To resolve this, I generated a Pipeline State Object (PSO) cache, which stores information about shaders and rendering states, to prevent runtime shader compilation and eliminate stuttering.

### Queued Save data

The game saved progress frequently, and to avoid certification issues (especially on Nintendo Switch), I redesigned the save system, queueing the operations and only processing one save operation at a time, with a delay between operations.

Additionally, I had to modify the Nintendo Switch-specific code to handle application exit events properly. This allowed us to ensure any remaining queued save operations were written before the game closed. This change was not required in other platforms as they already handled this event natively.
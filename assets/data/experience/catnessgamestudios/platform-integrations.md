# Platform Integrations

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

Two separate plugins handle platform-specific requirements for Xbox and PS5, both exposing their functionality to Blueprint through subsystems and function libraries built on top of Unreal's Online Subsystem layer.

## Xbox Engagement Screen

Xbox requires games to present a mandatory login and user selection flow before entering gameplay. `UCatnessEngagementSubsystem` manages this flow as a `UGameInstanceSubsystem`, handling the initial login, controller pairing, profile swapping, and the full application lifecycle (suspend, resume, terminate). The plugin offers a configurable template to create the "Press Start" using an UMG widget, that has to be assigned in Project Settings, keeping the visual layer entirely in Blueprint.

The subsystem exposes delegates for login completion, profile swaps, controller disconnections, and application lifecycle events (pause, resume, terminate), so the rest of the game can react without depending on the plugin directly. Platform-required warning dialogs, such as controller disconnection notices or sign-in errors, are handled through a wrapper around Xbox GDK's native message dialog system.

An optional override lets the project take manual control of level loading after the engagement screen completes, which is useful when the transition needs to be coordinated with other systems.

## PS5 Activities

PS5 Activities allow games to expose specific game modes or states as quick-launch shortcuts accessible from the console's home menu and Control Center. `UActivitiesSubsystem` initialises the PS5 activity interface through the Online Subsystem and listens for activation requests from the system, broadcasting them as delegates so the game can respond to players launching activities directly from the shell.

Each activity is defined in a config asset with a unique ID and a set of dependency rules: which activities to stop or disable when this one starts, and which to trigger or complete when it ends. The dependency rules are defined in config rather than code, so activity interactions (stopping others on start, enabling new ones on completion) don't require custom Blueprint or code logic per activity.

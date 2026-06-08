# Tick Interval Manager

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Problem

Every actor with ticking enabled updates every frame regardless of how far it is from the player or whether it is visible on screen. In scenes with large numbers of characters, vehicles, or other dynamic actors this adds up quickly. Unreal Engine has no built-in mechanism to automatically throttle tick rates based on proximity or visibility, leaving the only options as manual per-actor configuration or disabling ticks entirely.

## Solution

The plugin provides `UTickIntervalManager`, an actor component added to each actor whose tick should be managed. Each frame the component measures the actor's distance from a reference point and whether it is being rendered, selects the appropriate tick interval from two configurable maps, one for visible and one for hidden, and applies it to the actor and any registered components.

## Implementation

### Distance and visibility sampling

Each frame the component checks whether the actor (or a designated main primitive) was recently rendered, using `WasRecentlyRendered`. `RenderingTolerance` controls the grace period in seconds before the visible/hidden state is toggled, avoiding flicker at screen edges. Distance is measured from the actor's location to a `UTickIntervalManagerTarget` component (a marker added to the player pawn that registers itself as the global reference point on `BeginPlay`). Only one target can be active per level; if none is present, the system falls back to the player camera location.

The two maps (`VisibleDistanceTickInterval`, `NotVisibleDistanceTickInterval`) use distance as key and tick interval as value. Each key is the minimum distance at which its interval applies. The system picks the interval of the highest key that the current distance still meets or exceeds. Below the smallest key, the actor's original tick interval is preserved. Setting an interval to `-1` disables the actor's tick entirely at that distance band.

<gallery>
    /img/experience/catness/tick/visibility.png
</gallery>

### Cinematic mode

When a cutscene or high-fidelity moment requires full tick rates across the board, `EnableCinematicMode(true)` bypasses all distance and visibility logic for every manager instance in the level. Each actor reverts to the tick interval it had at `BeginPlay`. The flag is a static bool on the class, so it takes effect immediately on all instances without any per-actor call.

The `CanBeAffectedByCinematicMode` property lets individual actors opt out, useful for background actors that should stay throttled even during cutscenes.

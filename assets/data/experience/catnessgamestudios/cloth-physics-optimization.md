# Cloth Physics Optimization

## Problem

Cloth simulation in Unreal Engine runs every tick, regardless of how large the simulated mesh appears on screen or whether it is even visible to the player. For a character in the background or partially off-screen, the engine spends the same CPU time simulating cloth as it would for a character filling the entire viewport. On constrained platforms this is wasteful, as cloth simulation is one of the more expensive per-component physics operations.

## Solution

The optimization introduces two complementary strategies: skipping simulation entirely when the component is not visible, and reducing the simulation tick rate based on the mesh's projected screen size. The further away or smaller a cloth-simulated mesh is, the less frequently its cloth is updated, down to a full stop below a configurable size threshold.

## Implementation

The behavior is controlled by four CVars that can be set per platform via Device Profiles:

- **`p.Cloth.OnlySimulateClothIfVisible`** (default: 1): skips simulation entirely if the component has not been rendered recently (`WasRecentlyRendered == false`). This alone eliminates cloth cost for off-screen characters with no visible impact.

- **`p.Cloth.SkipSimulateTicks`**: controls the skip rate directly. Set to `N > 0` to force all cloth to simulate every N+1 frames. Set to `-1` (default) to use per-mesh screen size data instead.

- **`p.Cloth.TicksToRecalculateSize`** (default: 1): throttles how often the screen size of the mesh is recalculated. Since the calculation itself has a cost, this avoids running it every frame when the value changes slowly.

When `p.Cloth.SkipSimulateTicks` is set to `-1`, the tick rate is determined per mesh using a `TMap<float, int32>` property added to `USkeletalMesh` called `FramesSkipScreenSize`. Each entry maps a screen size threshold to a number of frames to skip:

| Frames skipped | Screen Size |
|---|---|
| 0 (every frame) | 0.8 |
| 1 (every 2 frames) | 0.5 |
| 2 (every 3 frames) | 0.3 |
| stop (−1) | below 0.1 |

Each tick, `TickClothing` checks the cached screen size of the component against this map, sets the appropriate skip interval, and increments a per-component counter. When the counter reaches the target, simulation runs and the counter resets.

The first frame is always simulated regardless of configuration to avoid a visible pop when a cloth component first enters the scene.

## Assessment

### Pros

- All parameters are runtime CVars, so they can be adjusted per platform in Device Profiles without recompilation.
- Skipping simulation for non-visible components has no perceptible impact on visual quality.
- The per-mesh `FramesSkipScreenSize` map gives fine-grained control without forcing a one-size-fits-all configuration.

### Cons / Risks

- Reducing the tick rate introduces visible lag in cloth movement. At lower screen sizes the cloth responds to character animation with a noticeable delay, which may or may not be acceptable depending on the game.
- The `FramesSkipScreenSize` thresholds require manual tuning per project. Default values may not be suitable for all games and could cause visible artifacts if not reviewed.

## Code

<notice>

The full code will be available in the future.

</notice>
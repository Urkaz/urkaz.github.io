# Custom Device Profiles

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Problem

Unreal Engine's Device Profile system applies profiles statically at startup based on device detection. At runtime there is no built-in way to stack multiple profiles on top of each other, push temporary overrides for specific levels or gameplay states, or reliably restore CVar values when those overrides are no longer needed. This matters in porting work, where different rendering settings are often needed for specific levels, cutscenes, or platform-specific content areas without modifying the base device profile.

## Solution

The plugin implements a runtime profile stack as a `UGameInstanceSubsystem`. Profiles can be pushed and popped at any time from C++ or Blueprint, each one applying its CVars on top of the current state. When a profile is popped, its CVars are restored to their pre-push values, with reference counting to handle cases where multiple active profiles override the same CVar. Profiles can be pushed and popped in any order, not just LIFO.

Per-level profiles are assigned in a `UDeveloperSettings` config asset and applied automatically on level load, then removed on level unload, independently of any manually-pushed profiles.

## Implementation

### Profile stack and inheritance

`UCatDP_DeviceProfileSubsystem` maintains an ordered list of active profiles. When pushing a profile, the system traverses its `BaseProfileName` inheritance chain, collecting CVars from child to root. CVars already declared in the child are skipped in parent profiles. Platform-specific overrides (from `Platforms/<Platform>/Config/<Platform>DeviceProfiles.ini`) are applied after their global counterparts for the same profile name.

Given these profiles in `DefaultDeviceProfiles.ini`:

```ini
[AllLevels DeviceProfile]
+CVars=r.DefaultFeature.MotionBlur=1
+CVars=r.DynamicRes.OperationMode=1

[Level5 DeviceProfile]
BaseProfileName=AllLevels
+CVars=r.DefaultFeature.MotionBlur=0

[DisableDynRes DeviceProfile]
+CVars=r.DynamicRes.OperationMode=0
```

Loading a level configured with `[Level5, DisableDynRes]` applies CVars in this order:

1. `Level5` own CVars: `r.DefaultFeature.MotionBlur=0`
2. `AllLevels` CVars (parent of `Level5`, skipping any already set by the child): `r.DynamicRes.OperationMode=1`
3. `DisableDynRes` CVars: `r.DynamicRes.OperationMode=0`

Inherited profiles are treated as part of their child and they cannot be removed independently and are only removed when their child profile is removed.

If the game then manually pushes a `Cinematic` profile that also has a Switch-specific override, both versions are applied following the same rules above:

```ini
; DefaultDeviceProfiles.ini
[Cinematic DeviceProfile]
+CVars=r.SecondaryScreenPercentage.GameViewport=90

; Switch/Config/SwitchDeviceProfiles.ini
[Cinematic DeviceProfile]
+CVars=r.SecondaryScreenPercentage.GameViewport=70
+CVars=r.DynamicRes.MinScreenPercentage=30
```

### Reference counting

The CVar tracking map stores the original value and a usage counter for each CVar touched by the active stack.

When a profile is pushed, each CVar it applies either creates a new tracking entry (saving the current value as original, count = 1) or increments the count of an existing one. When a profile is popped, each CVar's count is decremented, and when count reaches zero the original value is restored and the entry removed.

This prevents premature restoration: if given two profiles, `Level5` and `DisableDynRes`, both set `r.DynamicRes.OperationMode`, popping only one alone leaves the CVar active (count still 1 from the other profile). Only removing both profiles restores it to the original value.

### Level transitions

On every level load, the system:

1. Removes all profiles associated with the previous level (including their inherited parents).
2. Preserves the set of manually-pushed profiles.
3. Clears the full stack.
4. Applies the new level's profiles from the config.
5. Re-pushes the manually-saved profiles.

### Configuration

Per-level assignments are stored in a `UDeveloperSettings` subclass visible in *Project Settings -> Catness -> Custom Device Profiles*:

<gallery>
    /img/experience/catness/custom_device_profiles/config.png|Per-level Device Profile configuration in Project Settings.
</gallery>

Each map entry assigns one or more profiles to a level. Profiles are applied in the order they appear in the list.

## Limitations

**Scalability groups**: CVars prefixed with `sg.` (scalability groups) trigger a cascade of other CVar changes internally that the system does not track. This kind of CVars has to be avoided in profiles managed by this plugin.

**External CVar changes**: If a CVar is modified outside the subsystem (e.g. via `RunConsoleCommand` in a Blueprint) while it is tracked by an active profile, popping that profile will restore the original value, discarding the external change.

# Asset Replacer

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Problem

When porting a game to multiple platforms with different memory and performance budgets, it is common to need platform-specific variants of certain assets, for example: lower-resolution textures, different materials for weaker hardware. Without a dedicated system. or different textures to represent different controller or buttons. Managing these variants means either maintaining separate project branches per platform or manually tracking overrides during the cook process, both of which scale poorly as the number of assets and platforms grows.

Unreal Engine's cook pipeline does not natively provide a way to transparently substitute an asset with a different one per platform while keeping all in-game references intact.

## Solution

Asset Replacer uses Unreal's `FCoreRedirects` system to transparently reroute asset loads from an original path to a platform-specific substitute path at startup, without requiring any changes to the game code or asset references. Artists configure replacements directly from the Content Browser, and the plugin handles folder structure, config persistence, cook pipeline integration, and visual feedback, all without touching the project's Blueprint or C++ code.

The folder convention is fixed: substitute assets live under `/Game/_Replaced/_{Platform}/`, preserving the original's folder hierarchy:

```
Original:            /Game/Materials/M_Character
Substitute (PS4):    /Game/_Replaced/_PS4/Materials/M_Character
Substitute (Switch): /Game/_Replaced/_Switch/Materials/M_Character
```

## Implementation

### Config and registry

Replacement mappings are stored in a UObject-based config class persisted to `CatnessAssetReplacer.ini`:

```cpp
UCLASS(Config = CatnessAssetReplacer, DefaultConfig)
class UConfig : public UCatCore_BaseConfig
{
    UPROPERTY(Config)
    TMap<FName, FReplacedAsset> ReplacedAssets;
};

USTRUCT()
struct FReplacedAsset
{
    UPROPERTY()
    TArray<ECatCore_Platforms> TargetPlatforms;
};
```

Each entry maps an original package path to the list of platforms for which it should be replaced. If source control is active, the config file is automatically checked out before saving to prevent lock issues.

### Redirect application

On startup, `FAssetReplacerSystem` reads the config, determines the current or target platform, and registers `FCoreRedirect` objects for all matching entries:

```cpp
void FAssetReplacerSystem::ApplyRedirects()
{
    TArray<FCoreRedirect> Redirects;
    for (const auto& Entry : Config->ReplacedAssets)
    {
        if (Entry.Value.TargetPlatforms.Contains(CurrentPlatform))
        {
            FString SubstitutePath = OriginalToSubstitutePackageName(Entry.Key, CurrentPlatform);
            Redirects.Add(FCoreRedirect(ECoreRedirectFlags::Type_Package,
                Entry.Key.ToString(), SubstitutePath));
        }
    }
    FCoreRedirects::AddRedirectList(Redirects, TEXT("CatnessAssetReplacer"));
}
```

When running as a cook commandlet, the target platform is parsed from the `-TargetPlatform=` command line argument. In a packaged game, it is detected at runtime via CatnessCore's platform detection. Only redirects matching the active platform are applied.

### Cook pipeline

A custom `UAssetManager` subclass (`UAssetManager`) hooks into the cook pipeline via `ModifyCook()`. For each platform being cooked, it adds the matching substitute packages to the cook list and excludes the originals, ensuring that only one version of each asset ends up in the final package:

```cpp
void UAssetManager::ModifyCook(/* ... */)
{
    // Add substitute packages for matching platform
    PackagesToCook.Add(SubstitutePath);
    // Exclude original from this platform's cook
    PackagesToNeverCook.Add(OriginalPath);
}
```

This is handled separately for UE4 (`ShouldCookForPlatform()`) and UE5 (`ModifyCook()` with multi-platform view), using CatnessCore's engine version macros.

### Content Browser integration

The plugin extends the Content Browser with two context menu actions registered through CatnessEditor's framework:

- **Replace by Platform**: Opens a platform selection dialog. On confirm, the asset is copied to the substitute folder for each selected platform, the config is updated, and the Content Browser refreshes.
- **Stop replacing asset**: Removes the asset from the config. Applied to a substitute, it removes only that platform; applied to the original, it removes all platforms.

<gallery>
    /img/experience/catness/asset_replacer/add_dialog.png|Dialog displayed after selecting "Replace by Platform".
</gallery>

A Slate asset view widget extension (`FAssetViewWidgetExtender`) overlays a status icon on every asset in the Content Browser:

- **Green icon** on originals that are being replaced.
- **Platform-colored icon** on substitute assets.
- **Warning status icon** when the setup is incomplete: missing substitute on disk, missing original in config, or substitute not tracked.

Hovering the asset shows in its tooltip the current tracking status, the affected platforms, and any validation error details.

<gallery>
    /img/experience/catness/asset_replacer/replaced.png|The icon displayed on the original asset that are being replaced.
    /img/experience/catness/asset_replacer/replaced_platform.png|The icons displayed on replaced assets, displaying the platform.
    /img/experience/catness/asset_replacer/missing_1.png|Tooltip with the asset status, with a warning because of a missing asset.
    /img/experience/catness/asset_replacer/missing_2.png|Other example of a missing asset.
    /img/experience/catness/asset_replacer/missing_3.png|Other possible warning in the toopltip.
</gallery>

# Catness Suite

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Overview

The Catness Suite is a collection of internal plugins developed from scratch to serve as the shared foundation across all porting projects at Catness Game Studios. Rather than duplicating utility code per project, the suite centralizes platform identification, editor tooling, and runtime utilities into three complementary modules that all other Catness plugins depend on.

## CatnessCore

CatnessCore is the foundational layer of the suite. Its main responsibilities are:

- **Platform detection**: Blueprint-callable function library for identifying the current platform at runtime (PC, PS4, Xbox One, Switch, etc) without needing per-platform compilation guards in gameplay code.
- **Viewport extension**: A custom `UGameViewportClient` subclass with a sub-registration system. Unlike `UGameInstanceSubsystem`, `UGameViewportClient` is not extensible by design and only one instance can exist and plugins cannot independently hook into it. This framework allows multiple systems to register into the same viewport client and receive function calls directly from it, without conflicts.
- **Module management**: A lightweight framework (`ICatCore_ModuleInterface` / `ICatCore_SubModule`) that allows other Catness plugins to register sub-modules and manage their lifecycle in a structured way.
- **Developer settings**: A base configuration class with support for per-platform value previewing directly in the editor, making platform-specific configuration easier to inspect and validate.
- **Engine version macros**: Compatibility helpers (`ENGINE_VERSION_EQUAL_OR_NEW_THAN`) to manage API differences across UE versions without scattering `#if` guards throughout the codebase.

## CatnessEditor

CatnessEditor provides a custom framework for creating and registering editor actions in context menus, working similarly to Unreal's Editor Utility Blueprints (Blutilities) but implemented in C++. Actions are self-contained classes that declare their own UI metadata, type constraints, optional parameters, and execution logic. The framework handles discovery, filtering, and invocation so the action itself only needs to implement what it does. Slate is used for the parameter dialogs when an action requires user input before executing.

### Extension points

Two extension points hook into the editor:

- **Content Browser**: Asset-level actions via right-click on assets, with bulk operation support.
- **Level Editor**: Actor-level actions via right-click in the viewport or outliner.

Each extension point filters the registered action list on every context menu open, only showing actions compatible with the current selection.

### Defining an action

Actions inherit from one of two interfaces depending on their target:

```cpp
// For Content Browser actions (operates on assets)
class FAddAssetToRedirect : public FIAssetFilteredAction
{
public:
    virtual FText GetActionName() override;
    virtual FText GetActionTooltip() override;
    // Which asset types trigger this action
    virtual TArray<UClass*> GetAssetTypes() override;
    // Optional: parameter UObject class used to define input parameters, shown in an Slate UI.
    virtual UClass* GetActionParamsClass() override;
    virtual void OnProcessAssets(const TArray<UObject*>& Assets) override;
};

// For Level Editor actions (operates on actors)
class FAddTagToActor : public FIActorAction
{
public:
    virtual FText GetActionName() override;
    virtual UClass* GetActionParamsClass() override;
    virtual void OnExecuteAction(const TArray<AActor*>& Actors, UWorld* EditorWorld) override;
};
```

### Registration

Actions register themselves from their plugin's `StartupModule`, specifying a pipe-separated category path that determines where they appear in the menu hierarchy:

```cpp
void FCatnessAssetReplacerEditorModule::StartupModule()
{
    FCatnessEditorModule::Get().RegisterExtender("Asset Replacer",
        FCatnessEditorModule::MakeExtender<FCatEd_AddAssetToRedirect>());

    FCatnessEditorModule::Get().RegisterExtender("Select...|By Material",
        FCatnessEditorModule::MakeExtender<FCatEd_SelectByMaterial>());
}
```

The framework deduplicates categories and builds the menu tree automatically: `"Select...|By Material"` and `"Select...|By Mesh"` both contribute to the same `"Select..."` submenu.

### Execution pipeline and parameters

When an action has parameters (`GetActionParamsClass()` returns a non-null class), the framework instantiates the parameter `UObject` and opens a Slate dialog backed by Unreal's Details View panel (the same property editor used across the editor) so any `UPROPERTY` on the params class is automatically exposed without additional UI code:

```cpp
// Parameter object. Properties are auto-rendered in the dialog
UCLASS()
class UActorTagParams : public UObject
{
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, Category="Tags")
    TArray<FName> TagList;
};

// Execution only runs if the user confirms the dialog
void FAddTagToActor::OnExecuteAction(const TArray<AActor*>& Actors, UWorld* EditorWorld)
{
    UActorTagParams* Params = GetActionParams<UActorTagParams>();
    for (AActor* Actor : Actors)
        for (const FName& Tag : Params->TagList)
            UActorFunctionLibrary::AddTagToActor(Actor, Tag);
}
```

The full pipeline is: `OnPreExecuteAction()` > parameter dialog (if any) > `OnExecuteAction()` > `OnPostExecuteAction()`. Asset actions also handle loading assets from `FAssetData` and optionally auto-saving dirty packages after execution.

### Gallery

<gallery>
    /img/experience/catness/suite/editor_context_menu.png|Example of CatnessEditor Content Browser actions. The menu displays only the actions that apply to all assets or the selected asset type.
    /img/experience/catness/suite/action_parameters.png|The parameters of an action, shown in a custom Slate widget.
</gallery>

## CatnessUtilities

CatnessUtilities provides the runtime and editor utility layer shared across projects:

- **Platform-specific libraries**: Function libraries for Switch and Steam.
- **Soft reference loading**: A custom Blueprint node (`K2Node_DynamicLoadSoftReferenceBlocking`) for synchronous asset loading, addressing gaps in the native Blueprint API for loading soft references, with automatic type detection.
- **`stat AvgUnit`**: An engine subsystem that displays rolling average frame times on screen covering frame, game thread, render thread, RHI, and GPU times, similar to how `stat unit` does. Configurable by frame count (`Cat.Stat.AvgFrames`) or time window (`Cat.Stat.AvgTime`). Useful during optimization passes to quickly assess the impact of a change without leaving the game session.

### Gallery

<gallery>
    /img/experience/catness/suite/soft_reference.png|The new Blueprint node to load soft references, automatically detecting the asset type.
    /img/experience/catness/suite/statavg.png|stat AvgUnit info displayed on the screen.
</gallery>
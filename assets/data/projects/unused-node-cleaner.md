# Overview

"Unused Node Cleaner" is an Unreal Engine plugin that allows you to clean your blueprints from unused nodes. The plugins adds two buttons on the blueprint graphs to allow hiding and cleaning the unused nodes.

# Challenges

The development of the plugin required exploring how Blueprint Graphs and Nodes works on the Engine. This was one of the main challenges as each type of graph has its own specific nodes that I have to handle to avoid data loss when running the plugin.

During the development I found that some graphs like Behavior Trees and EQS, although they support adding custom extensions to add my buttons, they never used those extensions and applied them. I had to open two pull requests ([PR-11958](https://github.com/EpicGames/UnrealEngine/pull/11958/files) and [PR-10345](https://github.com/EpicGames/UnrealEngine/pull/10345/files)) to fix this problem in the engine code. Both PR were accepted in UE 5.3 and UE 5.5, fixing the problem and making the plugin fully usable from engine menus on all supported graphs.

Another challenge was maintaining multiple engine versions with the same code base and features. From Unreal 4.27 to 5.5 you can use the same plugin version with the same exact code and features (only limited by the engine bugs mentioned above).

# Description

## Hide Unused

While enabled the nodes that are not connected to any execution path (and their connections) will appear darker.

<gallery>
    /img/projects/unusednodecleaner/hide.gif
</gallery>

In the gif above this text, you will see that after toggling on the "Hide Unused", some nodes become darker. 
Those nodes are the ones that are not connected to any execution path. As you edit the graph, the nodes are updated in real-time to give you a preview of all currently connected nodes.

You can also press Ctrl+Shift+H to toggle the feature on and off.

## Clean Graph
Clean all unused nodes in the current blueprint graph.

<gallery>
    /img/projects/unusednodecleaner/clean.gif
</gallery>

When pressing the "Clean Graph" button, all unused nodes in the current graph will be removed. You can undo this action with Ctrl+Z, as in any other operation.

You can also press Ctrl+Shift+C to clean the graph.

## Supported Features

Engine Version  | Plugin<br>Version | Blueprint  | AnimBP | Anim<br>Graph | State<br>Machine       | Behavior<br>Tree  | EQS | Project-Wide<br>cleaning
--------------- | -------------- |---- | ------ | --------- | ------------------ | --- | ---| ---
UE 5.5          | v2.4           | ✅ | ✅     | ✅        | ✅<sub>1</sub>    | ✅ | ✅ | ✅
UE 5.3-5.4      | v2.4           | ✅ | ✅     | ✅        | ✅<sub>1</sub>    | ✅ | ⚠️<sub>1</sub> | ✅
UE 4.27-5.2     | v2.4           | ✅ | ✅     | ✅        | ✅<sub>1</sub>    | ⚠️<sub>2</sub> | ⚠️<sub>1</sub> | ✅
UE 4.25-4.26    | v1.5           | ✅ | ✅     | ❌        | ❌                | ❌  | ❌ | ❌
UE 4.24 or less | ---            | ❌ | ❌     | ❌        | ❌                | ❌  | ❌ | ❌

* ⚠️<sub>1</sub> -> EQS cleaning is unavailable using the toolbar buttons due to an Engine bug that prevents them from being displayed ([PR-11958](https://github.com/EpicGames/UnrealEngine/pull/11958/files)). You can still use the keyboard shortcut (Ctrl+Shift+C by default).
* ⚠️<sub>2</sub> -> Behavior Tree is unavailable using the toolbar buttons due to an Engine bug that prevents them from being displayed ([PR-10345](https://github.com/EpicGames/UnrealEngine/pull/10345/files)). You can still use the keyboard shortcut (Ctrl+Shift+C by default).
* ✅<sub>1</sub> -> The "Hide Unused" button is displayed in the State Machine editor, but it currently doesn't work due to the State Machine nodes not supporting that feature.

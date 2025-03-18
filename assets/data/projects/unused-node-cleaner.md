
# Overview

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

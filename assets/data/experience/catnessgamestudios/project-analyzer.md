# Project Analyzer

<notice>

**Unreal Engine Version**: 4.27 - 5.5

</notice>

## Problem

Before porting a game to a new platform or engine version, it is valuable to have a clear picture of the project's technical health: how complex its materials are, whether its blueprints compile cleanly, how assets reference each other, whether lighting is built, and which assets are unusually heavy. Without a dedicated tool, this assessment requires opening dozens of editors, running individual commandlets, and manually correlating results, a process that is slow and incomplete.

## Solution

The Project Analyzer is an editor tool that scans a project's assets against a configurable set of rules and presents the results in a Slate window, grouped by category and exportable as JSON or HTML. It is accessible from the Content Browser context menu and opens a two-page wizard: the first page selects which rules to run and with which preset, the second displays the full results with collapsible sections and asset hyperlinks.

<gallery>
    /img/experience/catness/project_analyzer/wizard_rules.png|Preset and rules selection in the Wizard.
    /img/experience/catness/project_analyzer/results.png|Results screen.
    /img/experience/catness/project_analyzer/html.png|Exported results to HTML.
</gallery>

## Implementation

### Rule system

All analysis logic lives in concrete subclasses of `UAnalyzerRule`. Each rule declares the asset types it handles and implements one or both processing paths depending on what it needs:

```cpp
class UAnalyzerRule : public UObject
{
public:
    virtual TArray<UClass*> GetAssetClasses();

    // Lightweight path: works with AssetRegistry metadata, no asset loading
    virtual void ProcessAssetData(const FAssetData& AssetData);

    // Full path: receives loaded UObject, needed for deep inspection
    virtual void ProcessAssetObject(UObject* Object);

    // Synthesizes collected data into display-ready results
    virtual FAnalysisResults GenerateResults();
};
```

Rules that only need reference counts or file sizes use `ProcessAssetData`. Rules that need to inspect blueprint graphs, material shaders, or mesh geometry use `ProcessAssetObject` and load assets into memory to read and analyze them.

### Analysis categories

The plugin includes 30+ rules across the following categories:

- **Blueprints**: Compilation errors and warnings, total node count with per-blueprint ranking, specific node types (dynamic casts, timelines, custom events), and component counts.
- **Materials**: Compilation errors, HLSL custom node usage, and shader instruction count per blend mode against the actual compiled shader.
- **Meshes**: Triangle and vertex counts per LOD, material slot count, LOD chain length, with separate rules for static and skeletal meshes.
- **Textures**: Power-of-two validation grouped by texture group. Non-POT textures cause issues on several console platforms.
- **References**: Assets with the most in-references, assets with no in-references (candidates for cleanup), and outbound reference chains.
- **Size**: Disk and runtime RAM footprint per asset via `IAssetManagerEditorModule`, including transitive dependencies.
- **Levels**: Unbuilt lighting, reflection captures, HLOD, navmesh, and texture streaming status per level.
- **Actors**: Tick-enabled actors, child actor component usage, component count per actor type.
- **Naming**: Regex-based asset name scanning to detect non-standard naming conventions or deprecated patterns.
- **Localization**: Localization scanning and terminology database validation.

### Result data structures

Each rule's `GenerateResults()` returns a `FAnalysisResults` that separates short summary lines from detailed tables:

```cpp
struct FAnalysisResults
{
    TArray<FString> StringOutputs;
    TArray<FArrayResult> ArrayOutputs;
};
```

`FArrayResult` represents one table with a title, an optional rank column, and an array of rows:

```cpp
struct FArrayResult
{
    FString Title;
    bool bShowRankColumn;
    bool bShowFileColumn;
    TArray<FString> ExtraColumnTitles;
    TArray<FArrayElementResult> Elements;
};
```

Each row carries the asset path and any number of typed extra-data cells:

```cpp
struct FArrayElementResult
{
    FString AssetPath;
    TArray<FArrayElementExtraData> ExtraData;
};

struct FArrayElementExtraData
{
    FString StringValue;
    float NumericValue;           // Used for proper numeric sorting
    FString FormatString;         // Printf format, e.g. "%.2f%%" or "%d"
    bool bUseNumericValueForSort;
    bool bIsHyperlink;
    FString HyperlinkAssetPath;
};
```

The format string and numeric sort override allow a cell to display as `"45.67%"` while sorting correctly as a float, a common need when showing instruction counts, percentages, or memory sizes alongside plain text columns.

### Slate UI

The window is a two-page `SWizard`. The first page shows a preset selector (using a `SComboBox`) and a Details View panel bound to a transient `UWizardSettings` object, where the active rule list can be edited before running. The second page is the results view.

Results render in a scrollable hierarchy of nested, independently collapsible widgets:

```
SAnalyzerResults
└── SRuleCategory   (one per asset type: Blueprint, Material, ...)
    └── SRuleResult  (one per rule)
        ├── String summaries (STextBlock rows)
        └── SArrayTable  (one per FArrayResult)
            └── SRuleResultArrayListItem  (one per row)
```

`SRuleCategory` renders the category header with an asset type icon retrieved from the Slate editor style, and expands/collapses all its child rules as a group. `SRuleResult` renders the rule title, its string summary lines, and each of its array tables. Tables are themselves collapsible and built with `SListView<FArrayElementResult>`, using `ExtraColumnTitles` to generate the column headers dynamically.

Each `SRuleResultArrayListItem` row builds its cells from `ExtraData`, formatting each value with its `FormatString`. If the element has an asset path, the row renders as a hyperlink, and clicking it calls `GEditor->GetSelectedObjects()->Select(Asset)` to focus the asset in the Content Browser.

A control bar above the scroll area shows the total scanned asset and rule counts, and provides four buttons: collapse all categories, expand all categories, export JSON, and export HTML. Collapse/expand state is tracked per widget and propagated down the hierarchy so partial expansion states are preserved.

### Example rule implementation

A rule that counts nodes per blueprint and ranks them by count:

```cpp
void URule_Blueprint_NodeCount::ProcessAssetObject(UObject* Object)
{
    UBlueprint* Blueprint = Cast<UBlueprint>(Object);
    int32 NodeCount = 0;
    for (UEdGraph* Graph : Blueprint->UbergraphPages)
        NodeCount += Graph->Nodes.Num();

    TotalNodeCount += NodeCount;
    NodeCountPerBlueprint.Add({ Blueprint->GetPathName(), NodeCount });
}

FAnalysisResults URule_Blueprint_NodeCount::GenerateResults()
{
    FAnalysisResults Results;

    Results.StringOutputs.Add(FString::Printf(
        TEXT("Total node count: %d"), TotalNodeCount));

    FArrayResult Table;
    Table.Title = TEXT("Node count per Blueprint:");
    Table.bShowRankColumn = true;
    Table.ExtraColumnTitles = { TEXT("Nodes"), TEXT("% of total") };

    NodeCountPerBlueprint.Sort([](auto& A, auto& B){ return A.Count > B.Count; });

    for (const auto& Entry : NodeCountPerBlueprint)
    {
        float Percentage = 100.f * Entry.Count / TotalNodeCount;

        FArrayElementResult Row;
        Row.AssetPath = Entry.Path;

        FArrayElementExtraData CountCell;
        CountCell.NumericValue = Entry.Count;
        CountCell.FormatString = TEXT("%d");
        CountCell.bUseNumericValueForSort = true;
        Row.ExtraData.Add(CountCell);

        FArrayElementExtraData PctCell;
        PctCell.NumericValue = Percentage;
        PctCell.FormatString = TEXT("%.2f%%");
        PctCell.bUseNumericValueForSort = true;
        Row.ExtraData.Add(PctCell);

        Table.Elements.Add(Row);
    }

    Results.ArrayOutputs.Add(Table);
    return Results;
}
```

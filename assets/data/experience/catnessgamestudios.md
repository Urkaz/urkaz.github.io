# Porting

The role involved porting games to console platforms using Unreal Engine 4 and 5.

Most projects were developed by teams of 3 to 5 developers, with close communication through weekly sprints and status meetings to track progress and manage tasks in Jira. Version control was handled using Git or Perforce, depending on the needs of the project. In some cases, we worked closely with the client, incorporating their feedback throughout the porting process.

My philosophy during porting was to always respect the original work, avoiding drastic changes unless strictly necessary, while ensuring strong performance across all areas of the game.

The porting process included:

* Game code and Blueprint analysis.
* Performance profiling and optimization.
* CPU optimization.
* GPU optimization.
* Implementation of platform-specific features (controller support, engagement screens, activities, etc.).
* Bug fixing.

## Games ported

In the list below are all the games I worked on at Catness Game Studios. Click on any game with the <icon>{"iconType": "fontawesome", "icon": "fa-solid fa-arrow-turn-up"}</icon> icon to see a detailed description of my contributions to that project.

<isotope>
{
  "items": "/assets/data/lists/_list_projects_games.json",
  "filters": ["/assets/data/experience/lists/_catness_filter_platforms.json"],
  "prefilter": "/assets/data/experience/lists/_catness_tag_games_prefilter.json",
  "prefixes": "/assets/data/experience/lists/_catness_tag_games_prefixes.json"
}
</isotope>

# Engine development

<warning>This section is a work in progress. It will be expanded in the future with more information.</warning>

Engine development and customization with multiple bug fixes and improvements.

Engine:

* Indexed Actor tags: Optimizes Actor Tag search by indexing them in a TMap.
* Alternative LOD screensize auto-calculation: Override and auto-calculate screen size of each LOD Level according to the MinLOD set for each platform, allowing more progressive LOD transitions.
* Implemented a toggle in Material Instances to allow setting them to Fully Rough (which was only available in parent Materials).
* Modified and implemented a way to handle Instanced Static Meshes in Mobile Software Occlusion.
* Fix Negative transform in Instanced Mesh previews.
* Optimization of cloth physics by allowing reducing the cloth tick rate by distance to the player.
* Improved Switch controller management code.
* Other smaller fixes to platforms and engine code.

UnrealBuildTool:

* Changed the build path folder in UnrealBuildTool to include the current date and master versions
* Added calls to all platform SDKs to create a digest/hash of the generated build.

<isotope>
{
  "items": "/assets/data/experience/lists/_catness_list_engine.json",
  "filters": ["/assets/data/experience/lists/_catness_filter_engine.json"],
  "prefilter": "/assets/data/experience/lists/_catness_tag_engine_prefilter.json"
}
</isotope>

# Tools and Plugin development

<warning>This section is a work in progress. It will be expanded in the future with more information.</warning>

Plugin and tool development to expand the engine base functionality, and ease the porting process to consoles.

Plugins:

* CatnessCore: Plugin with Platform identification functions and a small framework to allow multiple instances of UGameViewportClient.
* CatnessEditor: Plugin with a framework to create editor tools similar to the Unreal's "Editor Utility Blueprints", with dynamic parameters displayed in a custom Slate pop-up, and pre-filtered by supported actor or asset type.
* CatnessUtilities: A collection of uncategorized tools and utilities:
  * Custom Blueprint nodes to resolve loading SoftReferences.
  * Platform Blueprint Libraries for PS5, Steam and Switch.
* AssetReplacer: Plugin that allowed used the Unreal's Redirector system to replace assets by platform, allowing switching assets in runtime by adding them to a config file. It integrated into the Content Browser, displaying status icons, and made use of the system from CatnessEditor to add action to the context menu to help managing the assets.
* CustomDeviceProfiles: Allowed creating and applying Device Profiles in runtime as if they were a stack of applied variables. For example, this allowed us having multiple device profiles to optimize specific parts of the game that were less performant by pushing small DP with more strict variables.
* EngagementScreen: Plugin to handle and manage the Xbox engagmenet screen, profiles and controller assginment and changes.
* Instancing: Plugin to easily create Instanced Static Meshes in the editor. It also included a way to easily select and modified instances in the editor.
* MaxDrawDistanceManager: Plugin to calculate the MaxDrawDistance of Static Meshes in runtime based on a preset parameters by platform. All calculations made by the plugins ran in a different thread to not cause addition hitches in the main thread. It also allowed calculating and optimizing Lights and Shadows.
* ProjectAnalyzer: An editor tool created to analyze a project. This was created to help evaluating the projects before starting the porting process. The analysis was displayed in a Slate window, and was exportable as JSON and HTML. It included:
  * Tick and component analysis.
  * Soft and Hard reference analysis.
  * Analysis of Blueprint errors, number of nodes per Bleurpint, count of specific key nodes.
  * Sublevels and unbuild level analysis.
  * Material statistics analysis.
  * Mesh LOD and Triangle counts, and overall analysis.
  * Localization statistics.
* TickIntervalManager: Plugin to optimized the Tick Interval of Actors and Components when they were far from the player or outside the player view.
* Activities: Plugin for easily create and manage PS5 Activities from a settings menu, allowing triggering other actions from the results of anothers.

# Engine development

Engine development and customization with multiple bug fixes and improvements:

* **Indexed Actor tags**: Actor Tag search optimization via TMap indexing.
* **Alternate LOD screensize**: Auto-calculation of LOD screen sizes per platform MinLOD.
* **Fully Rough Material Instances**: Toggle for Fully Rough mode in Material Instances.
* **ISMC in Mobile Occlusion**: Support for Instanced Static Meshes in Mobile Software Occlusion.
* **Cloth Physics Optimization**: Cloth tick rate reduction based on player distance.
* **Build Path Folder**: Date and version stamping in UnrealBuildTool build paths.
* Other fixes: Switch controller improvements, HLOD LOD auto-generation, metadata display in nested structs.

Click any entry below with the <icon>{"iconType": "fontawesome", "icon": "fa-solid fa-link"}</icon> icon to view implementation details on selected changes.

<isotope>
{
  "items": "/assets/data/experience/lists/catnessgamestudios/_catness_list.json",
  "filters": ["/assets/data/experience/lists/catnessgamestudios/engine/_catness_filter_engine.json"],
  "prefilter": "/assets/data/experience/lists/catnessgamestudios/engine/_catness_tag_engine_prefilter.json"
}
</isotope>

# Plugin Tools development

Development of internal plugins and tools to extend the engine, streamline the porting pipeline, and integrate platform-specific features for PS5 and Xbox.

* **Catness Suite** (Core + Editor + Utilities plugins): Internal framework providing platform identification utilities, a system for creating parameterized editor tools with actor and asset type filtering, and Blueprint libraries for Steam and Switch.
* **AssetReplacer**: Runtime asset replacement by platform using Unreal's Redirector system, with Content Browser integration and context menu actions.
* **CustomDeviceProfiles**: Runtime creation and stacking of Device Profiles for fine-grained per-platform optimization.
* **Instancing**: Editor tool to create and manage Instanced Static Meshes with per-instance selection and editing.
* **MaxDrawDistanceManager**: Runtime MaxDrawDistance, light, and shadow calculation by platform preset, with all processing handled asynchronously.
* **ProjectAnalyzer**: Full project analysis tool covering ticks, references, Blueprints, materials, LODs, and localization, with results exportable as JSON and HTML.
* **TickIntervalManager**: Actor and component tick interval optimization based on player distance and visibility.
* **Platform integrations** (PS5 & Xbox): PS5 Activities management and Xbox Engagement Screen handling, including profile management and controller assignment.

<isotope>
{
  "items": "/assets/data/experience/lists/catnessgamestudios/_catness_list.json",
  "filters": ["/assets/data/experience/lists/catnessgamestudios/plugins/_catness_filter_plugins.json"],
  "prefilter": "/assets/data/experience/lists/catnessgamestudios/plugins/_catness_tag_plugins_prefilter.json"
}
</isotope>

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
  "filters": ["/assets/data/experience/lists/catnessgamestudios/games/_catness_filter_platforms.json"],
  "prefilter": "/assets/data/experience/lists/catnessgamestudios/games/_catness_tag_games_prefilter.json",
  "prefixes": "/assets/data/experience/lists/catnessgamestudios/games/_catness_tag_games_prefixes.json"
}
</isotope>
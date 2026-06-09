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

Development of internal plugins and tools to extend the engine, streamline the porting pipeline, and integrate platform-specific features.

* **Catness Suite** (Core + Editor + Utilities plugins): Internal framework providing platform identification utilities, a system for creating parameterized editor tools with actor and asset type filtering, and Blueprint libraries for Steam and Switch.
* **AssetReplacer**: Runtime asset replacement by platform using Unreal's Redirector system, with Content Browser integration and context menu actions.
* **CustomDeviceProfiles**: Runtime creation and stacking of Device Profiles for fine-grained per-platform optimization.
* **Instancing**: Editor tool to create and manage Instanced Static Meshes with per-instance selection and editing.
* **MaxDrawDistanceManager**: Runtime MaxDrawDistance, light, and shadow calculation by platform preset, with all processing handled asynchronously.
* **ProjectAnalyzer**: Full project analysis tool covering ticks, references, Blueprints, materials, LODs, and localization, with results exportable as JSON and HTML.
* **TickIntervalManager**: Actor and component tick interval optimization based on player distance and visibility.
* **Platform integrations** (PS5 & Xbox): PS5 Activities management and Xbox Engagement Screen handling, including profile management and controller assignment.

Click any entry below with the <icon>{"iconType": "fontawesome", "icon": "fa-solid fa-link"}</icon> icon for more details about the plugin.

<isotope>
{
  "items": "/assets/data/experience/lists/catnessgamestudios/_catness_list.json",
  "filters": ["/assets/data/experience/lists/catnessgamestudios/plugins/_catness_filter_plugins.json"],
  "prefilter": "/assets/data/experience/lists/catnessgamestudios/plugins/_catness_tag_plugins_prefilter.json"
}
</isotope>

# Porting

Console porting using Unreal Engine 4 and 5, in teams of 3 to 5 developers. Projects were managed through weekly sprints and Jira, with version control in Git or Perforce depending on the project. Some projects involved direct collaboration with the client throughout the process.

My approach during the porting process prioritized respecting the original work, avoiding unnecessary changes while ensuring solid performance across the game.

* **Code and Blueprint analysis**: compatibility and performance review before porting begins.
* **CPU optimization**: tick management, async processing, thread load analysis and profiling.
* **GPU optimization**: draw call reduction, light cost optimization, render complexity tuning via device profiles, LODs.
* **Platform features**: controller support, engagement screens, platform activities, and certification requirements.
* **Bug fixing**: reproduction, root cause analysis, and fixes across gameplay, rendering, and platform layers.

Click any game below with the <icon>{"iconType": "fontawesome", "icon": "fa-solid fa-arrow-turn-up"}</icon> icon for more details about my work in that game.

<isotope>
{
  "items": "/assets/data/lists/_list_projects_games.json",
  "filters": ["/assets/data/experience/lists/catnessgamestudios/games/_catness_filter_platforms.json"],
  "prefilter": "/assets/data/experience/lists/catnessgamestudios/games/_catness_tag_games_prefilter.json",
  "prefixes": "/assets/data/experience/lists/catnessgamestudios/games/_catness_tag_games_prefixes.json"
}
</isotope>
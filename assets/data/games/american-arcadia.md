# My role

My role has helping during the porting process to fix the async loading code of the scenes in consoles, and optimize the GPU and CPU in those levels that needed it.

## Challenges

### Seamless loading

The original game is programmed to load all scenes while you play or while you are watching cinematic videos. This works perfectly in all modern computers, but doing that in old gen consoles (PS4, Xbox One and Switch) was a different thing.

Some consoles struggle a bit when reading from the hard drive, making all async loads a lot longer. This caused some scenes load later than it should, causing holes to appear in the level geometry and severe popping. Also, it was worse when loading an scene while watching a cinematic video, not ending the load before the video, starting the next scene in an incorrect world state.

To fix this I had to analyze how the game handled the async load of the scenes, and rewrite part of the original code to make the most important sublevels (the ones needed immediately) to load first and faster, while having the less important (the ones that were far away or not visible) to load later.

Additinally, videos were recompressed and rescaled from 4K to 1080p to save space and hasten their loading.

### Optimization

General optimization techniques were used to gain CPU performance like limiting the ticking actors by distance, or selectively enabling and disabling actors that were always active by default.

In terms of GPU, the gamme ran pretty good (with the exceptions of the scenes using Render Targets), so a general approach was used to optimize the GPU by tweaking the Device Profiles and generating more optimized LODs.

The scenes that used Render Targets were worked extensively, reducing the poly count with more optimized LODs, and custom Device Profiles (using one of the plugins I developed for another port) that allowed us to gaing more GPU performance by removing some graphical features that were less noticeable.
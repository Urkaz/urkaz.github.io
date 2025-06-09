# My role

My job was to support the porting process by fixing the async scene loading on consoles and optimizing both GPU and CPU performance in the levels that needed it.

## Challenges

### Seamless loading

The original game was designed to load scenes in the background as you played or during cinematic videos. This worked perfectly on modern PCs, but doing the same on older consoles like PS4, Xbox One, and Switch was a different story.

Some of these consoles struggle with disk read speeds, making async loading much slower. As a result, some scenes wouldn't load in time, causing gaps in the geometry and heavy popping. It got even worse when scenes were loading during a cinematic video, sometimes the new scene wouldn’t finish loading before the video ended, leaving the world in an incorrect state when gameplay resumed.

To fix this, I analyzed how the async loading system worked in the game and rewrote parts of the original code so that the most critical sublevels (the ones needed immediately) would load first and faster, while less important ones (those far away or not visible) could load later.

Additionally, all videos were recompressed and downscaled from 4K to 1080p to save space and reduce loading times.

### Optimization

We applied general optimization techniques to improve CPU performance, like limiting ticking based on distance and selectively enabling/disabling actors that were always active by default.

On the GPU side, the game already ran well in most scenes, so we focused on overall improvements: tweaking Device Profiles and generating better-optimized LODs.

The scenes that used Render Targets required more attention. We reduced even more the poly count by creating more optimized LODs and used custom Device Profiles (leveraging one of the plugins I had developed in another port) to turn off less noticeable graphical features and gain extra GPU performance.
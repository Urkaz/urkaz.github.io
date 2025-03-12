export const YoutubeVideo = ({ videoURL }) => {
    return (
        <iframe
            src={videoURL}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    );
};
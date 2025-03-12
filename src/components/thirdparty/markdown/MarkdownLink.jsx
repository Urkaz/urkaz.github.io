import { YoutubeVideo } from "@components/thirdparty/YoutubeVideo";

export const MarkdownLink = ({ children, href }) => {
    if (href.includes("youtube.com") || href.includes("youtu.be")) {
        return <YoutubeVideo videoURL={href} />;
    }
    return <a href={href}>{children}</a>;
}
import { YoutubeVideo } from "@components/thirdparty/YoutubeVideo";
import Link from "next/link";

export const MarkdownLink = ({ children, href }) => {
    if (href.includes("youtube.com") || href.includes("youtu.be")) {
        return <YoutubeVideo videoURL={href} />;
    }
    return <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link>;
}
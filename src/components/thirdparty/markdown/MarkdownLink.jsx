import { YoutubeVideo } from "@components/thirdparty/YoutubeVideo";
import Link from "next/link";

import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownLink = ({ children, href, className }) => {
    if (href.startsWith("#")) {
        return <a href={href} className={className}>{children}</a>;
    }

    if ((href.includes("youtube.com") || href.includes("youtu.be")) && (!children || children === href)) {
        return <span className="row">
            <span className={`col-lg-8 ${styles["centered-gallery"]} ${className}`}>
                <YoutubeVideo videoURL={href} />
            </span>
        </span>;
    }
    return <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</Link>;
}
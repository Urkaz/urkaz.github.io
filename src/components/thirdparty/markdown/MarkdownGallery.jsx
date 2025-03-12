import { GallerySwiper } from "@components/thirdparty/Swiper";

import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownGallery = ({ children }) => {
    const text = Array.isArray(children) ? children.join("") : children;
    if (typeof text !== "string") return null;
    const images = text
        .trim()
        .split("\n")
        .map((line) => {
            const [src, alt] = line.split("|").map((part) => part.trim()); // get URL and Alt text
            return { src, alt: alt || "" };
        })
        .filter((img) => img.src !== ""); // Filter empty lines

    return (
        <div className="row">
            <div className={`col-lg-8 ${styles["centered-gallery"]}`}>
                <GallerySwiper
                    imageList={images}
                    autoplayEnabled={false}
                />
            </div>
        </div>
    );
};

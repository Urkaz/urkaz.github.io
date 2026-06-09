import React from "react";

import { GallerySwiper } from "@components/thirdparty/Swiper";
import { SectionContent } from "@components/common/SectionsContent";
import { YoutubeVideo } from "@components/thirdparty/YoutubeVideo";
import { MarkdownRender } from "@components/thirdparty/MarkdownRender";
import { MarkdownTOC } from "@src/components/thirdparty/markdown/MarkdownTOC";
import { LinkPills, LinkPill } from "@components/common/LinkPills";

import styles from "@styles/pages/game_details.module.scss";

const ProjectDescriptionID = ({ name, projectData, markdownContent }) => {
    return (
        <>
            <SectionContent title={name} sectionId="gamedetails">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className={styles["game-info"]} data-aos="fade-up" data-aos-delay="100">
                            <h4>Project Details</h4>
                            <ul>
                                {projectData.details?.map((detail, index) => (
                                    <li key={index}>
                                        <strong>{detail.left}</strong>: {detail.right}
                                    </li>
                                ))}
                                {projectData.links ? (
                                    <>
                                        <li><strong>External links</strong>:</li>
                                        <li>
                                            <LinkPills>
                                                {projectData.links.map((link, index) => (
                                                    <LinkPill key={index} {...link} target="_blank" />
                                                ))}
                                            </LinkPills>
                                        </li>
                                    </>
                                ) : null}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8 mb-4" data-aos="fade-up" data-aos-delay="200">
                        {!projectData.hasGallery ? (
                            <div className={styles["game-video"]}>
                                <YoutubeVideo videoURL={projectData.video} />
                            </div>
                        ) : (
                            <GallerySwiper imageList={projectData.gallery} />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <div className={styles["md-toc-table"]} data-aos="fade-up" data-aos-delay="300">
                            <MarkdownTOC markdown={markdownContent} />
                        </div>
                    </div>
                    <div className="col-lg-9 mb-4">
                        <div className={`${styles["description-card"]}`} data-aos="fade-up" data-aos-delay="400">
                            <MarkdownRender content={markdownContent} />
                        </div>
                    </div>
                </div>
            </SectionContent>
        </>
    );
};

export function _generateStaticParams(metaData) {
    return Object.keys(metaData)
        .filter((key) => metaData[key].hasSection == true && !metaData[key].customRoute)
        .map((key) => ({ id: key }));
}

export default ProjectDescriptionID;

import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import { GallerySwiper } from "@components/thirdparty/Swiper";
import { SectionContent } from "@components/common/SectionsContent";
import { YoutubeVideo } from "@components/thirdparty/YoutubeVideo";
import { MarkdownRender } from "@components/thirdparty/MarkdownRender";
import { MarkdownTOC } from "@src/components/thirdparty/markdown/MarkdownTOC";

import { LinkPills, LinkPill } from "@components/common/LinkPills"

import styles from "@styles/pages/game_details.module.scss";

const ProjectDescriptionID = async ({ params, metaData, dataPath }) => {
    const { id } = await params;

    const jsonFilePath = path.join(process.cwd(), dataPath, `${id}.json`);
    const mdFilePath = path.join(process.cwd(), dataPath, `${id}.md`);

    if (!fs.existsSync(jsonFilePath) || !fs.existsSync(mdFilePath)) {
        return notFound();
    }

    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    const projectData = JSON.parse(fileContent);
    const projectMetaData = metaData[id];

    const markdownContent = fs.readFileSync(mdFilePath, "utf-8");

    if (!projectData || !projectMetaData.hasSection) {
        notFound();
    }

    return (
        <>
            <SectionContent title={projectMetaData.name} sectionId="gamedetails">
                {/*<SectionContent title={projectMetaData.noLogo == true ? projectMetaData.name : ""} sectionId="gamedetails">
                {projectMetaData.noLogo == true ? null :
                    <div className="row">
                        <div className="col mb-4">
                            <div className={styles["game-logo"]}><img src={`/img/games/logos/${id}.png`} className="img-fluid" alt={projectMetaData.name} effect="opacity" /></div>
                        </div>
                    </div>
                }*/}

                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className={styles["game-info"]} data-aos="fade-up" data-aos-delay="100">
                            <h3>Project Details</h3>
                            <ul>
                                {projectData.details?.map((detail, index) => {
                                    return (
                                        <li key={index}>
                                            <strong>{detail.left}</strong>: {detail.right}
                                        </li>
                                    );
                                })}

                                {/*gameData.platforms ? (
                                    <>
                                        <li>
                                            <strong>Platforms</strong>:{" "}
                                            {gameData.platforms.map((platform, index) => {
                                                return (
                                                    <span key={index}>
                                                        {platform.id} - {platform.link}
                                                    </span>
                                                );
                                            })}
                                        </li>
                                    </>
                                ) : null*/}

                                {projectData.links ? (
                                    <>
                                        <li><strong>External links</strong>:</li>
                                        <li>
                                            <LinkPills>
                                                {projectData.links.map((link, index) => {
                                                    return (
                                                        <LinkPill key={index} {...link} target="_blank" />
                                                    );
                                                })}
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
                    <div className="col-lg-4 mb-4">
                        <div className={styles["md-toc-table"]} data-aos="fade-up" data-aos-delay="300">
                            <MarkdownTOC markdown={markdownContent} />
                        </div>
                    </div>
                    <div className="col-lg-8 mb-4">
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
        .map((key) => ({
            id: key,
        }));
}

export default ProjectDescriptionID;

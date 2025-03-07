import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";

import { GallerySwiper } from "@components/thirdparty/Swiper.jsx";
import { SectionContent } from "@components/common/SectionsContent.jsx";

import GameMetaData from "@assets/data/games/lists/_list_games.json";

import styles from "@styles/pages/game_details.module.scss";

const YoutubeVideo = ({ videoURL }) => {
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

const GameDescription = async ({ params }) => {
    const { id } = await params;

    const jsonFilePath = path.join(process.cwd(), "assets", "data", "games", `${id}.json`);
    const mdFilePath = path.join(process.cwd(), "assets", "data", "games", `${id}.md`);

    if (!fs.existsSync(jsonFilePath) || !fs.existsSync(mdFilePath)) {
        return notFound();
    }

    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    const gameData = JSON.parse(fileContent);
    const gameMetaData = GameMetaData[id];

    const markdownContent = fs.readFileSync(mdFilePath, "utf-8");

    if (!gameData || !gameMetaData.hasSection) {
        notFound();
    }

    return (
        <>
            <SectionContent title={gameMetaData.name} description={gameData.description} sectionId="gamedetails">
                <div className="row gy-4">
                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                        {!gameData.hasGallery ? (
                            <div className={styles["game-video"]}><YoutubeVideo videoURL={gameData.video} /></div>
                        ) : (
                            <GallerySwiper swiperClassName={styles["game-slider"]} imageList={gameData.gallery} />
                        )}
                    </div>
                    <div className="col-lg-4">
                        <div className={styles["game-info"]} data-aos="fade-up" data-aos-delay="200">
                            <h3>Project Details</h3>
                            <ul>
                                {gameData.details?.map((detail, index) => {
                                    return (
                                        <li key={index}>
                                            <strong>{detail.left}</strong>: {detail.right}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">
                    <Markdown
                        options={{
                            overrides: {
                                a: {
                                    component: ({ children, href }) => {
                                        if (href.includes("youtube.com") || href.includes("youtu.be")) {
                                            return <YoutubeVideo videoURL={href} />;
                                        }
                                        return <a href={href}>{children}</a>;
                                    },
                                },
                            },
                        }}
                    >
                        {markdownContent}
                    </Markdown>
                </div>
            </SectionContent>
        </>
    );
};

export function generateStaticParams() {
    return Object.keys(GameMetaData)
        .filter((key) => GameMetaData[key].hasSection == true)
        .map((key) => ({
            id: key,
        }));
}

export default GameDescription;

import React from "react";
import fs from "fs";
import path from "path";
import GameMetaData from "@assets/data/games/lists/_list_games.json";
import { notFound } from "next/navigation";

import { SectionContent } from "@components/common/SectionsContent.jsx";
import { GallerySwiper } from "@components/thirdparty/Swiper.jsx";

import styles from "@styles/pages/game_details.module.scss";

const YoutubeVideo = ({ videoURL }) => {
    return (
        <div className={styles["game-video"]}>
            <iframe
                src={videoURL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};

const GameDescription = async ({ params }) => {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "assets", "data", "games", `${id}.json`);

    if (!fs.existsSync(filePath)) {
        return notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const gameData = JSON.parse(fileContent);
    const gameMetaData = GameMetaData[id];

    if (!gameData || !gameMetaData.hasSection) {
        notFound();
    }

    return (
        <>
            <SectionContent title={gameMetaData.name} description={gameData.description} sectionId="gamedetails">
                <div className="row gy-4">
                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                        {!gameData.hasGallery ? (
                            <YoutubeVideo videoURL={gameData.video} />
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
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="300"></div>
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

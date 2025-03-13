"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

import { cleanText } from "@src/components/functions";

import styles from "@styles/pages/games.module.scss";
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const GameGridItem = ({ category, name, tag, noLogo = false, platforms, hasSection = false, keyName, customRoute }) => {
    const pathname = usePathname();

    {
        /* @TODO TEMP DISABLED */
    }
    hasSection = hasSection & pathname != "/projects";

    const content = (
        <>
            <div className={`${styles["game-content"]} h-100 ${hasSection ? styles["selectable"] : null}`}>

                {/* FOLD LINK INDICATOR */}
                {hasSection || customRoute ? (
                    <div className={styles["fold"]}>
                        <div className={styles["fold-link"]}>
                            <FontAwesomeIcon icon={customRoute ? faArrowTurnUp : faLink} />
                        </div>
                    </div>
                ) : null}

                <div className={styles["game-background"]}><LazyLoadImage src={`/img/games/tiles/${cleanText(name)}.png`} className="img-fluid" alt={name} effect="opacity" /></div>

                {/* OVERLAY WITH LOGO OR TITLE */}
                <div className={styles["game-overlay"]}>
                    {noLogo == true ? <p>{name}</p> : <div className={styles["game-logo"]}><LazyLoadImage src={`/img/games/logos/${cleanText(name)}.png`} className="img-fluid" alt={name} effect="opacity" /></div>}
                </div>

                {/* FLOATING DETAILS (tags, platforms, etc) */}
                <div className={styles["game-info"]}>
                    <h4 className={styles["floating-left"]}>{tag}</h4>
                    {platforms ? (
                        <h4 className={`${styles["floating-right"]} ${styles["miniplatforms"]}`}>
                            {platforms.map((item, index) => (
                                <img key={index} src={`/img/games/platforms/system_mini_${item}.png`} />
                            ))}
                        </h4>
                    ) : null}
                </div>
            </div>
        </>
    );

    return (
        <>
            <div
                className={`col-lg-4 col-md-6 ${styles["small-grid-item"]} isotope-grid-item ${category?.map((cat) => `category-${cat}`).join(" ")} ${platforms?.map((platform) => `category-${platform}`).join(" ")}`}
            >
                {hasSection || customRoute ? <Link href={customRoute ? customRoute : `${pathname}/${keyName}`}>{content}</Link> : content}
            </div>
        </>
    );
};

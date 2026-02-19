"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

import { CustomIcon } from "@src/components/common/CustomIcon";

import styles from "@styles/pages/games.module.scss";
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const GameGridItem = ({ category, name, tag, noLogo = false, platforms, hasSection = false, keyName, parentSection, hidden = false }) => {

    if (hidden)
        return <></>;

    const pathname = usePathname();
    let customRoute = parentSection != pathname;

    const content = (
        <>
            <div className={`${styles["game-content"]} h-100 ${hasSection ? styles["selectable"] : null}`}>

                {/* FOLD LINK INDICATOR
                {hasSection || customRoute ? (
                    <>
                        <div className={styles["fold"]}>
                            <div className={styles["fold-link"]}>
                                <FontAwesomeIcon icon={customRoute ? faArrowTurnUp : faLink} />
                            </div>
                        </div>
                    </>
                ) : null}
                */}

                <div className={styles["game-background"]}>
                    <LazyLoadImage src={`/img/games/tiles/${keyName}.png`} className="img-fluid" alt={name} effect="opacity" />
                </div>

                {/* OVERLAY WITH LOGO OR TITLE */}
                <div className={styles["game-overlay"]}>
                    {noLogo == true ? <p>{name}</p> : <div className={styles["game-logo"]}><LazyLoadImage src={`/img/games/logos/${keyName}.png`} className="img-fluid" alt={name} effect="opacity" /></div>}
                </div>

                {/* FLOATING DETAILS (tags, platforms, etc) */}
                <div className={styles["game-info"]}>
                    {hasSection ? <h4 className={styles["floating-bottom-right"]}><FontAwesomeIcon icon={customRoute ? faArrowTurnUp : faLink} /></h4> : null}
                    <div className={styles["hidden"]}>
                        <h4 className={styles["floating-left"]}>{tag}</h4>
                        {platforms ? (
                            <h4 className={`${styles["floating-right"]} ${styles["miniplatforms"]}`}>
                                {platforms.map((item, index) => (
                                    <CustomIcon key={index} img={`mini_${item}`} />
                                ))}
                            </h4>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div
                className={`col-lg-4 col-md-6 ${styles["small-grid-item"]} isotope-grid-item ${category?.map((cat) => `category-${cat}`).join(" ")} ${platforms?.map((platform) => `category-${platform}`).join(" ")} ${hasSection ? `category-devlog` : ""}`}
            >
                {hasSection ? <Link href={`${parentSection}/${keyName}`}>{content}</Link> : content}
            </div>
        </>
    );
};

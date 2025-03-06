"use client";

import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { cleanText } from "@src/components/functions";

import styles from "@styles/pages/games.module.scss";

export const GameGridItem = ({ category, name, tag, noLogo = false, platforms, hasSection = false, keyName }) => {

    const content = <>
        <div className={`${styles['game-content']} h-100 ${keyName} ${hasSection ? styles["selectable"] : null}`}>
            {hasSection ?
                <div className={styles['fold']}><div className={styles['fold-link']}><FontAwesomeIcon icon={faLink} /></div></div>
                : null}
            <div className={styles['game-overlay']}>
                {noLogo == true ? <p>{name}</p> : <img src={`/img/games/logos/${cleanText(name)}.png`} className="img-fluid" alt={name} />}
            </div>
            <div className={styles['game-info']}>
                <h4 className={styles['floating-left']}>{tag}</h4>
                {platforms ?
                    <h4 className={`${styles['floating-right']} ${styles['miniplatforms']}`}>
                        {platforms.map((item, index) => (
                            <img key={index} src={`/img/games/platforms/system_mini_${item}.png`} />
                        ))}
                    </h4>
                    : null}
            </div>
        </div>
    </>;

    return <>
        <div className={`col-lg-4 col-md-6 ${styles['small-grid-item']} isotope-grid-item ${category?.map(cat => `category-${cat}`).join(" ")} ${platforms?.map(platform => `category-${platform}`).join(" ")}`}>
            {hasSection ? <Link href={`/games/${keyName}`}>{content}</Link> : content}
        </div>
    </>
};
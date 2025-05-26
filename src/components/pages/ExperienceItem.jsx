import React from "react";
import Link from "next/link";

import { getYearMonthDifference } from "@components/functions"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";

export const ExperienceItem = ({ name, site, startDate, endDate, fullTime, place, remote, logo, bulletPoints, hasSection, linkParent, itemKey }) => {
    let start_date = new Date(startDate);
    let end_date = new Date(endDate);

    const start_month = start_date.toLocaleString('en', { month: 'long' });
    const end_month = end_date.toLocaleString('en', { month: 'long' });

    return (
        <>
            <div className={styles["experience-timeline-item"]} data-aos="fade-up" data-aos-delay="100">
                <div className={styles["experience-item"]}>
                    <div className={styles["icon"]}>
                        <img src={logo} alt=""></img>
                    </div>
                    <div className={styles["experience-card"]}>
                        <h4>{name}</h4>
                        <h5>{site}</h5>
                        <p>
                            <FontAwesomeIcon icon={faCalendarDays} /> {start_month} {start_date.getFullYear()} - {end_month} {end_date.getFullYear()} ({getYearMonthDifference(start_date, end_date, true)} | {fullTime ? "Full-time" : "Part-time"})
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faLocationDot} /> {place} {remote ? "(Remote)" : "(On-site)"}
                        </p>
                        <ul>
                            {bulletPoints.map((point, index) => <li key={index}>{point}</li>)}
                        </ul>

                        {hasSection ? <Link href={`${linkParent}${itemKey}`} className={styles["button"]}>More details</Link>
                            : ""
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export const ExperienceSeparator = () => {
    return <div className={styles["experience-timeline-item"]} data-aos="fade-up" data-aos-delay="100">
        <div className={styles["experience-item-spacer"]}></div>
    </div>;
}
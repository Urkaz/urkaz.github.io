import React from "react";
import Link from "next/link";

import { getYearMonthDifference } from "@components/functions"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";

export const ExperienceItem = ({ name, site, startDate, endDate, hideEndDate, hideDuration, fullTime, hideFullTime, place, remote, logo, bulletPoints, hasButton, buttonLink, buttonText, buttonExternal }) => {
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);

    const start_month = start_date.toLocaleString('en', { month: 'long' });
    const end_month = end_date.toLocaleString('en', { month: 'long' });

    let text = " ";
    text += `${start_month} `; // Start month
    text += `${start_date.getFullYear()} `; // Start year

    text += hideEndDate ? "" : "- ";
    text += hideEndDate ? "" : `${end_month} `; // End month
    text += hideEndDate ? "" : `${end_date.getFullYear()} `; //End year

    // hideEndDate also hides duration
    text += hideFullTime && (hideEndDate || hideDuration) ? "" : "(";
    text += hideEndDate || hideDuration ? "" : `${getYearMonthDifference(start_date, end_date, true)}`;
    text += hideEndDate || hideFullTime || hideDuration ? "" : " | ";
    text += hideFullTime ? "" : (fullTime ? "Full-time" : "Part-time");
    text += hideFullTime && (hideEndDate || hideDuration) ? "" : ")";

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
                            <FontAwesomeIcon icon={faCalendarDays} />{text}
                        </p>

                        {place ?
                            <p><FontAwesomeIcon icon={faLocationDot} /> {place} {remote ? "(Remote)" : "(On-site)"}</p>
                            : null
                        }

                        {bulletPoints ?
                            <ul>{bulletPoints.map((point, index) => <li key={index}>{point}</li>)}</ul>
                            : null}

                        {hasButton ?
                            (buttonExternal ?
                                <Link href={buttonLink} className={styles["button"]} target="_blank" rel="noopener noreferrer">{buttonText}</Link> :
                                <Link href={buttonLink} className={styles["button"]}>{buttonText}</Link>)
                            : null
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
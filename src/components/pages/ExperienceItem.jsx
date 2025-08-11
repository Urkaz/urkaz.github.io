import React from "react";
import Link from "next/link";

import { getYearMonthDifference } from "@components/functions"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";

export const ExperienceItem = ({ name, site, startDate, endDate, hideDate, hideEndDate, hideDuration, fullTime, hideFullTime, place, remote, logo, bulletPoints, buttons, pointsTitle }) => {
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);

    const start_month = start_date.toLocaleString('en', { month: 'long' });
    const end_month = end_date.toLocaleString('en', { month: 'long' });

    let timeText = "";
    timeText += `${start_month} `; // Start month
    timeText += `${start_date.getFullYear()} `; // Start year

    timeText += hideEndDate ? "" : "- ";
    timeText += hideEndDate ? "" : `${end_month} `; // End month
    timeText += hideEndDate ? "" : `${end_date.getFullYear()} `; //End year

    // hideEndDate also hides duration
    timeText += hideFullTime && (hideEndDate || hideDuration) ? "" : "(";
    timeText += hideEndDate || hideDuration ? "" : `${getYearMonthDifference(start_date, end_date, true)}`;
    timeText += hideEndDate || hideFullTime || hideDuration ? "" : " | ";
    timeText += hideFullTime ? "" : (fullTime ? "Full-time" : "Part-time");
    timeText += hideFullTime && (hideEndDate || hideDuration) ? "" : ")";

    return (
        <>
            <div className={styles["experience-timeline-item"]} data-aos="fade-up" data-aos-delay="100">
                <div className={styles["experience-item"]}>
                    <div className={styles["experience-card"]}>
                        <div className={styles["icon"]}>
                            <img src={logo} alt=""></img>
                        </div>
                        <div className={`d-flex align-items-center ${styles["header"]}`}>
                            <div>
                                <h4>{name}</h4>
                                <h5>{site}</h5>
                            </div>
                        </div>

                        {
                            !hideDate ?
                                <div className={`d-flex align-items-center ${styles["header-details"]}`}>
                                    <div>
                                        <p className={styles["no-margin"]}><span className={styles["fa-icon-bullet"]}><FontAwesomeIcon icon={faCalendarDays} /></span>{timeText}</p>
                                        {place ?
                                            <p className={styles["no-margin"]}><span className={styles["fa-icon-bullet"]}><FontAwesomeIcon icon={faLocationDot} /></span>{place} {remote ? "(Remote)" : ""}</p>
                                            : null
                                        }
                                    </div>
                                </div>
                                : null
                        }

                        <p className={styles["no-margin"]}>{pointsTitle}</p>
                        {bulletPoints ?
                            <ul>{bulletPoints.map((point, index) => <li key={index}>{point}</li>)}</ul>
                            : null}

                        {
                            buttons?.map(((button, index) => {
                                return <span key={index}>
                                    {!button.hide ?
                                        (button.externalLink ?
                                            <Link href={button.link} className={styles["button"]} target="_blank" rel="noopener noreferrer">{button.text}</Link> :
                                            <Link href={button.link} className={styles["button"]}>{button.text}</Link>)
                                        : null}
                                </span>;
                            }))
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
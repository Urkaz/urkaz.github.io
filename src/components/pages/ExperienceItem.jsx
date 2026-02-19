import React from "react";

import { getYearMonthDifference } from "@components/functions"
import { LinkPills, LinkPill } from "@components/common/LinkPills";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";
import pill_styles from "@styles/pages/home.module.scss";

export const ExperienceItem = ({ name, role, startDate, endDate, hideDate, hideEndDate, hideDuration, fullTime, hideFullTime, place, remote, logo, bulletPoints, buttons, pointsTitle }) => {
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
                                <h4>{role}</h4>
                                <h5>{name}</h5>
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
                                            <LinkPills className={pill_styles["pill-links"]}>
                                                <LinkPill
                                                    link={button.link}
                                                    text={button.text}
                                                />
                                            </LinkPills>
                                            :
                                            <LinkPills className={pill_styles["pill-links"]}>
                                                <LinkPill
                                                    link={button.link}
                                                    text={button.text}
                                                />
                                            </LinkPills>
                                        )
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
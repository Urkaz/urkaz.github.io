import React from "react";

import { getYearMonthDifference } from "@components/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays, faBriefcase, faClock } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/game_details.module.scss";

const ExperienceInfoBlock = ({ data }) => {
    const { startDate, endDate, current, contractType, place, remote } = data;

    const start_date = new Date(startDate);
    const end_date = endDate ? new Date(endDate) : null;

    const start_str = start_date.toLocaleString("en", { month: "long", year: "numeric" });
    const end_str = current ? "Present" : end_date?.toLocaleString("en", { month: "long", year: "numeric" });

    const effective_end = current ? new Date() : end_date;
    const durationText = effective_end ? getYearMonthDifference(start_date, effective_end, true) : null;

    return (
        <div className={`${styles["info-card"]} mb-4`} data-aos="fade-up" data-aos-delay="100">
            <h4>Information</h4>
            <ul>
                <li>
                    <span className={styles["info-icon"]}><FontAwesomeIcon icon={faCalendarDays} /></span>
                    {start_str}{end_str ? ` - ${end_str}` : ""}
                </li>
                {durationText && (
                    <li>
                        <span className={styles["info-icon"]}><FontAwesomeIcon icon={faClock} /></span>
                        {durationText}
                    </li>
                )}
                {contractType && (
                    <li>
                        <span className={styles["info-icon"]}><FontAwesomeIcon icon={faBriefcase} /></span>
                        {contractType}
                    </li>
                )}
                {(place || remote) && (
                    <li>
                        <span className={styles["info-icon"]}><FontAwesomeIcon icon={faLocationDot} /></span>
                        {remote ? "Remote" : place}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ExperienceInfoBlock;

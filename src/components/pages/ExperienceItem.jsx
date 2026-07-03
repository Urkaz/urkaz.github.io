import React from "react";

import { getYearMonthDifference } from "@components/functions"
import { LinkPills, LinkPill } from "@components/common/LinkPills";
import LiveDate from "@components/common/LiveDate";

import { TiltIcon } from "@components/pages/TiltIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";
import pill_styles from "@styles/pages/home.module.scss";

export const ExperienceItem = ({ name, role, startDate, endDate, hideDate, hideEndDate, hideDuration, current, contractType, place, remote, logo, bulletPoints, buttons, pointsTitle, isFirst = false, isLast = false }) => {
    const start_date = new Date(startDate);
    const end_date = new Date(endDate);

    const start_month = start_date.toLocaleString('en', { month: 'long' });
    const end_month = end_date.toLocaleString('en', { month: 'long' });

    let timeText = "";
    timeText += `${start_month} `;
    timeText += `${start_date.getFullYear()} `;

    timeText += hideEndDate ? "" : "- ";
    timeText += hideEndDate ? "" : (current ? "Present " : `${end_month} ${end_date.getFullYear()} `);

    const effective_end = current ? new Date() : end_date;
    const durationText = getYearMonthDifference(start_date, effective_end, true);
    const effectiveHideDuration = hideDuration || !durationText;
    const hasDuration = !hideEndDate && !effectiveHideDuration;
    const hasParens = contractType || hasDuration;

    let suffixText = "";
    suffixText += hasDuration && contractType ? " | " : "";
    suffixText += contractType ?? "";

    const itemClass = [
        styles["experience-item"],
        isFirst ? (current ? styles["dotted-top-line"] : styles["hide-top-line"]) : "",
        isLast ? styles["hide-bottom-line"] : "",
        current ? styles["current"] : ""
    ].filter(Boolean).join(" ");

    return (
        <>
            <div className={styles["experience-timeline-item"]} data-aos="fade-up" data-aos-delay="100">
                <div className={itemClass}>
                    <div className={styles["experience-card"]}>
                        <div className={`d-flex align-items-center ${styles["header"]}`}>
                            <TiltIcon logo={logo} name={name} />
                            <div>
                                <h4>{role}</h4>
                                <h5>{name}</h5>
                            </div>
                        </div>

                        {
                            !hideDate ?
                                <div className={`d-flex align-items-center ${styles["header-details"]}`}>
                                    <div>
                                        <p className={styles["no-margin"]}>
                                            <span className={styles["fa-icon-bullet"]}><FontAwesomeIcon icon={faCalendarDays} /></span>
                                            {timeText}
                                            {hasParens ? "(" : ""}
                                            {hasDuration ? (
                                                current ?
                                                    <LiveDate type="duration" args={{ startISO: start_date.toISOString(), endISO: null, roundUp: true }} initialValue={durationText} /> :
                                                    durationText
                                            ) : ""}
                                            {suffixText}
                                            {hasParens ? ")" : ""}
                                        </p>
                                        {(place || remote) ?
                                            <p className={styles["no-margin"]}><span className={styles["fa-icon-bullet"]}><FontAwesomeIcon icon={faLocationDot} /></span>{remote ? "Remote" : place}</p>
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
                            buttons?.some(b => !b.hide) &&
                            <div className={styles["buttons"]}>
                                {buttons.map((button, index) => (
                                    !button.hide ?
                                        <LinkPills key={index} className={pill_styles["pill-links"]}>
                                            <LinkPill
                                                link={button.link}
                                                text={button.text}
                                                target={button.externalLink ? "_blank" : ""}
                                            />
                                        </LinkPills>
                                        : null
                                ))}
                            </div>
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
import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { SectionContent } from "@components/common/SectionsContent";

import styles from "@styles/pages/experience.module.scss";

const Experience = () => {
    return (
        <>
            <SectionContent
                title="SKILLS"
                description={<>[TODO]</>}
                sectionId={styles["skills"]}
            >
            </SectionContent>
        </>
    );
};

export default Experience;

import React from "react";

import { SectionContent } from "@components/common/SectionsContent";
import { ExperienceItem } from "@components/pages/ExperienceItem";

import ExperienceList from "@assets/data/experience/lists/_list_professional.json";

import styles from "@styles/pages/experience.module.scss";

const Experience = () => {
    return (
        <>
            <SectionContent
                title="Professional Experience"
                description={<>This section highlights my professional experience, detailing the responsibilities and key tasks of each job role.</>}
                sectionId="experience"
                sectionClass={styles["experience"]}
            >
                <div className="row">
                    {Object.entries(ExperienceList).map(([key, item], index, arr) => (
                        <div key={key}>
                            <ExperienceItem {...item} isFirst={index === 0} isLast={index === arr.length - 1} />
                        </div>
                    ))}
                </div>
            </SectionContent>
        </>
    );
};

export default Experience;

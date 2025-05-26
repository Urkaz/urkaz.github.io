import React from "react";

import { SectionContent } from "@components/common/SectionsContent";
import { ExperienceItem, ExperienceSeparator } from "@components/pages/ExperienceItem";

import ExperienceList from "@assets/data/experience/professional.json";

import styles from "@styles/pages/experience.module.scss";

const Experience = () => {
    const count = Object.keys(ExperienceList).length;

    return (
        <>
            <SectionContent
                title="Professional Experience"
                description={<>This section highlights my professional experience, detailing the responsibilities and key tasks of each job role.</>}
                sectionId={styles["experience"]}
            >
                <div className="row">
                    {Object.entries(ExperienceList).map(([key, item], index) => (
                        <div key={key}>
                            <ExperienceItem {...item} />
                            {index != count-1 ? <ExperienceSeparator /> : null}
                        </div>
                    ))}
                </div>
            </SectionContent>
        </>
    );
};

export default Experience;

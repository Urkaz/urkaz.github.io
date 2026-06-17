import React from "react";

import { SectionContent } from "@components/common/SectionsContent";
import { ExperienceItem } from "@components/pages/ExperienceItem";

import EducationList from "@assets/data/education/education.json";
import CoursesList from "@assets/data/education/courses.json";

import styles from "@styles/pages/experience.module.scss";

const Education = () => {
    return (
        <>
            <SectionContent
                title="Education"
                description={
                    <>
                        This section showcases my academic background, including degrees, certifications, courses, and any additional training or
                        qualifications I&apos;ve completed.
                    </>
                }
                sectionId="education"
                sectionClass={styles["experience"]}
            >
                <div className="row">
                    <h1>Academic Background</h1>
                    {Object.entries(EducationList).map(([key, item], index, arr) => (
                        <div key={key}>
                            <ExperienceItem {...item} isFirst={index === 0} isLast={index === arr.length - 1} />
                        </div>
                    ))}
                </div>
                <div className="row mt-4">
                    <h1>Learning & Training</h1>
                    {Object.entries(CoursesList).map(([key, item], index, arr) => (
                        <div key={key}>
                            <ExperienceItem {...item} isFirst={index === 0} isLast={index === arr.length - 1} />
                        </div>
                    ))}
                </div>
            </SectionContent>
        </>
    );
};

export default Education;

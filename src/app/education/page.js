import React from "react";

import { SectionContent } from "@components/common/SectionsContent";
import { ExperienceItem, ExperienceSeparator } from "@components/pages/ExperienceItem";

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
                sectionId={styles["experience"]}
            >
                <div className="row">
                    <h1>Academic Background</h1>
                    {Object.entries(EducationList).map(([key, item], index) => (
                        <div key={key}>
                            <ExperienceItem {...item} />
                            {index != Object.keys(EducationList).length - 1 ? <ExperienceSeparator /> : null}
                        </div>
                    ))}
                </div>
                <div className="row mt-4">
                    <h1>Courses</h1>
                    {Object.entries(CoursesList).map(([key, item], index) => (
                        <div key={key}>
                            <ExperienceItem {...item} />
                            {index != Object.keys(CoursesList).length - 1 ? <ExperienceSeparator /> : null}
                        </div>
                    ))}
                </div>
            </SectionContent>
        </>
    );
};

export default Education;

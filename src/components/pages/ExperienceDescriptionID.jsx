import React from "react";

import { SectionContent } from "@components/common/SectionsContent";
import { MarkdownRender } from "@components/thirdparty/MarkdownRender";
import { MarkdownTOC } from "@components/thirdparty/markdown/MarkdownTOC";

import styles from "@styles/pages/game_details.module.scss";

const ExperienceDescriptionID = ({ name, role, markdownContent, headerContent }) => {
    return (
        <>
            <SectionContent title={name} description={role} sectionId="gamedetails">
                <div className="row">
                    <div className="col-lg-3 mb-4">
                        {headerContent}
                        <div className={styles["md-toc-table"]} data-aos="fade-up" data-aos-delay="100">
                            <MarkdownTOC markdown={markdownContent} />
                        </div>
                    </div>
                    <div className="col-lg-9 mb-4">
                        <div className={`${styles["description-card"]}`} data-aos="fade-up" data-aos-delay="200">
                            <MarkdownRender content={markdownContent} />
                        </div>
                    </div>
                </div>
            </SectionContent>
        </>
    );
};

export function _generateStaticParams(metaData) {
    return Object.keys(metaData)
        .filter((key) => metaData[key].hasSection == true)
        .map((key) => ({ id: key }));
}

export default ExperienceDescriptionID;

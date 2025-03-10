"use client";

import React from "react";

import { IsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid.jsx";
import { SectionContent } from "@components/common/SectionsContent.jsx";
import { GameGridItem } from "@src/components/pages/games/GameGridItem.jsx";
import { FilterItem } from "@src/components/pages/games/FilterItem.jsx";

import ProjectsList from "@assets/data/projects/lists/_list_projects.json";
import ProjectsFilterList from "@assets/data/projects/lists/_filter_projects.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
    return (
        <>
            <SectionContent
                title="Personal Projects"
                description={
                    <>
                        This section features all the personal and side projects I&apos;ve created, demonstrating my skills and creativity.
                        <br />
                        Click on any project marked with the <FontAwesomeIcon icon={faLink} /> or <FontAwesomeIcon icon={faArrowTurnUp} /> icon to be
                        redirected to a page with more details.
                    </>
                }
                sectionId="projects"
            >
                <IsotopeGrid mainFilters={ProjectsFilterList} items={ProjectsList} FilterComponent={FilterItem} GridComponent={GameGridItem} />
            </SectionContent>
        </>
    );
};

export default Projects;

"use client";

import React from "react";

import { LazyIsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid";
import { SectionContent } from "@components/common/SectionsContent";
import { GameGridItem } from "@src/components/pages/games/GameGridItem";
import { FilterItem } from "@src/components/pages/games/FilterItem";

import ProjectsList from "@assets/data/projects/lists/_list_projects.json";
import ProjectsFilterList from "@assets/data/projects/lists/_filter_projects.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

const FilterList = [
    ProjectsFilterList
]

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
                <LazyIsotopeGrid filterList={FilterList} items={ProjectsList} FilterComponent={FilterItem} GridComponent={GameGridItem} />
            </SectionContent>
        </>
    );
};

export default Projects;

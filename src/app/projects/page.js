"use client";

import React from "react";

import { IsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid.jsx";
import { SectionContent } from "@components/common/SectionsContent.jsx";
import { GameGridItem } from "@src/components/pages/games/GameGridItem.jsx";
import { FilterItem } from "@src/components/pages/games/FilterItem.jsx";

import ProjectsList from "@assets/data/projects/lists/_list_projects.json";
import ProjectsFilterList from "@assets/data/projects/lists/_filter_projects.json";

const Projects = () => {
    return (
        <>
            <SectionContent
                title="Personal Projects"
                description={
                    <>
                        &lt;TODO&gt;
                    </>
                }
                sectionId="projects"
            >
                <IsotopeGrid
                    mainFilters={ProjectsFilterList}
                    items={ProjectsList}
                    FilterComponent={FilterItem}
                    GridComponent={GameGridItem}
                />
            </SectionContent>
        </>
    );
};

export default Projects;

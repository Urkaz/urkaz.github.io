"use client";

import React from "react";

import { IsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid.jsx";
import { SectionContent } from "@components/common/SectionsContent.jsx";
import { GameGridItem } from "@src/components/pages/games/GameGridItem.jsx";
import { FilterItem } from "@src/components/pages/games/FilterItem.jsx";

import GamesList from "@assets/data/projects/_list_projects.json";
import GameFilterList from "@assets/data/projects/_filter_projects.json";

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
                    mainFilters={GameFilterList}
                    items={GamesList}
                    FilterComponent={FilterItem}
                    GridComponent={GameGridItem}
                />
            </SectionContent>
        </>
    );
};

export default Projects;

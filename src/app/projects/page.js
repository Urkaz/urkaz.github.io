"use client";

import React from "react";

import { LazyIsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid";
import { SectionContent } from "@components/common/SectionsContent";
import { GameGridItem } from "@src/components/pages/games/GameGridItem";
import { FilterItem } from "@src/components/pages/games/FilterItem";
import { filterAndPrefixGameList } from "@src/components/functions";

import FullList from "@assets/data/lists/_list_games.json";
import ProjectsFilterList from "@assets/data/projects/lists/_filter_projects.json";
import ProjectTagPrefixes from "@assets/data/projects/lists/_tag_prefixes_filter.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";

const FilterList = [ProjectsFilterList];

const Projects = () => {
    let ListFiltered = filterAndPrefixGameList(FullList, ProjectTagPrefixes);

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
                <LazyIsotopeGrid filterList={FilterList} items={ListFiltered} FilterComponent={FilterItem} GridComponent={GameGridItem} />
            </SectionContent>
        </>
    );
};

export default Projects;

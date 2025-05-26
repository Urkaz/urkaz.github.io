"use client";

import React from "react";

import { LazyIsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid";
import { SectionContent } from "@components/common/SectionsContent";
import { GameGridItem } from "@src/components/pages/games/GameGridItem";
import { FilterItem } from "@src/components/pages/games/FilterItem";

import GamesList from "@assets/data/games/lists/_list_games.json";
import GameFilterList from "@assets/data/games/lists/_filter_games.json";
import GameFilterPlatform from "@assets/data/games/lists/_filter_platforms.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Games = () => {
    return (
        <>
            <SectionContent
                title="Games"
                description={
                    <>
                        Here you&apos;ll find a list of all the games I&apos;ve been involved in, from professional work and personal projects (e.g., game jams)
                        to those created during my education.
                        <br />
                        Filter by my role in the creative process and by the platforms I&apos;ve worked on.
                        <br />
                        Click on any game marked with the <FontAwesomeIcon icon={faLink} /> icon to be redirected to a page with more details of the game, and my role in its development.
                    </>
                }
                sectionId="games"
            >
                <LazyIsotopeGrid
                    mainFilters={GameFilterList}
                    secondaryfilters={GameFilterPlatform}
                    items={GamesList}
                    FilterComponent={FilterItem}
                    GridComponent={GameGridItem}
                />
            </SectionContent>
        </>
    );
};

export default Games;

"use client";

import React from "react";

import { IsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid.jsx";
import { SectionContent } from "@components/common/SectionsContent.jsx";
import { GameGridItem } from "@src/components/pages/games/GameGridItem.jsx";
import { FilterItem } from "@src/components/pages/games/FilterItem.jsx";

import GamesList from "@assets/data/games/lists/_list_games.json";
import GameFilterList from "@assets/data/games/lists/_filter_games.json";
import GameFilterPlatform from "@assets/data/games/lists/_filter_platforms.json";

const Games = () => {
    return (
        <>
            <SectionContent
                title="Games"
                description={
                    <>
                        Below you will find a list of all the games in which I worked on thorugh my life, from professional jobs, to educational
                        projects, and game jams.
                        <br />
                        Clicking on a game will redirect you to a new page with more information.
                    </>
                }
                sectionId="games"
            >
                <IsotopeGrid
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

"use client";

import React from "react";

import { LazyIsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid";
import { SectionContent } from "@components/common/SectionsContent";
import { GameGridItem } from "@src/components/pages/games/GameGridItem";
import { FilterItem } from "@src/components/pages/games/FilterItem";
import { filterAndPrefixGameList } from "@src/components/functions";

import FullList from "@assets/data/lists/_list_games.json";
import GameFilterList from "@assets/data/games/lists/_filter_games.json";
import GameFilterPlatform from "@assets/data/games/lists/_filter_platforms.json";
import GameFilterClickable from "@assets/data/games/lists/_filter_clickable.json";
import GameTagPrefixes from "@assets/data/games/lists/_tag_prefixes_filter.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const FilterList = [GameFilterList, GameFilterPlatform, GameFilterClickable];

const Games = () => {
    let ListFiltered = filterAndPrefixGameList(FullList, GameTagPrefixes);

    return (
        <>
            <SectionContent
                title="Games"
                description={
                    <>
                        Here you&apos;ll find a list of all the games I&apos;ve worked on, professional, educational, or side projects (like game
                        jams).
                        <br />
                        Click on any game with the <FontAwesomeIcon icon={faLink} /> icon to open a page with a devlog of my contributions to that
                        game.
                    </>
                }
                sectionId="games"
            >
                <LazyIsotopeGrid filterList={FilterList} items={ListFiltered} FilterComponent={FilterItem} GridComponent={GameGridItem} />
            </SectionContent>
        </>
    );
};

export default Games;

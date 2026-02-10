import React from "react";

import { LazyIsotopeGrid } from "@src/components/thirdparty/isotope/IsotopeGrid";
import { GameGridItem } from "@src/components/pages/games/GameGridItem";
import { FilterItem } from "@src/components/pages/games/FilterItem";

import { prefixGameList, prefilterGameList } from "@src/components/functions";
import { loadJSON } from "@src/lib/loadJSON";

import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownIsotope = ({ children }) => {

    let config = {};
    if (typeof children === "string") {
        try { config = JSON.parse(children); } catch (e) { }
    }

    const itemsContent = loadJSON(config.items);

    let ListFiltered = {};
    if (config.prefilter != undefined) {
        const prefilterContent = loadJSON(config.prefilter);
        ListFiltered = prefilterGameList(itemsContent, prefilterContent);
    }
    if (config.prefixes != undefined) {
        const prefixesContent = loadJSON(config.prefixes);
        ListFiltered = prefixGameList(ListFiltered, prefixesContent);
    }

    const FilterList = [];

    return (
        <span className="row">
            <span className={`col-lg-8 ${styles["centered-isotope"]}`}>
                <LazyIsotopeGrid filterList={FilterList} items={ListFiltered} FilterComponent={FilterItem} GridComponent={GameGridItem} />
            </span>
        </span>
    );
}

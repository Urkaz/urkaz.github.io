"use client";

import { useState } from "react";

import styles from "@styles/components/Isotope.module.scss";
import stylesGames from "@styles/pages/games.module.scss";

export const IsotopeFilter = ({ filter, FilterItem, onClick }) => {
    const [currentFilter, setFilter] = useState("");
    const [filterIDs] = useState(() => filter?.map(() => crypto.randomUUID()));

    return (
        <>
            {filter ? (
                <ul className={styles["isotope-filters"]} data-aos="fade-up" data-aos-delay="100">
                    {filter.map((f, index) => (
                        <FilterItem
                            key={filterIDs[index]}
                            onClick={() => {
                                onClick(f.selector);
                                setFilter(f.selector);
                            }}
                            className={`${stylesGames["miniplatforms"]} ${currentFilter === f.selector ? styles["filter-active"] : styles["filter-inactive"]}`}
                            name={f.name}
                            img={f.img}
                        />
                    ))}
                </ul>
            ) : null}
        </>
    );
};

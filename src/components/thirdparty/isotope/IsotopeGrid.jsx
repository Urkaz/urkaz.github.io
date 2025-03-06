"use client";

import { useEffect, useRef, useState } from "react";

import { IsotopeFilter } from "@components/thirdparty/isotope/IsotopeFilter";

import { concatValues } from "@src/components/functions";

export const IsotopeGrid = ({ mainFilters, secondaryfilters, items, GridComponent, FilterComponent }) => {
    const gridRef = useRef(null);
    const [isotope, setIsotope] = useState(null);
    const [mainfilter, setMainFilter] = useState("");
    const [secondaryfilter, setSecondaryFilter] = useState("");

    useEffect(() => {
        if (gridRef.current) {
            (async () => {
                // Dynamically load Isotope
                const Isotope = (await import("isotope-layout")).default;

                const iso = new Isotope(gridRef.current, {
                    itemSelector: ".isotope-grid-item",
                    layoutMode: "fitRows",
                });
                setIsotope(iso);
            })();
        }
    }, []);

    useEffect(() => {
        if (isotope) {
            var _mainFilter = mainFilters ? mainfilter : "";
            var _secondaryfilter = secondaryfilters ? secondaryfilter : "";

            var finalFilter = concatValues([_mainFilter, _secondaryfilter]);

            isotope.arrange({ filter: finalFilter });
        }
    }, [mainfilter, secondaryfilter, isotope]);

    return (
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <div>
                {/* Botones para filtrar */}
                {mainFilters ? (
                    <IsotopeFilter filter={mainFilters} FilterItem={FilterComponent} onClick={setMainFilter} />
                ) : null}
                {secondaryfilters ? (
                    <IsotopeFilter filter={secondaryfilters} FilterItem={FilterComponent} onClick={setSecondaryFilter} />
                ) : null}

                {/* Grid de elementos con un componente dinámico */}
                <div ref={gridRef} className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                    {
                        Object.entries(items)
                            .map(([key, game]) => <GridComponent {...game} key={key} keyName={key} />)
                    }
                </div>
            </div>
        </div>
    );
};

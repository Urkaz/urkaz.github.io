"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { IsotopeFilter } from "@components/thirdparty/isotope/IsotopeFilter";
import { trackWindowScroll } from 'react-lazy-load-image-component';

import { concatValues } from "@src/components/functions";

export const IsotopeGrid = ({ filterList, items, GridComponent, FilterComponent }) => {
    const [searchQuery, setSearchQuery] = useState({});
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    let filterListState = new Array(filterList.length);
    for (let index = 0; index < filterList.length; index++) {
        let param = searchParams.get('f' + index);
        filterListState[index] = param ? `.category-${param}` : "";
    }

    const gridRef = useRef(null);
    const isotope = useRef(null);
    const [filters, setFilters] = useState(filterListState);

    useEffect(() => {
        let isoInstance;

        const initIsotope = async () => {
            const Isotope = (await import("isotope-layout")).default;
            if (gridRef.current) {
                isoInstance = new Isotope(gridRef.current, {
                    itemSelector: ".isotope-grid-item",
                    layoutMode: "fitRows",
                });
                isotope.current = isoInstance;

                var finalFilter = concatValues(filters);
                isotope.current.arrange({ filter: finalFilter });
            }
        };

        initIsotope();

        return () => {
            if (isoInstance) {
                isoInstance.destroy();
                isotope.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (isotope.current) {
            var finalFilter = concatValues(filters);
            isotope.current.arrange({ filter: finalFilter });
        }
    }, [filters]);

    const setQuery = (queryName, queryValue) => {
        const updatedQuery = { ...searchQuery };
        updatedQuery[queryName] = queryValue.replace(".category-", "");

        setSearchQuery(updatedQuery);
        updateSearchQuery(updatedQuery);
    }

    const onClickFilter = (event, index) => {
        let filterListState = new Array(filterList.length);
        for (let index = 0; index < filterList.length; index++) {
            filterListState[index] = filters[index];
        }
        filterListState[index] = event;

        setFilters(filterListState);
        setQuery(`f${index}`, event);
    };

    const updateSearchQuery = (updatedQuery) => {
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });

        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(updatedPath, { scroll: false });
    };

    return (
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <div>
                {/* Filters */}
                {filterList.map((filter, index) => (
                    filter ? <IsotopeFilter key={index} filter={filter} activeFilter={filters[index]} FilterItem={FilterComponent} onClick={(e) => onClickFilter(e, index)} /> : null
                ))}

                {/* Grid with dynamic component "GridComponent"*/}
                <div ref={gridRef} className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                    {Object.entries(items).map(([key, item]) => (
                        <GridComponent {...item} key={key} keyName={key} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const LazyIsotopeGrid = trackWindowScroll(IsotopeGrid);

export { LazyIsotopeGrid };
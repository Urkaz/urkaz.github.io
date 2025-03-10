"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

import Sections from "@assets/data/sections.json";
import GamesList from "@assets/data/games/lists/_list_games.json";
import ProjectsList from "@assets/data/projects/lists/_list_projects.json";

const breadcrumbsData = {
    "/projects": ProjectsList,
    "/games": GamesList,
};

const getBreadcrumbs = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);
    let breadcrumbs = [];
    let currentPath = "";

    parts.forEach((part, index) => {
        currentPath += `/${part}`;

        if (index === 0 && Sections[part]) {
            breadcrumbs.push({
                name: Sections[part].sectionName,
                path: Sections[part].path,
                current: index === parts.length - 1,
            });
        } else {
            const parentPath = `/${parts[0]}`;
            if (breadcrumbsData[parentPath] && breadcrumbsData[parentPath][part]) {
                breadcrumbs.push({
                    name: breadcrumbsData[parentPath][part].name,
                    path: currentPath,
                    current: index === parts.length - 1,
                });
            }
        }
    });

    return breadcrumbs;
};

export function Breadcrumb() {
    const pathname = usePathname();
    const breadcrumbs = getBreadcrumbs(pathname);

    return (
        <>
            <nav className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <Link href="/">
                                <FontAwesomeIcon icon={faHouseChimney} /> Home
                            </Link>
                        </li>
                        {breadcrumbs.map((crumb, index) =>
                            crumb.current ? (
                                <li key={index} className="current"> {crumb.name}</li>
                            ) : (
                                <li key={index} className="current"><Link href={crumb.path}> {crumb.name}</Link></li>
                            )
                        )}
                    </ol>
                </div>
            </nav>
        </>
    );
}

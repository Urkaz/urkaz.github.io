"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

import Sections from "@assets/data/sections.json";
import FullProjectsGamesList from "@assets/data/lists/_list_projects_games.json";
import ExperienceList from "@assets/data/experience/lists/_list_professional.json";
import CatnessEngineList from "@assets/data/experience/lists/catnessgamestudios/_catness_list.json";

import styles from "@src/styles/components/Breadcrumb.module.scss"

const breadcrumbsData = {
    "/projects": FullProjectsGamesList,
    "/games": FullProjectsGamesList,
    "/experience": ExperienceList,
    "/catnessgamestudios": CatnessEngineList,
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
            const parentPath = `/${parts[index - 1]}`;
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
            <nav className={styles["breadcrumbs"]}>
                <div className="container">
                    <ol>
                        <li>
                            <Link href="/" className={styles["breadcrumb-link"]}>
                                <FontAwesomeIcon icon={faHouseChimney} /> Home
                            </Link>
                        </li>
                        {breadcrumbs.map((crumb, index) =>
                            crumb.current ? (
                                <li key={index} className="current"> {crumb.name}</li>
                            ) : (
                                <li key={index}><Link href={crumb.path} className={styles["breadcrumb-link"]}> {crumb.name}</Link></li>
                            )
                        )}
                    </ol>
                </div>
            </nav>
        </>
    );
}

"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/components/Navbar.module.scss";

const Sections = [
    { path: "/", sectionName: "Home" },
    { path: "/experience", sectionName: "Experience" },
    { path: "/experience/:workName", hidden: true },
    { path: "/experience/:workName/:subProject", hidden: true },
    { path: "/education", sectionName: "Education" },
    { path: "/education/:workName", hidden: true },
    { path: "/projects", sectionName: "Personal Projects" },
    { path: "/projects/:gameName", hidden: true },
    { path: "/games", sectionName: "Games" },
    { path: "/games/:gameName", hidden: true },
    { path: "/contact", sectionName: "Contact" },
];

function isActive(currentPath, sectionPath) {
    if (sectionPath === "/") return currentPath === "/";
    return currentPath.startsWith(sectionPath);
}

export function NavItem({ to, children, pathname, onClick }) {
    return (
        <>
            <li>
                <Link href={to} className={isActive(pathname, to) ? styles["active"] : ""} onClick={onClick}>
                    {children}
                </Link>
            </li>
        </>
    );
}

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => {
            const newState = !prev;
            if (newState) {
                document.body.classList.add(styles["mobile-nav-active"]);
            } else {
                document.body.classList.remove(styles["mobile-nav-active"]);
            }
            return newState;
        });
    };

    return (
        <>
            <nav id={styles["navmenu"]} className={styles["navmenu"]}>
                <ul>
                    {Sections
                        .filter((section) => section.path && !section.hidden)
                        .map(({ path, sectionName }, index) => (
                            <NavItem key={index} to={path} pathname={pathname} onClick={toggleMenu}>
                                {sectionName}
                            </NavItem>
                        ))}
                    <li>
                        <a href="/img/games/logos/roninhoodsisters.png" download>
                            Download CV
                        </a>
                    </li>
                </ul>
                <i className={`${styles["mobile-nav-toggle"]} d-xl-none`}
                    onClick={toggleMenu}>{menuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}</i>
            </nav>
        </>
    );
}

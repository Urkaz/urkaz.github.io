"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/components/Navbar.module.scss";

import Sections from "@assets/data/sections.json";

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
                    {Object.entries(Sections)
                        .map(([key, section]) => (
                            <NavItem key={key} to={section.path} pathname={pathname} onClick={toggleMenu}>
                                {section.sectionName}
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

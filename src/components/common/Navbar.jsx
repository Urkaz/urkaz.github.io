"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
        <li>
            <Link href={to} className={isActive(pathname, to) ? styles["active"] : ""} onClick={onClick}>
                {children}
            </Link>
        </li>
    );
}

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Close on route change
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    // Close when viewport reaches desktop breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const navLinks = (onLinkClick) => (
        <>
            {Object.entries(Sections).map(([key, section]) => (
                !section.hidden ?
                <NavItem key={key} to={section.path} pathname={pathname} onClick={onLinkClick}>
                    {section.sectionName}
                </NavItem>
                : null
            ))}
            <li>
                <a href="/CV_FranSanchezRodrigo.pdf" download onClick={onLinkClick}>
                    Download CV
                </a>
            </li>
        </>
    );

    return (
        <>
            {/* Desktop nav */}
            <nav id={styles["navmenu"]} className={styles["navmenu"]}>
                <ul>
                    {navLinks(null)}
                </ul>
                <button
                    className={`${styles["mobile-nav-toggle"]} d-xl-none`}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                </button>
            </nav>

            {/* Mobile dropdown portaled to body to bypass header's backdrop-filter containing block */}
            {mounted && menuOpen && createPortal(
                <>
                    <div className={styles["mobile-nav-backdrop"]} onClick={closeMenu} />
                    <nav className={styles["mobile-nav-overlay"]}>
                        <ul>
                            {navLinks(closeMenu)}
                        </ul>
                    </nav>
                </>,
                document.body
            )}
        </>
    );
}

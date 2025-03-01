import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function NavMenu({ children }) {
    return (
        <>
            <nav id={styles["navmenu"]} className={styles["navmenu"]}>
                <ul>{children}</ul>
            </nav>
        </>
    );
}

function isActive(currentPath, sectionPath) {
    if (sectionPath === "/") return currentPath === "/";
    return currentPath.startsWith(sectionPath);
}

export function NavItem({ to, children, pathname }) {
    return (
        <>
            <li>
                <Link href={to} className={isActive(pathname, to) ? styles["active"] : ""}>
                    {children}
                </Link>
            </li>
        </>
    );
}

export function Navbar() {
    const pathname = usePathname();

    const renderNavItems = (sections) => {
        return sections
            .filter((section) => section.path && !section.hidden)
            .map(({ path, sectionName }, index) => (
                <NavItem key={index} to={path} pathname={pathname}>
                    {sectionName}
                </NavItem>
            ));
    };

    return (
        <>
            <NavMenu>
                {renderNavItems(Sections)}
                <li>
                    <a href="/img/games/logos/roninhoodsisters.png" download>
                        Download CV
                    </a>
                </li>
            </NavMenu>
        </>
    );
}

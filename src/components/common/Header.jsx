"use client";

import { React, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@src/components/common/Navbar";

import Link from "next/link";

import styles from "@styles/components/Header.module.scss";

export function Header({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        const toggleScrolled = (event) => {
            const selectBody = document.querySelector("body");
            const selectHeader = document.querySelector("#" + styles["header"]);
            if (
                !selectHeader.classList.contains("scroll-up-sticky") &&
                !selectHeader.classList.contains("sticky-top") &&
                !selectHeader.classList.contains("fixed-top")
            )
                return;
            window.scrollY > 50 ? selectBody.classList.add(styles["scrolled"]) : selectBody.classList.remove(styles["scrolled"]);
        };
        document.addEventListener("scroll", toggleScrolled);
        window.addEventListener("load", toggleScrolled);

        return () => {
            document.removeEventListener("scroll", toggleScrolled);
            window.removeEventListener("load", toggleScrolled);
        };
    }, []);

    return (
        <>
            <header id={styles["header"]} className={`${styles["header"]} d-flex align-items-center fixed-top`}>
                <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <Link href="/" className={`${styles["logo"]} d-flex align-items-center`}>
                        {pathname !== "/" && <h1 className="sitename" data-aos="fade">{children}</h1>}
                    </Link>
                    <Navbar />
                </div>
            </header>
        </>
    );
}

"use client";

import { React, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/components/ScrollToTop.module.scss";

export function ScrollToTop() {
    const componentRef = useRef(null);

    useEffect(() => {
        var component = componentRef;

        const onClick = (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        const onToggleScrollTop = (event) => {
            if (component.current) {
                window.scrollY > 100 ? component.current.classList.add(styles["active"]) : component.current.classList.remove(styles["active"]);
            }
        };

        window.addEventListener("load", onToggleScrollTop);
        document.addEventListener("scroll", onToggleScrollTop);

        if (component.current) component.current.addEventListener("click", onClick);

        return () => {
            if (component.current) component.current.removeEventListener("click", onClick);
            window.removeEventListener("load", onToggleScrollTop);
            document.removeEventListener("scroll", onToggleScrollTop);
        };
    }, []);

    return (
        <>
            {/*Scroll Top*/}
            <a href="#" id="scroll-top" className={`${styles["scroll-top"]} d-flex align-items-center justify-content-center`} ref={componentRef}>
                <FontAwesomeIcon icon={faArrowUp} />
            </a>
        </>
    );
}

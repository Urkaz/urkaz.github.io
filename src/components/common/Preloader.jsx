"use client";

import { React, useEffect, useState } from "react";
import Router from "next/router";

import styles from "@styles/components/Preloader.module.scss";

export function Preloader() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Router.events.on("routeChangeStart", () => setLoading(true));
        Router.events.on("routeChangeComplete", () => setLoading(false));
        Router.events.on("routeChangeError", () => setLoading(false));
        return () => {
            Router.events.off("routeChangeStart", () => setLoading(true));
            Router.events.off("routeChangeComplete", () => setLoading(false));
            Router.events.off("routeChangeError", () => setLoading(false));
        };
    }, []);

    return <>{loading ? <div id={styles["preloader"]}></div> : null}</>;
}

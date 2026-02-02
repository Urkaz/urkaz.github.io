"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSClient() {
    useEffect(() => {
        AOS.init({
            offset: 40,
            once: true,
            easing: "ease-in-out",
            mirror: false,
        });
        AOS.refresh();
    }, []);

    return null;
}

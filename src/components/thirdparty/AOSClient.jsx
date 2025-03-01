"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSClient() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return null;
}

"use client";

import Script from "next/script";

export function DottedBackground() {
    return (
        <>
            <canvas id="background"></canvas>
            <Script src="/js/background.js" />
        </>
    );
}

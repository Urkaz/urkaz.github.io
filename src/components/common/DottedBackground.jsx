"use client";

import Script from "next/script";

export function DottedBackground() {
    return (
        <>
            <canvas id="background" height="100%" width="100%"></canvas>
            <Script src="/js/background.js" />
        </>
    );
}

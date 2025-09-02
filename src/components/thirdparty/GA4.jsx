"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import ReactGA from "react-ga4";

export const GA_TRACKING_ID = "G-232NTM50DL";

export function GoogleAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        ReactGA.initialize(GA_TRACKING_ID);
    }, []);

    useEffect(() => {
        if (pathname) {
            ReactGA.send({ hitType: "pageview", page: pathname });
        }
    }, [pathname]);

    return null;
}

export function GoogleAnalyticsTAGScript() {
    return <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}');
            `}
        </Script></>
}
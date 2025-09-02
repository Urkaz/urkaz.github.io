"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import ReactGA from "react-ga4";

export const GA_TRACKING_ID = "G-232NTM50DL";

export function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        ReactGA.initialize(GA_TRACKING_ID);
    }, []);

    useEffect(() => {
        if (!pathname) return;

        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
        console.log("[GA4] Sending pageview:", url);

        // ReactGA
        ReactGA.send({ hitType: "pageview", page: url });

        // native gtag
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "page_view", { page_path: url });
        }
    }, [pathname, searchParams]);

    return <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });
            `}
        </Script></>
}
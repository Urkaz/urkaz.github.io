import { Suspense } from "react";

import { Staatliches, Titillium_Web } from "next/font/google";

import { Header } from "@components/common/Header";
import { Footer } from "@components/common/Footer";
import { ScrollToTop } from "@components/common/ScrollToTop";
import { DottedBackground } from "@components/common/DottedBackground";
import { BootstrapClient } from "@components/thirdparty/BootstrapClient";
import { AOSClient } from "@components/thirdparty/AOSClient";
import ReactGA from "react-ga4";

ReactGA.initialize("G-232NTM50DL");

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";

import { library } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from adding its CSS since we did it manually above:
library.autoAddCss = false; /* eslint-disable import/first */
// Add global icons
import { faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faItchIo, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
library.add(faGlobe, faEnvelope, faItchIo, faGithub, faLinkedin);

/* Style */
import "@styles/global.scss";
import { Preloader } from "@src/components/common/Preloader";

/* Fonts */
const staatliches = Staatliches({
    subsets: ["latin"],
    weight: "400",
});
const titilliumWeb = Titillium_Web({
    subsets: ["latin"],
    weight: "400",
});

/* Metadata & App */
export const metadata = {
    title: "Fran Sánchez - Porfolio",
};
export default function RootLayout({ children }) {
    const siteName = "Fran Sánchez Rodrigo";
    return (
        <html lang="en">
            <body>
                <Suspense fallback={<Preloader />}>
                    <Header>{siteName}</Header>
                    <main className="main">
                        <DottedBackground />
                        {children}
                    </main>
                    <ScrollToTop />
                    <Footer name={siteName}></Footer>
                    <BootstrapClient />
                    <AOSClient />
                </Suspense>
            </body>
        </html>
    );
}

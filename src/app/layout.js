import { Staatliches, Titillium_Web } from "next/font/google";

import { Header } from "@components/common/Header";
import { Footer } from "@components/common/Footer";
import { ScrollToTop } from "@components/common/ScrollToTop";
import { Preloader } from "@components/common/Preloader";
import { DottedBackground } from "@components/common/DottedBackground";
import { BootstrapClient } from "@components/thirdparty/BootstrapClient";
import { AOSClient } from "@components/thirdparty/AOSClient";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

/* Style */
import "@styles/global.scss";

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
                <Header>{siteName}</Header>
                <main className="main">
                    <DottedBackground />
                    {children}
                </main>
                <ScrollToTop />
                <Preloader />
                <Footer>{siteName}</Footer>
                <BootstrapClient />
                <AOSClient />
            </body>
        </html>
    );
}

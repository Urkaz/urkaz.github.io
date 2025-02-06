import { Outlet } from "react-router-dom";

import "./scss/MainLayout.scss";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import Preloader from "../../components/Preloader.jsx";

import "./js/background.js"

export default function Layout() {
    const siteName = "Fran Sánchez Rodrigo";

    return (
        <>
            <Header>{siteName}</Header>
            <main className="main">
                <canvas id="background" width="100%" height="100%"></canvas>
                <Outlet />
            </main>
            <ScrollToTop />
            <Preloader />
            <Footer>{siteName}</Footer>
        </>
    );
}

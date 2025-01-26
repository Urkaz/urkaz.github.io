import { Outlet } from "react-router-dom";

import "./css/Layout.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Preloader from "../components/Preloader";

export default function Layout() {
    const siteName = "Fran Sánchez Rodrigo";

    return (
        <>
            <Header>{siteName}</Header>
            <main className="main">
                <Outlet />
            </main>
            <ScrollToTop/>
            <Preloader/>
            <Footer>{siteName}</Footer>
        </>
      );
    }
    
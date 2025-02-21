import { React, useEffect } from "react";
import Navbar from "./Navbar";

import { NavLink, useLocation } from "react-router-dom";

export default function Header({ children }) {
  //const { pathname } = useLocation();

  useEffect(() => {
    const toggleScrolled = (event) => {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 50 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    return () => {
      document.removeEventListener('scroll', toggleScrolled);
      window.removeEventListener('load', toggleScrolled);
    }
  }, []);


  return (
    <>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <NavLink to="/" className="logo d-flex align-items-center">
            {/*pathname !== "/" &&<h1 className="sitename" data-aos="fade">{children}</h1>*/}
            <h1 className="sitename" data-aos="fade">{children}</h1>
          </NavLink>
          <Navbar />
        </div>
      </header>
    </>
  );
}
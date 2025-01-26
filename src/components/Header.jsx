import React from "react";
import Navbar from "./Navbar";

import { NavLink } from "react-router-dom";

export default function Header({ children }) {
    return (
      <>
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <NavLink to="/" className="logo d-flex align-items-center">
                <h1 className="sitename">{children}</h1>
                </NavLink>
                <Navbar/>
            </div>
        </header>
      </>
  );
}
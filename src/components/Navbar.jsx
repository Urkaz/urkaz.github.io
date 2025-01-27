import React from "react";
import { NavMenu, NavItem } from "./NavbarElements";

export default function Navbar() {
    return (
      <>
        <NavMenu>
          <NavItem to="/" activeStyle>Home</NavItem>
          <NavItem to="/experience" activeStyle>Experience</NavItem>
          <NavItem to="/projects" activeStyle>Personal Projects</NavItem>
          <NavItem to="/games" activeStyle>Games</NavItem>
          <NavItem to="/contact" activeStyle>Contact</NavItem>
        </NavMenu>
      </>
  );
}
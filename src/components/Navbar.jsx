import React from "react";
import { NavMenu, NavItem } from "./NavbarElements";

export default function Navbar() {
    return (
      <>
        <NavMenu>
          <NavItem to="/" activeStyle>Home</NavItem>
          <NavItem to="/about" activeStyle>A very long name long long long name</NavItem>
        </NavMenu>
      </>
  );
}
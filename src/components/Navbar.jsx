import React from "react";
import { NavMenu, NavItem } from "./NavbarElements";

import Sections from "../Sections.jsx"

export default function Navbar() {

  const renderNavItems = (sections) => {
    return sections.flatMap(({ children }) =>
      children.filter(section => section.path)
        .map(({ path, sectionName }, index) => (
          <NavItem key={index} to={path} activeStyle>{sectionName}</NavItem>
        ))
    );
  };


  return (
    <>
      <NavMenu>
        <NavItem to="/" activeStyle>Home</NavItem>
        {renderNavItems(Sections)}
      </NavMenu>
    </>
  );
}
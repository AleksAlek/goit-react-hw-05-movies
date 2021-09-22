import React from "react";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="mainNavigation">
      <NavLink to="/">Home</NavLink>

      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
};

export default MainNavigation;

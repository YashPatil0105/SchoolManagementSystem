import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        SchoolMaster360
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/student">Student</NavLink>
        </li>
        <li>
          <NavLink to="/attendance">Attendence</NavLink>
        </li>
        <li>
          <NavLink to="/parent">Parent</NavLink>
        </li>
        <li>
          <NavLink to="/teacher">Teacher</NavLink>
        </li>
        <li>
          <NavLink to="/staff">Staff</NavLink>
        </li>
      </ul>
    </nav>
  );
};

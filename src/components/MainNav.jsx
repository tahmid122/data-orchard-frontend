import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="mainNav">
      <Link to={"/"}>
        <img src="/dataOrchard.png" alt="dataOrchard.png" />
      </Link>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;

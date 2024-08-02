import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
const NavBar = ({ userName }) => {
  const { setIsAuthenticated } = useAuth();
  return (
    <nav className="mainNav">
      <img src="/dataOrchard.png" alt="dataOrchard.png" />
      <ul>
        <li>
          <Link to={`/users/${userName}`}>Home</Link>
        </li>
        <li>
          <Link to={`/users/task/${userName}`}>Task</Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setIsAuthenticated(false);
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";
import ChangeThemeButton from "../../theme/ChangeThemeButton";

export default function NavBarGuest() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-color">
        <div className="container-fluid">
          <div className="navbar-brand text-color">React Nest Auth</div>
          <button
            className="navbar-toggler text-color"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-color mx-3"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-color mx-3"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-color mx-3"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <ChangeThemeButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

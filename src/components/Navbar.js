import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
        <Link to="/" className="navbar-brand">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item pr-3">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } pr-3`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item pr-3">
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                } pr-3`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/nomatch"
                className={`nav-link ${
                  location.pathname === "/nomatch" ? "active" : ""
                } pr-3`}
              >
                No match
              </Link>
            </li>
          </ul>{" "}
        </div>
        {!localStorage.getItem("authtoken") ? (
          <form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">
              Signup
            </Link>
          </form>
        ) : (
          <button onClick={ handleLogout } className="btn btn-primary">
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

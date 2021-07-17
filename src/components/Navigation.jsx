import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            Harmony NFT Map
          </Link>
          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/">
                  App
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/Main" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/Main">
                  Items Store
                </Link>
              </li>

              <li
                className={`nav-item  ${props.location.pathname === "/MintItems" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/MintItems">
                  Mint NFT
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/about" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                className={`nav-item  ${props.location.pathname === "/Announcement" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/Announcement">
                Annancements
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark  bg-primary flex-md-nowrap p-0 shadow text-monospace">
        
        {!this.props.account ? (
          <div
            id="loader"
            className="spinner-border text-light"
            role="status"
          ></div>
        ) : (
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <a
              className="text-white"
              href={"https://explorer.pops.one/#/address/" + this.props.account}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.account}
            </a>
            &nbsp;
          </li>
        )}
      </nav>
    );
  }
}

export default Navbar;

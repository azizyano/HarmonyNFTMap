import React, { Component } from "react";
import logo from '../logos/MapsLoga.png'

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
          <div className="container-fluid">
             <img src={logo} alt="" width="30" height="30" className="d-inline-block align-text-top"></img>
          Harmony Testnet
           <a
              className="text-white nav-link active"
              href={"https://explorer.pops.one/#/address/" + this.props.account}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.account}
            </a>
            
          </div>
 
        )}
      </nav>
    );
  }
}

export default Navbar;

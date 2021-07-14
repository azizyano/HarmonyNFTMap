import React, { Component } from "react";
import "./App.css";
import Maplogo from "../logos/MapsLoga.png";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-10 col-m-10">
        <div className="col-sm">
          <main
            role="main"
            className="col-lg-12 text-monospace text-center text-white"
          >
            <div className="content mr-auto ml-auto">
              <div id="content" className="mt-3">
                <div className="card mb-4 bg-dark border-danger">
                  <div>
                    <img
                      src={Maplogo}
                      width="100"
                      height="100"
                      className="d-inline-block float-right"
                      alt=""
                    />
                    {!this.props.balance ? (
                      <div
                        id="loader"
                        className="spinner-border float-right"
                        role="status"
                      ></div>
                    ) : (
                      <div className="float-right" style={{ width: "220px" }}>
                        <div className="float-left" style={{ height: "17px" }}>
                          <b>total NFT Items&nbsp;</b>
                        </div>
                        <div className="float-right" style={{ height: "17px" }}>
                          {Number(this.props.totalItems)} <b>NFT&nbsp;</b>
                        </div>
                        <br></br>
                        <div
                          className="float-right"
                          style={{ height: "17px" }}
                        ></div>
                        <br></br>
                        <div className="float-left">
                          <b>Balance&nbsp;</b>
                        </div>
                        <div className="float-right">
                          {Number(
                            this.props.web3.utils.fromWei(
                              this.props.balance.toString()
                            )
                          ).toFixed(5)}{" "}
                          <b>ONE&nbsp;</b>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          
        <div
          className="container-fluid mt-5 col-m-4"
          style={{ maxWidth: "1000px" }}
        >
          <h5 className="card-title">list of all NFT minted:</h5>
          <div className="col-sm">
            <main
              role="main"
              className="col-lg-12 text-monospace text-center text-white"
            >
              <div className="content mr-auto ml-auto">
                <div id="content" className="mt-3">
                  <div className="card mb-4 bg-dark border-danger">
                    <div>
                      <div className="row text-center">
                        {this.props.tokenURL.map((tokenURL, key) => {
                          return (
                            <div key={key} className="col-md-3 mb-3">
                              <div
                                className="token"
                                style={{ backgroundColor: "blue" }}
                              ></div>
                              <div className="card-body card bg-info mb-3">
                                <h5 className="card-title">{this.props.nftjson[key].Name }</h5>
                                <p className="card-text">
                                creator: {this.props.nftjson[key].account }
                                </p>
                                <p className="card-text">
                                total number of NFT: {this.props.nftjson[key].limit }
                                </p>
                                <img
                                  src={tokenURL}
                                  className="rounded img-fluid"
                                  alt="NFT"
                                  height="150px"
                                  width="150px"
                                ></img>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                     


                    </div>

                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      
          </main>
        </div>
      </div>
    );
  }
}

export default Main;

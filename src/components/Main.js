import React, { Component } from "react";
import "./App.css";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-10 col-m-10">
        <div className="col-sm">
          <main
            role="main"
            className="container-fluid text-monospace text-center"
          >
        <div
          className="container-fluid "
        >
          <h5 className="card-title">list of all NFT minted:</h5>
          <div className="container-fluid mt-10 col-m-10 ">
            
              <div className="content mr-auto ml-auto">
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
                                <p className="card-text">
                                  Pricec:{this.props.nftjson[key].price} ONE 
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
      
          </main>
        </div>
      </div>
    );
  }
}

export default Main;

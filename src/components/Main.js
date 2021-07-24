import React, { Component } from "react";
import "./App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 0,
      tokenid: "0",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div className="container-fluid mt-10 col-m-10">
        <div className="col-sm">
          <main role="main" className="container-fluid text-monospace ">
            <h5 className="card-title text-center">list of all NFT minted:</h5>

            <div className="row ">
              {this.props.tokenURL.map((tokenURL, key) => {
                return (
                  <div key={key} className="card">
                    <div className="card-body card bg-info mb-3 cover-item container-fluid ">
                      <h5 className="card-title">
                        {this.props.nftjson[key].Name}
                      </h5>
                      <p className="card-text">
                        creator: {this.props.nftjson[key].account}
                      </p>
                      <p className="card-text">
                        NFT Owner : {this.props.Ownerof[key]}
                      </p>
                      <p className="card-text">
                        total number of NFT: {this.props.nftjson[key].limit}
                      </p>
                      <p className="card-text">
                        localisation: {this.props.nftjson[key].coords}
                      </p>
                      {this.props.nftPrice[key] === "0" ? (
                        <div className="p-3 mb-2 bg-danger">
                          <p>
                            The price not set yet <br />
                            If you are the owner, Plz set the price in <br />
                            NFT Setting
                          </p>
                        </div>
                      ) : (
                        <p className="card-text">
                          Pricec:{this.props.nftPrice[key] / 10 ** 18} ONE
                        </p>
                      )}

                      <img
                        src={tokenURL}
                        style={{ maxWidth: 300 }}
                        className="rounded card-img-top"
                        alt="NFT"
                      ></img>
                    </div>
                    {this.props.nftBuyer[key] ===
                    "0x0000000000000000000000000000000000000000" ? (
                      <div className="text-center">
                        <p>There is no buyers for this NFT</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        {this.props.nftBuyer[key] ===
                        this.props.Ownerof[key] ? (
                          <p>sold!</p>
                        ) : (
                          <p>
                            this address {this.props.nftBuyer[key]} <br />
                            want to buy your NFT{" "}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
        <br />
        <hr />
        <div className="col-sm">
          <h5 className="card-title text-center">
            Approve Buyer to buy your NFT:
          </h5>
          <div className="card-body card mb-3 cover-item container-fluid ">
            <div className="p-3 mb-2 bg-danger text-center">
              <p>Only the owner of NFT can approve the buyer</p>
            </div>
            <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;">
              <form
                className="form-group row"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.props.approve(
                    this.props.nftBuyer[this.state.itemId],
                    this.state.itemId
                  );
                }}
              >
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    ItemId:
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="itemId"
                      placeholder="itemId"
                      className="form-control"
                      value={this.state.itemId}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Buyer:
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="price"
                      placeholder="address"
                      className="form-control"
                      value={this.props.nftBuyer[this.state.itemId]}
                      readOnly="readOnly"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Approve
                </button>
              </form>
            </div>
          </div>
          <div className="row ">
            {this.props.approvedAddress.map((approvedAddress, key) => {
              return (
                <div key={key} className="card">
                  <div className="card-body card bg-info mb-3 cover-item container-fluid ">
                    the NFT id : {key} was approved to
                    <h5 className="card-title">
                      {this.props.approvedAddress[key]}
                    </h5>
                    {this.props.account === this.props.approvedAddress[key] ? (
                      <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;">
                        <form
                          className="form-group row"
                          onSubmit={(event) => {
                            event.preventDefault();
                            this.props.BuyNFT(key);
                          }}
                        >
                          <div className="form-group row">
                            <label htmlFor="name" className=" col-form-label">
                              ItemId:
                            </label>
                            <div className="col-sm-10">
                              <input
                                name="itemId"
                                placeholder="Name"
                                className="form-control"
                                value={key}
                                readOnly="readOnly"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-lg"
                          >
                            Buy Now!
                          </button>
                        </form>
                      </div>
                    ) : (
                      <p className="card-text">
                        You are not approved to buy this NFT
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

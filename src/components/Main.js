import React, { Component } from "react";
import "./App.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 1,
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
                            Set the price if your are the owner <br />
                            in NFT Setting
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
    
                      <div className="alert alert-secondary" role="alert">
                       NFT for Sell!
                    </div>
                    ) : (
                      <div className="text-center">
                        {this.props.nftBuyer[key] ===
                        this.props.Ownerof[key] ? (
                          <div className="alert alert-success" role="alert">
                            Sold!
                          </div>
                        ) : (
                          <div className="alert alert-warning" role="alert">
                          {this.props.nftBuyer[key]} <br />
                          want to buy your NFT
                        </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          
        </div>
        
        <br />
        <hr />
        <div className="col-sm">

          <div >
          <h1>Book Order</h1>
          <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">NFT id</th>
              <th scope="col"> Apprived account</th>
              <th scope="col">Buy</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
            {this.props.approvedAddress.map((approvedAddress, key) => {
              return (
              <tbody key={key}>
                <tr>
                <th scope="row">{key +1} </th>
                <td>{ this.props.approvedAddress[key].substr(0, 4)+ '...' + this.props.approvedAddress[key].substr(38, 42)}</td>
                <td>{this.props.account === this.props.approvedAddress[key] ? (
                                
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            this.props.BuyNFT(key + 1);
                          }}
                        >
                          <button
                            type="submit"
                            className="btn-primary btn-block "
                          >Buy Now!</button>
                        </form>
                    ) : (
                      <p className="card-text">
                        Not approved 
                      </p>
                    )}</td>
                        <td>{this.props.nftPrice[key] / 10 ** 18} ONE</td>
                      </tr>
                    </tbody>
                
              );
            })}
            
          </table>
          </div>
          <h5 className="card-title text-center">
            Approve Buyer to buy your NFT:
          </h5>
          <div className="card-body card mb-3 cover-item container-fluid ">
            <div className="bg-danger text-center">
              <p>Only the owner of NFT can approve the buyer</p>
            </div>
            <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;">
              <form
                className="form-group row"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.props.approve(
                    this.props.nftBuyer[this.state.itemId-1],
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
                      value={this.state.itemId }
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
                      value={this.props.nftBuyer[this.state.itemId - 1]}
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
          
        </div>
      </div>
    );
  }
}

export default Main;

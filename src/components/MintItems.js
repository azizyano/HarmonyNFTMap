import React, { Component } from "react";
import "./App.css";

class MintItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: "0",
      tokenid: "0",
      price: "0",
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
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-6">
            <p>
              If you want to buy an NFT you have to send a request to the NFT
              owner.
            </p>

            <h1 className="font-weight-light">Send request to buy:</h1>

            <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;">
              <form
                className="form-group row"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.props.setBuyer(this.state.tokenid);
                }}
              >
                <div className="form-group row">
                  <label htmlFor="name" className=" col-form-label">
                    ItemId:
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="tokenid"
                      placeholder="Name"
                      className="form-control"
                      value={this.state.tokenid}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Send!
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <p>
              The Owner of NFT have to Set the price of his NFT if he want to
              sell it.
            </p>
            <h1 className="font-weight-light">Set the NFT Price:</h1>

            <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;">
              <form
                className="form-group row"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.props.setSale(this.state.itemId, this.state.price);
                }}
              >
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    ItemId:
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="itemId"
                      placeholder="Name"
                      className="form-control"
                      value={this.state.itemId}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Price:
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="price"
                      placeholder="Name"
                      className="form-control"
                      value={this.state.price}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Set!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MintItems;

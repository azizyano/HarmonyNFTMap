import React, { Component } from "react";
import "./App.css";

class MintItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
    };
  }
  render() {
    return (
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <p>
              After adding your Item it's time to mint your NFT. if you create
              more items just input the item Id.
            </p>
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Mint NFT:</h1>

            <div className="card container-fluid mt-10 col-m-10 background-color: $indigo-900;  text-white">
              <form
                className="form-group row"
                onSubmit={(event) => {
                  event.preventDefault();
                  let itemId;
                  itemId = this.input.value.toString();
                  this.props.mintNft(itemId);
                }}
              >
                <label className="col-sm-2 col-form-label">
                  <b>Input the item Id</b>
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={(event) => {
                      const itemId = this.input.value.toString();
                      this.setState({
                        output: itemId,
                      });
                    }}
                    ref={(input) => {
                      this.input = input;
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Mint
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

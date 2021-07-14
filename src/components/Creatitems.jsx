import React, { Component } from "react";
import "./App.css";


class MintItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
          output: '0'
        }
      }
    render() {
      return (
        <div className="card container-fluid mt-10 col-m-10 bg-dark  text-white">
        <h5> Create Items:</h5>
        <form  onSubmit={this.handleSubmit}>
          
          <div className="text-center">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Account: </label>
            <div className="col-sm-10 form-control">{this.state.account}</div>
          </div>
          <div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name:
              </label>
              <div className="col-sm-10">
                <input
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="numbres" className="col-sm-2 col-form-label">
              limit Number of NFT:
            </label>
            <div className="col-sm-10">
              <input
                name="limit"
                placeholder="limit"
                className="form-control"
                value={this.state.limit}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="numbres" className="col-sm-2 col-form-label">
              Initial Price:{" "}
            </label>
            <div className="col-sm-10">
              <input
                name="price"
                placeholder="price"
                className="form-control"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="Coordinates"
              className="col-sm-2 col-form-label"
            >
              Coordinates:{" "}
            </label>
            <div className="col-sm-10 form-control">
              {" longitude: " +
                this.state.anchor[0].toFixed(6) +
                ", latitude: " +
                this.state.anchor[1].toFixed(6)}
            </div>
          </div>
          <div
            className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto"
            style={{ maxWidth: "1000px" }}
          >
            <Map
              height={500}
              defaultCenter={[30.394324, -9.561427]}
              defaultZoom={12}
            >
              <Draggable
                offset={[51, 51]}
                anchor={this.state.anchor}
                onDragEnd={(anchor) => this.setState({ anchor })}
              >
                <img src={flag} width={100} height={100} alt="flag!" />
              </Draggable>
              <Marker
                width={50}
                anchor={[this.state.latitude, this.state.longitude]}
              />
            </Map>
          </div>
          
          <div className="input-group">
            <input name="file" className="form-control" type="file" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={this.handleupload} />
          
          <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
          </div>
        
          {!this.state.ipfsHash ? (
            <div
              id="loader"
              className="spinner-grow text-light"
              role="status"
            ></div>
          ) : (
            <div>
              <img
                src={"https://ipfs.io/ipfs/" + this.state.ipfsHash}
                height="300"
                width="300"
                alt=""
              />
            </div>
          )}
          </div>
</form>
        <br></br>
        <button class="btn btn-outline-secondary"  type="button" id="inputGroupFileAddon04" onClick={this.handledata}>Creat NFT Item</button>
      </div>
      );
    }
  }

  export default  MintItems
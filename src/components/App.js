import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, About, Harmony } from "./";
import Navbar from "./Navbar";
import Main from "./Main";
import BuyForm from "./BuyForm";
import MintItems from "./MintItems";
import flag from "../logos/target.png";
import { Map, Draggable, Marker } from "pigeon-maps";
import ipfs from "./IPFSUploader";
import Web3 from "web3";
import HERC721 from "../abis/HRC721.json";
import HRC721Crowdsale from "../abis/HRC721Crowdsale.json";
import "./App.css";

const BN = require("bn.js");
class App extends Component {
  /** !UPDATE **/
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    navigator.geolocation.getCurrentPosition((position) => {
      const imagePosition = position.coords;
      const latitude = imagePosition.latitude;
      const longitude = imagePosition.longitude;
      this.setState({
        latitude: latitude,
        longitude: longitude,
      });
    });
    let accounts,
      network,
      balance,
      totalItems,
      contract1,
      contract2,
      contract1_abi,
      contract2_abi,
      nftbalance,
      web3 = window.web3;
    // Load account
    this.setState({ web3: web3 });
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const networkData = "1666700000";
    if (networkData) {
      contract1_abi = HERC721.abi;
      contract2_abi = HRC721Crowdsale.abi;
      const contract1_address = "0x7C13bB2Ad930aC5A20077dDb7a35A3bfF837f12f";
      const contract2_address = "0x8e5186051F30e2f5405b0cC311344406328911Af";
      contract1 = new web3.eth.Contract(contract1_abi, contract1_address);
      contract2 = new web3.eth.Contract(contract2_abi, contract2_address);
      accounts = await web3.eth.getAccounts();
      balance = await web3.eth.getBalance(accounts[0]);
      totalItems = await contract2.methods.totalItems().call();
      nftbalance = await contract1.methods.balanceOf(accounts[0]).call();

      this.setState({
        account: accounts[0],
        balance: balance,
        totalItems: totalItems,
        nftbalance: nftbalance,
      });
      this.setState({
        contract1: contract1,
        contract2: contract2,
      });
      // Load Colors
      for (var i = 1; i <= totalItems; i++) {
        const URL = await contract2.methods.getUrl(i - 1).call();
        console.log(URL);
        const nftjson = await this.loadingMetadata(URL);
        console.log(nftjson);
        if (nftjson === undefined) {
          console.log(nftjson);
        } else {
          const imgURL = "https://ipfs.io/ipfs/" + nftjson.ipfsHash;
          this.setState({
            tokenURL: [...this.state.tokenURL, imgURL],
            nftjson: [...this.state.nftjson, nftjson],
          });
        }
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }

    window.ethereum.on("chainChanged", async (chainId) => {
      network = parseInt(chainId, 16);
      if (network !== 1666700000) {
        this.setState({ wrongNetwork: true });
      } else {
        if (this.state.account) {
          balance = await this.state.web3.eth.getBalance(this.state.account);
          totalItems = await this.state.contract2.methods.totalItems().call();
          this.setState({ balance: balance, totalItems: totalItems });
        }
        this.setState({
          network: network,
          loading: false,
          onlyNetwork: false,
          wrongNetwork: false,
        });
      }
    });
  }
  async loadingMetadata(URL) {
    const resp = await fetch(URL);
    console.log(resp);
    return resp
      .json()
      .then((metadata) => {
        return metadata;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      anchor: [30.394324, -9.561427],
      account: null,
      limit: "0",
      price: "0",
      balance: null,
      contract1: null,
      contract2: null,
      event: null,
      loading: false,
      network: null,
      web3: null,
      wrongNetwork: false,
      contractAddress1: null,
      contractAddress2: null,
      tokenURL: [],
      nftjson: [],
      name: "",
      phoneNo: "",
      file: null,
      ipfsHash: null,
      ipfsHash2: null,
      jsondata: null,
    };

    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleupload = this.handleupload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handledata = this.handledata.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleupload(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  }

  handledata = async (event) => {
    event.preventDefault();
    const jsondata = {
      ipfsHash: this.state.ipfsHash,
      account: this.state.account,
      Name: this.state.name,
      limit: this.state.limit,
      price: this.state.price,
      coords: this.state.anchor[0] + ", " + this.state.anchor[1],
    };
    var buf = Buffer.from(JSON.stringify(jsondata));
    console.log(buf);
    this.setState({ jsondata: jsondata });

    const metadataCid = await ipfs.files.add(
      { path: this.state.totalItems + ".json", content: buf },
      { wrapWithDirectory: true }
    );

    console.log(metadataCid[0].hash);

    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );

    const gasLimit = 6721900;
    const url = "https://ipfs.io/ipfs/" + metadataCid[0].hash;
    this.state.contract2.methods
      .addItem(this.state.limit, this.state.price, url)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };
  mintNft = async (itmeId) => {
    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );
    const gasLimit = 6721900;
    this.state.contract1.methods
      .mint(this.state.account, itmeId)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    await ipfs.files.add(this.state.buffer, (error, result) => {
      console.log(result[0].hash);
      if (error) {
        console.error(error);
        return;
      }
      return this.setState({ ipfsHash: result[0].hash });
    });
  };
  render() {
    return (
      <div>
        <div className="App">
          <Navbar balance={this.state.balance} account={this.state.account} />
          <Router>
            <Navigation account={this.state.account} />
            <Switch>
              <Route path="/about" exact component={() => <About />} />
              <Route path="/Harmony" exact component={() => <Harmony />} />
              <Route
                path="/MintItems"
                exact
                component={() => (
                  <MintItems
                    mintNft={this.mintNft}
                    contract1={this.state.contract1}
                  />
                )}
              />
            </Switch>
            {this.state.wrongNetwork ? (
              <div className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto">
                <div className="content mr-auto ml-auto">
                  <h1>Please Enter Harmony TestNet </h1>
                </div>
              </div>
            ) : (
              <Main
                amount={this.state.amount}
                balance={this.state.balance}
                onChange={this.onChange}
                totalItems={this.state.totalItems}
                loading={this.state.loading}
                web3={this.state.web3}
                tokenURL={this.state.tokenURL}
                account={this.state.account}
                nftjson={this.state.nftjson}
                anchor={this.state.anchor}
              />
            )}
            <div className="card container-fluid mt-10 col-m-10 bg-dark  text-white">
              <h5> Create Items:</h5>
              <form onSubmit={this.handleSubmit}>
                <div className="text-center">
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Account: </label>
                    <div className="col-sm-10 form-control">
                      {this.state.account}
                    </div>
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
                    <label
                      htmlFor="numbres"
                      className="col-sm-2 col-form-label"
                    >
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
                    <label
                      htmlFor="numbres"
                      className="col-sm-2 col-form-label"
                    >
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
                    <input
                      name="file"
                      className="form-control"
                      type="file"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      onChange={this.handleupload}
                    />


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
                </div >
                <div className="text-center">
                  <button
                      class="btn btn-outline-secondary "
                     
                    >
                      Upload to IPFS
                    </button></div >
                

              </form>
              <br></br>
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon04"
                onClick={this.handledata}
              >
                Creat NFT Item
              </button>
            </div>

            <div
              className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto"
              style={{ maxWidth: "1000px" }}
            ></div>
            <BuyForm
              balance={this.state.balance}
              totalItems={this.state.totalItems}
              web3={this.state.web3}
            />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

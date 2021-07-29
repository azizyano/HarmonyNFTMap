import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, About, Announcement, Footer } from "./";
import Navbar from "./Navbar";
import Main from "./Main";
import MintItems from "./MintItems";
import flag from "../logos/target.png";
import { Map, Draggable } from "pigeon-maps";
import ipfs from "./IPFSUploader";
import Web3 from "web3";
import NFTMAP from "../abis/NFTMap.json";
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
    let accounts,
      network,
      balance,
      totalSupply,
      contract1,
      contract1_abi,
      nftbalance,
      web3 = window.web3;
    // Load account
    this.setState({ web3: web3 });
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if (networkId === 1666700000) {
      contract1_abi = NFTMAP.abi;
      const contract1_address = "0x2Cdce057a4523d1Ce857D848A9d93807a65bca55";
      contract1 = new web3.eth.Contract(contract1_abi, contract1_address);
      accounts = await web3.eth.getAccounts();
      balance = await web3.eth.getBalance(accounts[0]);
      totalSupply = await contract1.methods.totalSupply().call();
      nftbalance = await contract1.methods.balanceOf(accounts[0]).call();
      this.setState({
        account: accounts[0],
        balance: balance,
        totalSupply: totalSupply,
        nftbalance: nftbalance,
      });
      this.setState({
        contract1: contract1,
      });
      for (var i = 1; i <= totalSupply; i++) {
        const URL = await contract1.methods.tokenURI(i).call();
        console.log(URL);
        const nftPrice = await contract1.methods.getSalePrice(i).call();
        const nftBuyer = await contract1.methods.getBuyer(i).call();
        const Ownerof = await contract1.methods.ownerOf(i).call();
        const approvedAddress = await contract1.methods.getApproved(i).call();
        console.log(approvedAddress);
        const nftjson = await this.loadingMetadata(URL);
        if (nftjson === undefined) {
          console.log("the NFT number:" + i + " is undefined");
        } else {
          const imgURL = "https://ipfs.io/ipfs/" + nftjson.ipfsHash;
          this.setState({
            tokenURL: [...this.state.tokenURL, imgURL],
            nftjson: [...this.state.nftjson, nftjson],
            localisation: [...this.state.localisation, nftjson.coords],
            nftPrice: [...this.state.nftPrice, nftPrice],
            nftBuyer: [...this.state.nftBuyer, nftBuyer],
            approvedAddress: [...this.state.approvedAddress, approvedAddress],
            Ownerof: [...this.state.Ownerof, Ownerof],
          });
        }
      }
    } else {
      window.alert("You are not in Harmony TestNet!");
    }

    window.ethereum.on("chainChanged", async (chainId) => {
      network = parseInt(chainId, 16);
      if (network !== 1666700000) {
        this.setState({ wrongNetwork: true });
      } else {
        if (this.state.account) {
          balance = await this.state.web3.eth.getBalance(this.state.account);
          totalSupply = await this.state.contract1.methods.totalSupply().call();
          this.setState({ balance: balance, totalSupply: totalSupply });
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
    return resp
      .json()
      .then((metadata) => {
        return metadata;
      })
      .catch((error) => {
        console.log(error);
      });
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
  BuyNFT = (itmeId) => {
    console.log(itmeId);

    const nftPrice = this.state.nftPrice[itmeId-1];
    console.log(nftPrice);
    console.log(itmeId, nftPrice);
    const gasLimit = 6721900;
    this.state.contract1.methods
      .buyTokenOnSale(itmeId)
      .send({ value: nftPrice, from: this.state.account, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Done!");
      });
  };
  handledata = async (event) => {
    event.preventDefault();
    const jsondata = {
      ipfsHash: this.state.ipfsHash,
      account: this.state.account,
      Name: this.state.name,
      coords: this.state.anchor[0] + ", " + this.state.anchor[1],
    };
    var buf = Buffer.from(JSON.stringify(jsondata));
    console.log(buf);
    this.setState({ jsondata: jsondata });

    const metadataCid = await ipfs.files.add(
      { path: this.state.totalSupply + ".json", content: buf },
      { wrapWithDirectory: true }
    );

    console.log(metadataCid[0].hash);

    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );

    const gasLimit = 6721900;
    const url = "https://ipfs.io/ipfs/" + metadataCid[0].hash;
    this.state.contract1.methods
      .mintNft(this.state.account, url)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };
  setSale = async (itmeId, price) => {
    const nftprice = window.web3.utils.toWei(price, "Ether");
    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );
    console.log(nftprice, itmeId);
    const gasLimit = 6721900;
    this.state.contract1.methods
      .setSale(itmeId, nftprice)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Done!");
      });
  };
  setBuyer = async (itmeId) => {
    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );
    console.log(itmeId);
    const gasLimit = 6721900;
    this.state.contract1.methods
      .setBuyer(itmeId)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Done!");
      });
  };
  Approve = (address, item) => {
    console.log(address, item);
    const gasLimit = 6721900;
    this.state.contract1.methods
      .approve(address, item)
      .send({ from: this.state.account, gasLimit })
      .once("receipt", (receipt) => {
        console.log(receipt);
        window.alert("Done!");
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
  constructor(props) {
    super(props);
    this.state = {
      anchor: [30.394324, -9.561427],
      account: null,
      balance: null,
      contract1: null,
      event: null,
      loading: false,
      network: null,
      web3: null,
      wrongNetwork: false,
      contractAddress1: null,
      contractAddress2: null,
      tokenURL: [],
      nftjson: [],
      localisation: [],
      name: "",
      file: null,
      ipfsHash: null,
      ipfsHash2: null,
      jsondata: null,
      nftPrice: [],
      nftBuyer: [],
      approvedAddress: [],
      Ownerof: [],
    };
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleupload = this.handleupload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handledata = this.handledata.bind(this);
  }
  render() {
    return (
      <div>
        <div className="App">
          <Navbar balance={this.state.balance} account={this.state.account} />
          <Router>
            <Navigation account={this.state.account} />
            <Switch>
              <Route path="/about" exact component={() => <About />} />
              <Route
                path="/Announcement"
                exact
                component={() => (
                  <Announcement tokenURL={this.state.tokenURL} />
                )}
              />
              <Route
                path="/Main"
                exact
                component={() => (
                  <Main
                    amount={this.state.amount}
                    balance={this.state.balance}
                    onChange={this.onChange}
                    totalSupply={this.state.totalSupply}
                    loading={this.state.loading}
                    web3={this.state.web3}
                    tokenURL={this.state.tokenURL}
                    account={this.state.account}
                    nftjson={this.state.nftjson}
                    anchor={this.state.anchor}
                    nftPrice={this.state.nftPrice}
                    nftBuyer={this.state.nftBuyer}
                    Ownerof={this.state.Ownerof}
                    approvedAddress={this.state.approvedAddress}
                    BuyNFT={this.BuyNFT}
                    approve={this.Approve}
                  />
                )}
              />
              <Route
                path="/MintItems"
                exact
                component={() => (
                  <MintItems setBuyer={this.setBuyer} setSale={this.setSale} />
                )}
              />
            </Switch>
            <div className=" container-fluid mt-10 col-m-10 bg-dark  text-white">
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
                    </Map>
                  </div>

                  <div className=" ">
                    <input
                      name="file"
                      type="file"
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
                </div>
                <div className="text-center">
                  <button className="btn btn-outline-secondary ">
                    Upload to IPFS
                  </button>
                </div>
              </form>
              <br></br>
              <div className="text-center">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={this.handledata}
                >
                  Creat NFT Item
                </button>
              </div>
            </div>

            <Footer />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import Main from "./Main";
import BuyForm from "./BuyForm"
import flag from "../logos/target.png";
import { Map, Draggable } from "pigeon-maps";
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
      const contract1_address = "0xd22AEC956Cc97cc25ac0F8F93fdc8F19a430Ad5c";
      const contract2_address = "0x94286a74ef86E19A42046Da8dC5A4486B01AAF88";
      contract1 = new web3.eth.Contract(contract1_abi, contract1_address);
      contract2 = new web3.eth.Contract(contract2_abi, contract2_address);
      accounts = await web3.eth.getAccounts();
      console.log(contract1, contract2);
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
        const nftjson = await this.loadingMetadata(URL)
        const imgURL = "https://ipfs.io/ipfs/" + nftjson.ipfsHash
        this.setState({
          tokenURL: [...this.state.tokenURL, imgURL], nftjson: [...this.state.nftjson, nftjson]
        });
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
    console.log(this.state.nftjson)
    window.ethereum.on("chainChanged", async (chainId) => {
      network = parseInt(chainId, 16);
      if (network !== 1666700000) {
        this.setState({ wrongNetwork: true });
      } else {
        if (this.state.account) {
          balance = await this.state.web3.eth.getBalance(this.state.account);
          totalItems = await this.state.web3.eth.totalItems().call();
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
    return resp.json().then((metadata) => {
      return metadata;
    });
  }
  onChange(value) {
    this.setState({ amount: value });
  }

  constructor(props) {
    super(props);
    this.state = {
      anchor: [30.394324, -9.561427],
      account: null,
      limit: "0",
      price: "0",
      amount: null,
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
    this.onChange = this.onChange.bind(this);
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
    await ipfs.files.add(
      { path: "metadata.json", content: buf },
      { wrapWithDirectory: true },
      (error, result) => {
        console.log(result[0].hash);
        if (error) {
          console.error(error);
          return;
        }
        return this.setState({ ipfsHash2: result[0].hash });
      }
    );
    const gasPrice = new BN(await this.state.web3.eth.getGasPrice()).mul(
      new BN(1)
    );
    const gasLimit = 6721900;
    const url = "https://ipfs.io/ipfs/" + this.state.ipfsHash2;
    this.state.contract2.methods
      .addItem(this.state.limit, this.state.price, url)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        this.setState({
          tokenURL: [...this.state.tokenURL, url],
        });
      });
    this.state.contract1.methods
      .mint(this.state.account, this.state.totalItems)
      .send({ from: this.state.account, gasPrice, gasLimit })
      .once("receipt", (receipt) => {
        this.setState({
          tokenURL: [...this.state.tokenURL, url],
        });
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
  nftlinkByItem(itemId){

  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        &nbsp;
        {this.state.wrongNetwork ? (
          <div className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto">
            <div className="content mr-auto ml-auto">
              <h1>Please Enter Harmony TestNet </h1>
            </div>
          </div>
        ) : this.state.loading ? (
          <Loading
            balance={this.state.balance}
            totalItems={this.state.totalItems}
            web3={this.state.web3}
          />
        ) : (
          <Main
            amount={this.state.amount}
            balance={this.state.balance}
            onChange={this.onChange}
            totalItems={this.state.totalItems}
            loading={this.state.loading}
            web3={this.state.web3}
          />
        )}

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
                        {this.state.tokenURL.map((tokenURL, key) => {
                          return (
                            <div key={key} className="col-md-3 mb-3">
                              <div
                                className="token"
                                style={{ backgroundColor: "blue" }}
                              ></div>
                              <div className="card-body card bg-info mb-3">
                                <h5 className="card-title">{this.state.nftjson[key].Name }</h5>
                                <p className="card-text">
                                creator: {this.state.nftjson[key].account }
                                </p>
                                <p className="card-text">
                                total number of NFT: {this.state.nftjson[key].limit }
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
                      <div className="container-fluid mt-5 text-monospace text-center mr-auto ml-auto">
                        <div>
                          <Map
                            height={500}
                            defaultCenter={[30.394324, -9.561427]}
                            defaultZoom={14}
                          >
                            <Draggable
                              offset={[60, 87]}
                              anchor={this.state.anchor}
                              onDragEnd={(anchor) => this.setState({ anchor })}
                            >
                              <img
                                src={flag}
                                width={100}
                                height={95}
                                alt="flag!"
                              />
                            </Draggable>
                          </Map>
                        </div>
                      </div>

                      <form onSubmit={this.handleSubmit}>
                        <div>
                          <label>Account: </label>
                          {this.state.account}
                        </div>
                        <div>
                          <label htmlFor="name">Name</label>
                          <input
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="numbres">limit Number of NFT</label>
                          <input
                            name="limit"
                            placeholder="limit"
                            value={this.state.limit}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="numbres">Price</label>
                          <input
                            name="price"
                            placeholder="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="Coordinates">Coordinates: </label>
                          {" longitude: " +
                            this.state.anchor[0].toFixed(6) +
                            ", latitude: " +
                            this.state.anchor[1].toFixed(6)}
                        </div>

                        <div>
                          <input
                            name="file"
                            type="file"
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
                              src={
                                "https://ipfs.io/ipfs/" + this.state.ipfsHash
                              }
                              height="300"
                              width="300"
                              alt=""
                            />
                          </div>
                        )}
                        <div>
                          <button>Upload Data</button>
                        </div>
                      </form>
                      <button onClick={this.handledata}>Create nft</button>
                    </div>
                    <BuyForm
                      balance={this.state.balance}
                      totalItems={this.state.totalItems}
                      web3={this.state.web3}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;

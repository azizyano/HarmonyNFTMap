import React, { Component } from 'react'
import Maplogo from "../logos/MapsLoga.png"
import oneLogo from '../logos/onelogo.png'
import Maplogo from "../logos/MapsLoga.png"

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let itemId
          itemId = this.input.value.toString()
          this.props.buyNft(itemId)
        }}>
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: 
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const itemId = this.input.value.toString()
              this.setState({
                output: itemId * 99
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={oneLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; ONE
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>

        </div>
        <div className="input-group mb-2">
        <img
          src={Maplogo}
          className="rounded img-fluid"
          alt="NFT "
          height="150px"
          width="150px"
        ></img>
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={Maplogo} height='32' alt=""/>
              &nbsp; BEE
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted"></span>
          <span className="float-right text-muted"></span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">BUY NOW!</button>
      </form>
    );
  }
}

export default BuyForm;

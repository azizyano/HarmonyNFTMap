import React from "react";
import Harmonylogo from "../logos/onelogo.png";
function Harmony() {
  return (
    <div className="Harmony">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={Harmonylogo}
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">What is Harmony?‌</h1>
            <p>
            Harmony is a fast and secure blockchain for decentralized applications. <br />
            Harmony is a powerful blockchain that is EVM compatible with sharding and staking features. <br />
            Developing on Harmony should feel very familiar for Ethereum developers, as Harmony is fully Ethereum compatible and inherits almost all the tools and libraries from Ethereum, like truffle, remix, web3js, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Harmony;
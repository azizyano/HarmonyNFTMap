import React from "react";
import Maplogo from "../logos/MapsLoga.png";

function About() {
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={Maplogo}
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">About</h1>
            <p>
              NFT Map is a DApp that users can create a geolocalitaion NFT in Harmony blockchain. <br />
              To create NFT you need to fill the form and drag the Marker to the localisation.
              the 2nd step is to create Metadata of the NFTt and upload it to IPSF, you can do this step by clicking the upload button.
              Finally set the price in the marketplace to buy/sell the NFT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
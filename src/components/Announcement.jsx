import React, { Component } from "react";
import "./Announcement.css";
class Announcement extends Component {
  render() {
    return (
      <div className="Announcement">
        <div className=" container-fluid mt-10 col-m-10 bg-dark  ">
          <h5 className="text-center font-weight-light text-white">News and Announcement </h5>
          <hr></hr>
          <div className="container-fluid overflow-auto">
            <h2 className="font-weight-light text-white">Announcement for NFT creators</h2>
            <div className="d-flex flex-row flex-nowrap">

              <div className="card card-body">
                <img
                  src={this.props.tokenURL[0]}
                  className="rounded img-fluid"
                  alt="NFT"
                  height="150px"
                  width="150px"
                ></img>
                <h1 className="font-weight-light">Agadir Beach‌</h1>
                <p>
                  Free access for owner of NFT to Agadir Beach HOTEL <br />
                  Don’t miss this special offer! the owner of Our NFT get a 50% discount on a stay in one of our Hotels in summer 2021!
                  And if you can’t travel, cancellation is free of charge!

                </p>
              </div>
              <div className="card card-body">
                <img
                  src={this.props.tokenURL[1]}
                  className="rounded img-fluid"
                  alt="NFT"
                  height="150px"
                  width="150px"
                ></img>
                <h1 className="font-weight-light">Crocoparc‌</h1>
                <p>
                  Free access for owners of NFT  <br />

                  Whenever you want to organise a memorable party in a unique and original setting for your child’s birthday, CROCOPARC can take care of all your requirements.
                  We offer buffet, deco, animation … Parents can enjoy free access to the restaurant, but access to the park is reserved for children.
                  More details in our brochure!
                </p>
              </div>


            </div>

          </div>
          <br />
          <p className="text-center text-white">We invite Hotel and restaurant owners to create there own NFT and sell it to customers.
            <br />And offering discounts and gifts to its owners </p>
          <h5 className="text-center font-weight-light text-white">to create your Announcement plz connect us in Twitter or Telegram </h5>
        </div>
      </div>
    );
  }

}

export default Announcement;
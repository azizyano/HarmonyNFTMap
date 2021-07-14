import React from "react";
import App from "./App";
import "./AddItemsCSS.css";

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  app = null;

  async componentDidMount() {
    this.app = new App();
    await this.loadFiles();
  }



  render() {
    
    return (
      <div style={{ margin: "20px" }}>
        <b style={{ color: "white" }}>Images</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "200px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
        </div> <br /><br />

        <b style={{ color: "white" }}>Videos</b> <br /><br />
        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "250px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
        </div> <br /><br />

        <b style={{ color: "white" }}>Audio</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "250px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
        </div> <br /><br />

        <b style={{ color: "white" }}>Applications</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "150px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
        </div> <br /><br />

        <b style={{ color: "white" }}>Others</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "150px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
        </div>
      </div>
    );
  }
}

export default AddItems;
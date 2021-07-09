import React from "react";
import App from "./App";
import "./IPFSViewerCSS.css";

class IPFSViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      videoFiles: [],
      applicationFiles: [],
      audioFiles: [],
      otherFiles: [],
    };
  }

  app = null;

  async componentDidMount() {
    this.app = new App();
    await this.loadFiles();
  }

  loadFiles = async () => {
    var imageFiles = [], videoFiles = [], audioFiles = [], applicationFiles = [], otherFiles = [];

   

    this.setState({
      imageFiles,
      videoFiles,
      audioFiles,
      applicationFiles,
      otherFiles,
    });
  };

  showImageFiles = () => {
    var fileComponent = [];

    return fileComponent;
  };

  showVideoFiles = () => {
    var fileComponent = [];
    
    return fileComponent;
  };

  showAudioFiles = () => {
    var fileComponent = [];
    
    return fileComponent;
  };

  showApplicationFiles = () => {
    var fileComponent = [];
    
    return fileComponent;
  };

  showOtherFiles = () => {
    var fileComponent = [];
    
    return fileComponent;
  };

  render() {
    var imageFiles = this.showImageFiles(), videoFiles = this.showVideoFiles(), audioFiles = this.showAudioFiles(), applicationFiles = this.showApplicationFiles(), otherFiles = this.showOtherFiles();

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
          {imageFiles.length === 0 ? "No files to show" : imageFiles}
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
          {videoFiles.length === 0 ? "No files to show" : videoFiles}
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
          {audioFiles.length === 0 ? "No files to show" : audioFiles}
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
          {applicationFiles.length === 0 ? "No files to show" : applicationFiles}
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
          {otherFiles.length === 0 ? "No files to show" : otherFiles}
        </div>
      </div>
    );
  }
}

export default IPFSViewer;
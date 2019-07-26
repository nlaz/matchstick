import React, { Component } from "react";
import * as api from "../core/apiActions";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import * as Trello from 'trello';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const LoadingView = () => (
  <div
    className="absolute absolute--fill bg-white pa4 tc"
    style={{ opacity: 0.8 }}
  >
    <span className="f4">Generating a snapshot for you. Loading...</span>
  </div>
);
class Home extends Component {
  state = {
    inputLink: "http://www.google.com",
    outputLink: "http://matchstick.design/",
    isLoading: false,
    results: {},
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 9
    }
  };

  changeInputUrl = e => {
    this.setState({ inputLink: e.target.value });
  };

  changeOutputUrl = e => {
    this.setState({ outputLink: e.target.value });
  };

  handleSubmit = async () => {
    const { inputLink, outputLink } = this.state;
    this.setState({ isLoading: true });
    const response = await api.fetchReport(inputLink, outputLink);
    this.setState({ results: response.data, isLoading: false});
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );


    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });

    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(this.fileUrl);
    //     this.fileUrl = window.URL.createObjectURL(blob);
    //     console.log(this.fileUrl)
    //     resolve(this.fileUrl);
    //   }, "image/jpeg");
    // });
  };

  makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageBlob = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      console.log("crop", crop)
      console.log(croppedImageBlob)
      let file = new File([croppedImageBlob], "file.jpg", { type: "image/jpeg", lastModified: Date.now() })
      console.log(file)
      this.setState({ croppedImageBlob, file });
    }
  }

  cropAndSend = (e) => {
    let card = this.createCard();
    console.log(card)
    card.then(cardId => {
      return this.createAndSendForm(this.state.croppedImageBlob, cardId)
    })
  }

  createCard = () => {
   let trello = new Trello(process.env.REACT_APP_TRELLO_KEY, process.env.REACT_APP_TRELLO_TOKEN);
    return trello.addCard('Visual Defect', 'Please fix the defect', '5d3b226d634ca22ceb838beb').then((card) => {
      console.log(card, card.id) 
      return card.id   
    })
  }
    // Helper function to build an XMLHttpRequest object that prints to console.log
  // when a response is received.
   createRequest = (cardId) => {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    request.onreadystatechange = function() {
      // When we have a response back from the server we want to share it!
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
      if (request.readyState === 4) {
        console.log(`Successfully uploaded at: ${request.response.date}`);
      }
    }
    request.open("POST", `https://api.trello.com/1/cards/${cardId}/attachments/`);
    return request;
  }

   createAndSendForm = (file, cardId) => {
    let key = process.env.REACT_APP_TRELLO_KEY;
    let token = process.env.REACT_APP_TRELLO_TOKEN;
    var formData = new FormData();
    formData.append("key", key);
    formData.append("token", token);
    formData.append("file", file);
    formData.append("mimeType", "image/jpg");
    formData.append("name", "Defect");  
    // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
    var request = this.createRequest(cardId);
    request.send(formData);
  };

  render() {
    const { inputLink, outputLink, results, isLoading, crop, croppedImageBlob } = this.state;
    console.log("loaded", results.comparison)
return (
      <div>
        <div className="ph4 pv4">
          <h1 className="f1 orange mb1">Design with Confidence.</h1>
          <p className="f4 measure lh-copy mt0 mid-gray mb3">
            Automate your visual testing by comparing what you design with what
            you build.
          </p>
        </div>
        <div className="bg-near-white pv1 ph4 bt bb b--light-gray">
          <div className="flex">
            <div className="pv3 flex flex-column w-100">
              <label className="b mb2">
                Enter the Invision link to your designs
              </label>
              <input
                value={inputLink}
                onChange={this.changeInputUrl}
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.invisionapp.com"
                style={{ padding: "8px 16px" }}
              />
            </div>
            <div className="pv3 flex flex-column w-100 ml2">
              <label className="b mb2">Enter the link to your website</label>
              <input
                value={outputLink}
                onChange={this.changeOutputUrl}
                className="f4 br2 ba b--moon-gray"
                placeholder="i.e. www.google.com"
                style={{ padding: "8px 16px" }}
              />
            </div>
            <div className="ml2 flex flex-column justify-end pv3">
              <button
                onClick={this.handleSubmit}
                className="f4 br2 bg-orange bn white"
                style={{ padding: "9px 40px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="bg-near-white ph4 pv4 b--light-gray">
          <div className="flex bg-white pa3 relative">
            {isLoading && <LoadingView />}
            <div className="w-100 bg-moon-gray mr2" style={{ height: "600px" }}>
              {results && (
                <img
                  alt=""
                  className="ba b--light-gray"
                  src={`${baseUrl}${results.input}`}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              )}
            </div>
            <div className="w-100 bg-moon-gray ml2" style={{ height: "600px" }}>
              {results && (
                <img
                  alt=""
                  className="ba b--light-gray"
                  src={`${baseUrl}${results.comparison}`}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              )}
              </div>
              <div className="w-100 bg-moon-gray ml2" style={{ height: "600px" }}>
              FOO
              {results.comparison && (
          <ReactCrop
            src={`${baseUrl}${results.comparison}`}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            crossorigin={"anonymous"}
          />
        )}
        {croppedImageBlob && (
          <div>
            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageBlob} />
            <button onClick={this.cropAndSend}>Send!</button>
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

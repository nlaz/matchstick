import React, {Component} from 'react';
import * as api from '../core/apiActions';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import * as Trello from 'trello';

const baseUrl = process.env.REACT_APP_SERVER_URL;

// const Modal = ({results={}, crop, onImageLoaded, onComplete, onChange}) => {
          {/* <ReactCrop
            src={`${baseUrl}${results.comparison}`}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={onComplete}
            onChange={onChange}
            crossorigin={'anonymous'}
          /> */}
const Modal = (s) => {
  return (
    <div className={"vh-100 dt w-100 bg-white absolute"} style={{ opacity: 0.8, zIndex: 99 }}>
      <div className={"dtc v-mid tc ph3 ph4-l"}>
        <div className={"white br-25"} style={{maxWidth: "30%"}}>
          Foo
          Bar
          Baz
          </div>
      </div>
    </div>
  )
}

const ViewToggle = (props) => {
  return (
    <div className={`toggle absolute top-0 right-0`}>
      <input className={"checkbox"} type="checkbox" id="toggle" checked={props.checked} onChange={props.onChange}/>
      <label htmlFor="toggle" className="toggle"></label>
    </div>
  )
}

const LoadingView = () => (
  <div
    className="absolute absolute--fill bg-white pa4 tc"
    style={{ opacity: 0.8, zIndex: 99 }}
  >
    <span className="f4">Generating a snapshot for you. Loading...</span>
  </div>
);
class Home extends Component {
  state = {
    inputLink: "",
    outputLink: "",
    isLoading: false,
    results: {},
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9
    },
    toggleState: 'input',
    cropIsOpen: false
  };

  changeInputUrl = e => {
    this.setState({inputLink: e.target.value});
  };

  changeOutputUrl = e => {
    this.setState({outputLink: e.target.value});
  };

  handleSubmit = async () => {
    const {inputLink, outputLink} = this.state;
    this.setState({isLoading: true});
    const response = await api.fetchReport(inputLink, outputLink);
    this.setState({results: response.data, isLoading: false});
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
    this.setState({crop});
  };

  getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

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
  };

  makeClientCrop = async crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageBlob = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      let file = new File([croppedImageBlob], 'file.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
      this.setState({croppedImageBlob, file});
    }
  };

  cropAndSend = e => {
    let card = this.createCard();
    console.log(card);
    card.then(cardId => {
      return this.createAndSendForm(this.state.croppedImageBlob, cardId);
    });
  };

  createCard = () => {
    let trello = new Trello(
      process.env.REACT_APP_TRELLO_KEY,
      process.env.REACT_APP_TRELLO_TOKEN
    );
    return trello
      .addCard(
        'Visual Defect',
        'Please fix the defect',
        '5d3b226d634ca22ceb838beb'
      )
      .then(card => {
        return card.id;
      });
  };
  // Helper function to build an XMLHttpRequest object that prints to console.log
  // when a response is received.
  createRequest = cardId => {
    var request = new XMLHttpRequest();
    request.responseType = 'json';
    request.onreadystatechange = function() {
      // When we have a response back from the server we want to share it!
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
      if (request.readyState === 4) {
        console.log(`Successfully uploaded at: ${request.response.date}`);
      }
    };
    request.open(
      'POST',
      `https://api.trello.com/1/cards/${cardId}/attachments/`
    );
    return request;
  };

  createAndSendForm = (file, cardId) => {
    let key = process.env.REACT_APP_TRELLO_KEY;
    let token = process.env.REACT_APP_TRELLO_TOKEN;
    var formData = new FormData();
    formData.append('key', key);
    formData.append('token', token);
    formData.append('file', file);
    formData.append('mimeType', 'image/jpg');
    formData.append('name', 'Defect');
    // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
    var request = this.createRequest(cardId);
    request.send(formData);
  };

  toggleState = () => {
    let nextState = this.state.toggleState === 'input' ? 'output' : 'input';
    this.setState({toggleState: nextState})
  }

  toggleCrop = () => {
    this.setState({cropIsOpen: !this.state.cropIsOpen})
  }

  render() {
    const {
      inputLink,
      outputLink,
      results,
      isLoading,
      crop,
      croppedImageBlob,
      toggleState
    } = this.state;
    return (
      <div>
          {this.state.cropIsOpen && (
        <div className="modal-wrapper">
          <div className="modal">
            <Modal 
            results={results}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              crossorigin={'anonymous'}
            />
          </div>
        </div>
                  )}
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
                placeholder="i.e. www.google.stage"
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
                style={{padding: '8px 16px'}}
              />
            </div>
            <div className="ml2 flex flex-column justify-end pv3">
              <button
                onClick={this.handleSubmit}
                className="f4 br2 bg-orange bn white"
                style={{padding: '9px 40px'}}>
                Submit
              </button>
              <button
                onClick={this.toggleCrop}>
              Crop
              </button>
            </div>
          </div>
        </div>

        <div className="bg-near-white ph4 pv4 b--light-gray">
          <div className="flex bg-white pa3 relative">
            {isLoading && <LoadingView />}
            <div className="w-100 bg-moon-gray mr2 relative" style={{ height: "600px" }}>
              {results &&
                <ViewToggle onChange={this.toggleState} checked={toggleState === 'input'} />
              }
              <img
                alt=""
                className="ba b--light-gray"
                src={
                  results
                    ? `${baseUrl}${results[toggleState]}`
                    : require("../images/google.png")
                }
                style={{ objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="w-100 bg-moon-gray ml2" style={{ height: "600px" }}>
              <img
                alt=""
                className="ba b--light-gray"
                style={{ objectFit: "cover", height: "100%" }}
                src={
                  results
                    ? `${baseUrl}${results.comparison}`
                    : require("../images/comparison.png")
                }
              />
            </div>
            <div className="w-100 bg-moon-gray ml2" style={{height: '600px'}}>

              {croppedImageBlob && (
                <div>
                  <img
                    alt="Crop"
                    style={{maxWidth: '100%'}}
                    src={croppedImageBlob}
                  />
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

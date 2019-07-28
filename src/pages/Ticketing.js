import React, {Component} from 'react';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import Trello from 'trello';
import FileSaver from 'file-saver';

class Ticketing extends Component {
  state = {
    crop: {
      unit: '%',
      width: 30,
      aspect: 16 / 9
    },
    cropIsOpen: false,
    defectTitle: '',
    defectDescription: ''
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

  changeDefectTitle = e => {
    this.setState({defectTitle: e.target.value});
  };

  changeDefectDescription = e => {
    this.setState({defectDescription: e.target.value});
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

  resetDefect = () => {
    this.setState({defectTitle: '', defectDescription: ''});
  };

  cropAndSend = e => {
    let card = this.createCard();
    card.then(cardId => {
      this.createAndSendForm(this.state.croppedImageBlob, cardId);
      this.resetDefect();
    });
  };

  downloadFile = e => {
    let file = new File([this.state.croppedImageBlob], "MatchstickCrop.jpg", {type: "image/jpeg"});
    FileSaver.saveAs(file);
  }

  createCard = () => {
    let trello = new Trello(
      process.env.REACT_APP_TRELLO_KEY,
      process.env.REACT_APP_TRELLO_TOKEN
    );
    return trello
      .addCard(
        this.state.defectTitle,
        this.state.defectDescription,
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

  render() {
    const {baseUrl, results, toggleCrop} = this.props;
    const {crop} = this.state;
    return (
      <div className="modal-wrapper">
        <div className="modal flex">
          <div className={'flex flex-column w-70'}>
            <ReactCrop
              src={`${baseUrl}${results.comparison}`}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              crossorigin={'anonymous'}
            />
          </div>
          <div className={'flex flex-column w-30'}>
            <div className={'pl2 w-80'}>
              <input
                value={this.state.defectTitle}
                onChange={this.changeDefectTitle}
                className="mb2 pv2 f4 br2 ba b--moon-gray"
                placeholder="Title"
                style={{padding: '8px 16px'}}
              />
              <textarea
                value={this.state.defectDescription}
                onChange={this.changeDefectDescription}
                className="mb2 pv2 f4 br2 ba b--moon-gray"
                placeholder="Description"
                style={{padding: '8px 16px', height: '200'}}
              />
              <div>
                <button
                  className={'f4 br2 bg-orange bn white'}
                  style={{padding: '8px 16px'}}
                  onClick={toggleCrop}>
                  Cancel
                </button>
                <button
                  className={'f4 br2 bg-orange bn white ml4'}
                  style={{padding: '8px 16px'}}
                  onClick={this.cropAndSend}>
                  Send to Trello
                </button>
                <button
                  className={'f4 br2 bg-orange bn white ml4'}
                  style={{padding: '8px 16px'}}
                  onClick={this.downloadFile}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticketing;

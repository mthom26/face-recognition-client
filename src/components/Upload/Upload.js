import React, { Component } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
// import '@uppy/drag-drop/dist/style.css';

import styles from './Upload.module.css';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.uppy = Uppy({
      id: 'uppy',
      allowMultipleUploads: false,
      debug: false
    })
      .use(XHRUpload, {
        endpoint: `${process.env.REACT_APP_SERVER_URL}/upload-test`,
        fieldName: 'image',
        method: 'post',
        headers: {
          authorization: `Bearer ${props.token}`
        }
      })
      .on('complete', result => {
        console.log(result);
        const url = `${process.env.REACT_APP_SERVER_URL}/${
          result.successful[0].response.body.imageUrl
        }`;
        const boxes = result.successful[0].response.body.data;
        this.setImageUrl(url);
        this.setBoundingBoxes(boxes);
        // uppy.reset() called to reset this uppy instance and allow more
        // uploads without refreshing
        this.uppy.reset();
      });

    this.state = {
      showImage: false,
      imageUrl: '',
      boundingBoxes: null,
      sendImageUrl: ''
    };
  }

  setImageUrl = url => {
    this.setState({ imageUrl: url, showImage: true });
  };

  setBoundingBoxes = boxes => {
    this.setState({ boundingBoxes: boxes });
  };

  onUpddateImageUrl = event => {
    const { target } = event;
    this.setState({ sendImageUrl: target.value });
  };

  onSendImageUrl = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/detect-faces`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ input: this.state.sendImageUrl }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.props.token}`
        }
      });

      const data = await result.json();
      this.setState({
        boundingBoxes: data.data,
        imageUrl: this.state.sendImageUrl,
        showImage: true
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { showImage, imageUrl, sendImageUrl } = this.state;

    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <DragDrop uppy={this.uppy} />
            <button onClick={() => this.uppy.upload()}>Upload!</button>
          </div>
          <div className={styles.innerContainer}>
            <input
              onChange={this.onUpddateImageUrl}
              value={sendImageUrl}
              placeholder="Copy your image url here!"
              type="text"
              name="imageUrl"
              id="imageUrl"
            />
            <button onClick={this.onSendImageUrl}>Send Image!</button>
          </div>
        </div>
        {showImage && (
          <div className={styles.imageContainer}>
            <img src={`${imageUrl}`} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default Upload;

import React, { Component } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
// import '@uppy/drag-drop/dist/style.css';

import styles from './Upload.module.css';
import ImageContainer from '../ImageContainer/ImageContainer';

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
        this.setState({
          imageUrl: url,
          showImage: true,
          boundingBoxes: boxes
        });
        // uppy.reset() called to reset this uppy instance and allow more
        // uploads without refreshing
        this.uppy.reset();
      });

    this.state = {
      showImage: false,
      imageUrl: '',
      boundingBoxes: null,
      sendImageUrl: '',
      error: ''
    };
  }

  onUpddateImageUrl = event => {
    const { target } = event;
    this.setState({ sendImageUrl: target.value });
  };

  onUploadFiles = () => {
    if (this.uppy.getFiles().length === 0) {
      console.log('You have not selected a file to upload');
      this.setState({ error: 'You have not selected a file to upload' });
      return;
    }
    this.uppy.upload();
  };

  onSendImageUrl = async () => {
    try {
      if (this.state.sendImageUrl === '') {
        console.log('Image Input is empty!');
        this.setState({ error: 'Image Input is empty!' });
        return;
      }
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
      console.log(data);
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
    const {
      showImage,
      imageUrl,
      sendImageUrl,
      error,
      boundingBoxes
    } = this.state;

    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <DragDrop uppy={this.uppy} />
            <button onClick={this.onUploadFiles}>Upload!</button>
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
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}
        {showImage && (
          <ImageContainer imageUrl={imageUrl} boundingBoxes={boundingBoxes} />
        )}
      </div>
    );
  }
}

export default Upload;

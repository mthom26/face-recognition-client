import React, { Component } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import '@uppy/drag-drop/dist/style.css';

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
        const url = result.successful[0].response.body.imageUrl;
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
      boundingBoxes: null
    };
  }

  setImageUrl = url => {
    this.setState({ imageUrl: url, showImage: true });
  };

  setBoundingBoxes = boxes => {
    this.setState({ boundingBoxes: boxes });
  };

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { showImage, imageUrl } = this.state;

    return (
      <div>
        <DragDrop uppy={this.uppy} />
        <button onClick={() => this.uppy.upload()}>Upload!</button>
        {showImage && (
          <div className={styles.imageContainer}>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl}`}
              alt=""
            />
          </div>
        )}
      </div>
    );
  }
}

export default Upload;

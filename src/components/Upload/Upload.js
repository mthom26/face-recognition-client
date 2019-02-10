import React, { Component } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import '@uppy/drag-drop/dist/style.css';

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
      });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <div>
        <DragDrop uppy={this.uppy} />
        <button onClick={() => this.uppy.upload()}>Upload!</button>
      </div>
    );
  }
}

export default Upload;

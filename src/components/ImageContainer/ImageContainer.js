import React from 'react';

import styles from './ImageContainer.module.css';

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBoxes: false,
      boxLocations: null,
      width: 0,
      height: 0
    };

    this.imageRef = React.createRef();
  }

  setBoxLocations = () => {
    const img = this.imageRef.current;
    const width = img.width;
    const height = img.height;
    const boxLocations = this.props.boundingBoxes.map(box => ({
      top: box.top_row * height,
      left: box.left_col * width,
      width: box.right_col * width - box.left_col * width,
      height: box.bottom_row * height - box.top_row * height
    }));
    this.setState({
      width,
      height,
      boxLocations,
      showBoxes: true
    });
  };

  componentDidMount() {
    const img = this.imageRef.current;
    img.addEventListener('load', this.setBoxLocations);
  }

  componentWillUnmount() {
    const img = this.imageRef.current;
    img.removeEventListener('load', this.setBoxLocations);
  }

  render() {
    const { imageUrl } = this.props;
    const { boxLocations, showBoxes } = this.state;

    return (
      <div id="imageContainer" className={styles.imageContainer}>
        <img ref={this.imageRef} src={`${imageUrl}`} alt="" />
        {showBoxes &&
          boxLocations.map(box => (
            <div
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height
              }}
              className={styles.box}
            />
          ))}
      </div>
    );
  }
}

export default ImageContainer;

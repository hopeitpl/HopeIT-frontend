import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Typography } from 'material-ui';

import './image.scss';

export class ImageField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };
  }

  onImageUpload = (picture) => {
    const { input } = this.props;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      input.onChange(reader.result.split(',')[1]);
    });

    reader.readAsDataURL(picture[0]);

    this.setState({
      image: picture[0]
    });
  }

  render () {
    const { input } = this.props;
    const { image } = this.state;
    return (
      <div>
        <Dropzone className="image-dropzone-container" onDrop={this.onImageUpload}>
          <div className="image-dropzone">
            {!image ?
              <Typography type="display1">Dodaj zdjęcie</Typography> :
              <img src={image.preview} />
            }
          </div>
        </Dropzone>
        <input type="hidden" name={input.name} value={input.value} />
      </div>
    );
  }
}

ImageField.propTypes = {
  input: PropTypes.object
};

export default ImageField;

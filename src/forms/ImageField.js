import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from './ImageUploader';

const onImageUpload = (onChange, picture) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    onChange(reader.result);
  });

  reader.readAsDataURL(picture[0]);
};

export const ImageField = ({ input }) => {
  return (
    <div>
      <ImageUploader onChange={onImageUpload.bind(null, input.onChange)} />
      <input type="hidden" name={input.name} value={input.value} />
    </div>
  );
};

ImageField.propTypes = {
  input: PropTypes.object
};

export default ImageField;

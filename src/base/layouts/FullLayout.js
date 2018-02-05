import React from 'react';
import PropTypes from 'prop-types';

export const FullLayout = ({ children }) => {
  return (
    <div className="base-layout">
      <div>
        {children}
      </div>
    </div>
  );
};

FullLayout.propTypes = {
  children: PropTypes.any
};

export default FullLayout;

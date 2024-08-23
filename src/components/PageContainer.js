import React from 'react';
import {
    containerStyle,
} from '../style/styles.js';

const PageContainer = ({ children }) => {

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default PageContainer;

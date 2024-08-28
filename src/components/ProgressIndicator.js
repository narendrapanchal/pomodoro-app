import React from 'react';
import '../style/ProgressIndicator.css';

const ProgressIndicator = ({ progress }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${progress}%` }} />
  </div>
);

export default ProgressIndicator;
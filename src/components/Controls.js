import React from 'react';
import '../style/Controls.css';

const Controls = ({ isRunning, startStopTimer, resetTimer }) => (
  <div className="controls">
    <button className="button" onClick={startStopTimer}>
      {isRunning ? 'Stop' : 'Start'}
    </button>
    <button className="button" onClick={resetTimer}>Reset</button>
  </div>
);

export default Controls;
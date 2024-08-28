import React from 'react';
import '../style/TimerDisplay.css';

const TimerDisplay = ({ minutes, seconds }) => {
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="timer-display">
      {formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

export default TimerDisplay;
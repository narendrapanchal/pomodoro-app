import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import Controls from './Controls';
import ProgressIndicator from './ProgressIndicator';
import '../style/Pomodoro.css';

const Pomodoro = () => {
  const [workDuration, setWorkDuration] = useState(25); // Work duration in minutes
  const [breakDuration, setBreakDuration] = useState(5); // Break duration in minutes
  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [progress, setProgress] = useState(0);

  const totalSeconds = isWorkSession ? workDuration * 60 : breakDuration * 60;
  const remainingSeconds = minutes * 60 + seconds;

  useEffect(() => {
    let interval = null;
    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            resetTimer();
          }
        } else {
          setSeconds(seconds - 1);
        }
        setProgress(((totalSeconds - remainingSeconds) / totalSeconds) * 100);
      }, 1000);
    } else if (remainingSeconds === 0 && isRunning) {
      setIsWorkSession(!isWorkSession);
      setMinutes(isWorkSession ? breakDuration : workDuration);
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startStopTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(isWorkSession ? workDuration : breakDuration);
    setSeconds(0);
    setProgress(0);
  };

  return (
    <div className="pomodoro">
      <label className="input-label">
        Work Duration:
        <input
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(Number(e.target.value))}
          min="1"
        /> minutes
      </label>
      <label className="input-label">
        Break Duration:
        <input
          type="number"
          value={breakDuration}
          onChange={(e) => setBreakDuration(Number(e.target.value))}
          min="1"
        /> minutes
      </label>
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <ProgressIndicator progress={progress} />
      <Controls isRunning={isRunning} startStopTimer={startStopTimer} resetTimer={resetTimer} />
    </div>
  );
};

export default Pomodoro;

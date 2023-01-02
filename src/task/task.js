import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect, useRef } from 'react';

import './task.css';

const Task = ({
  date,
  label,
  ms,
  checked,
  isTimer,
  deleteItem,
  onChecked,
  onEditing,
  timerToggle,
  editTask,
  tick,
  id,
}) => {
  const [taskName, setTaskName] = useState(label);
  const timerID = useRef();

  const timerPlay = () => {
    clearInterval(timerID.current);

    if (!isTimer) {
      timerToggle();
    }

    timerID.current = setInterval(() => tick(), 400);
  };

  const timerPause = () => {
    clearInterval(timerID.current);

    if (isTimer) {
      timerToggle();
    }
  };

  const onLabelChange = (e) => {
    setTaskName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTask(id, taskName);
    onEditing();
  };

  useEffect(() => {
    if (isTimer) {
      timerID.current = setInterval(() => tick(), 400);
    }
    return () => clearInterval(timerID.current);
  }, []);

  let min = Math.floor((ms / 60000) % 60);
  let secDisplay = Math.floor((ms / 1000) % 60);
  if (String(secDisplay).length === 1) {
    secDisplay = '0' + secDisplay;
  }
  if (String(min).length === 1) {
    min = '0' + min;
  }

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onChecked} checked={!!checked} />
        <label>
          <span className="title" onClick={onChecked}>
            {taskName}
          </span>
          <span className="description">
            <button onClick={() => timerPlay()} className="icon icon-play"></button>
            <button onClick={() => timerPause()} className="icon icon-pause"></button>
            <span className="timer">{`${min}: ${secDisplay} `}</span>
          </span>
          <span className="description">
            `created {formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}`
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEditing} />
        <button type="button" className="icon icon-destroy" onClick={deleteItem} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" value={taskName} onChange={onLabelChange} />
      </form>
    </>
  );
};

export default Task;

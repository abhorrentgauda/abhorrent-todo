import { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const labelChange = (e) => {
    setLabel(e.target.value);
  };

  const minChange = (e) => {
    setMin(e.target.value);
  };

  const secChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          name="label"
          type="text"
          autoFocus={true}
          onChange={labelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="min"
          type="number"
          max="59"
          onChange={minChange}
          value={min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="sec"
          type="number"
          max="59"
          onChange={secChange}
          value={sec}
        />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    </header>
  );
};

export default NewTaskForm;

import './task-list.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

export default class TaskList extends Component {
  static defaultProps = {
    deleteItem: () => {},
    onChecked: () => {},
    onEditing: () => {},
    editTask: () => {},
  };

  static propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteItem: PropTypes.func,
    onChecked: PropTypes.func,
  };

  render() {
    const { todoList, deleteItem, onChecked, onEditing, editTask, tick, timerToggle } = this.props;

    const tasks = todoList.map((task) => {
      const { id, checked, date, editing, ms, isTimer, ...params } = task;
      let classNames = 'task-item';
      if (checked) classNames += ' completed';
      if (editing) classNames = 'task-item editing';

      return (
        <li key={id} className={classNames}>
          <Task
            date={date}
            ms={ms}
            {...params}
            checked={checked}
            id={id}
            isTimer={isTimer}
            deleteItem={() => deleteItem(id)}
            onChecked={() => onChecked(id)}
            onEditing={() => onEditing(id)}
            timerToggle={() => timerToggle(id, 'isTimer', 'startTime')}
            editTask={editTask}
            tick={() => tick(id, 'ms', 'startTime')}
          />
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

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
    const { todoList, deleteItem, onChecked, onEditing, editTask, tick } = this.props;

    const tasks = todoList.map((task) => {
      const { id, checked, date, editing, sec, ...params } = task;
      let classNames = 'task-item';
      if (checked) classNames += ' completed';
      if (editing) classNames = 'task-item editing';

      return (
        <li key={id} className={classNames}>
          <Task
            date={date}
            sec={sec}
            {...params}
            checked={checked}
            id={id}
            deleteItem={() => deleteItem(id)}
            onChecked={() => onChecked(id)}
            onEditing={() => onEditing(id)}
            editTask={editTask}
            tick={() => tick(id, 'sec')}
          />
        </li>
      );
    });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

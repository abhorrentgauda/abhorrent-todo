import { Component } from "react";
import TasksFilter from "../tasks-filter";
import PropTypes from 'prop-types';

import "./footer.css";

export default class Footer extends Component {

  static defaultProps = {
    onFilterChange: () => {},
    deleteCompletedTasks: () => {}
  }

  static propTypes = {
    onFilterChange: PropTypes.func,
    deleteCompletedTasks: PropTypes.func,
    filter: PropTypes.string.isRequired,
    todoCounter: PropTypes.number.isRequired
  }

  render() {

    const {todoCounter, filter, onFilterChange, deleteCompletedTasks} = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todoCounter} items left</span>
        <TasksFilter filter={filter}
        onFilterChange={onFilterChange}/>
        <button className="clear-completed" 
        onClick={() => deleteCompletedTasks()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
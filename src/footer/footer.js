import TasksFilter from '../tasks-filter';

import './footer.css';

const Footer = ({ todoCounter, filter, onFilterChange, deleteCompletedTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCounter} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => deleteCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

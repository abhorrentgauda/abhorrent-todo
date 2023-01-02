import './tasks-filter.css';

const TasksFilter = ({ filter, onFilterChange }) => {
  const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = `button ${isActive ? 'selected' : ''}`;

    return (
      <li key={name}>
        <form className={classNames}>
          <input type="radio" onClick={() => onFilterChange(name)}></input>
          <label>{label}</label>
        </form>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

export default TasksFilter;

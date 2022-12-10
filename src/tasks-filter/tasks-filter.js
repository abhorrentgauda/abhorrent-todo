import { Component } from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  state = {
    filterButtons: [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'done', label: 'Completed' },
    ],
  };

  static propTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onFilterChange: () => {},
  };

  render() {
    const { filter, onFilterChange } = this.props;
    const { filterButtons } = this.state;

    const buttons = filterButtons.map(({ name, label }) => {
      const isActive = name === filter;
      const classNames = `button ${isActive ? 'selected' : ''}`;

      return (
        <li key={name}>
          <button type="button" onClick={() => onFilterChange(name)} className={classNames}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

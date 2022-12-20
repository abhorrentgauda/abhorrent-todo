import { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label, min, sec } = this.state;
    e.preventDefault();
    this.props.addTask(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            name="label"
            type="text"
            autoFocus={true}
            onChange={this.handleChange}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            name="min"
            type="number"
            max="59"
            onChange={this.handleChange}
            value={this.state.min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            name="sec"
            type="number"
            max="59"
            onChange={this.handleChange}
            value={this.state.sec}
          />
          <input className="new-todo-form__submit" type="submit" />
        </form>
      </header>
    );
  }
}

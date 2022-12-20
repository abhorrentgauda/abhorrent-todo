import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';
import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  state = {
    label: this.props.label,
    sec: this.props.sec,
    timer: null,
  };

  static defaultProps = {
    deleteItem: () => {},
    onChecked: () => {},
  };

  static propTypes = {
    deleteItem: PropTypes.func,
    onChecked: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  };

  timer = () => {
    this.props.tick();
  };

  timerPlay = () => {
    clearInterval(localStorage.getItem(this.props.id));
    localStorage.removeItem(this.props.id);

    this.timerID = setInterval(() => this.timer(), 1000);
    localStorage.setItem(this.props.id, this.timerID);
  };

  timerPause = () => {
    clearInterval(localStorage.getItem(this.props.id));
    localStorage.removeItem(this.props.id);
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.label);
    this.props.onEditing();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.sec !== this.props.sec) {
      this.setState({
        sec: this.props.sec,
      });
    }
  }

  render() {
    const { label, deleteItem, onChecked, checked, date, onEditing } = this.props;
    const { sec } = this.state;
    let min = Math.floor(sec / 60);
    let secDisplay = sec % 60;
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
              {label}
            </span>
            <span className="description">
              <button onClick={() => this.timerPlay()} className="icon icon-play"></button>
              <button onClick={() => this.timerPause()} className="icon icon-pause"></button>
              <span className="timer">{`${min}: ${secDisplay} `}</span>
            </span>
            <span className="description">
              `created {formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}`
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditing} />
          <button type="button" className="icon icon-destroy" onClick={deleteItem} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={this.state.label} onChange={this.onLabelChange} />
        </form>
      </>
    );
  }
}

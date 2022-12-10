import {formatDistanceToNow} from "date-fns";
import { Component } from "react";
import PropTypes from 'prop-types';

import "./task.css";

export default class Task extends Component {

  state = {
    // date: this.props.date,
    label: this.props.label
  }

  static defaultProps = {
    deleteItem: () => {},
    onChecked: () => {},
    editTask: () => {}
  }

  static propTypes = {
    deleteItem: PropTypes.func,
    onChecked: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    id: PropTypes.number
  }

  // tick = () => {
  //   this.setState({
  //     date: this.state.date
  //   });
  // }

  // componentDidMount = () => {
  //   this.timerID = setInterval(() => this.tick(), 1000);
  // }

  // componentWillUnmount = () => {
  //   clearInterval(this.timerID);
  // }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.label);
    this.props.onEditing();
  }

  render() {

    const {label, deleteItem, onChecked, checked, date, onEditing} = this.props;

    return (
      <div>
        <div className="view">
          <input className="toggle" type="checkbox" 
          onChange={onChecked}
          checked={checked ? true : false}
          />
          <label>
            <span className="description" onClick={onChecked}>{label}</span>
            <span className="created">`created {formatDistanceToNow(date, {includeSeconds: true, addSuffix: true})}`</span>
          </label>
          <button className="icon icon-edit"
          onClick={onEditing}/>
          <button className="icon icon-destroy"
          onClick={deleteItem}/>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={this.state.label}
          onChange={this.onLabelChange}/>
        </form>
      </div>
    );
  }
}
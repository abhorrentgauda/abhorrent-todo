import './app.css';

import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
  maxId = 100;

  state = {
    todoList: [this.createItem('drink coffee'), this.createItem('eat samsa'), this.createItem('work hard')],
    filter: 'all',
  };

  createItem(label) {
    return {
      label,
      id: this.maxId++,
      checked: false,
      editing: false,
      date: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((task) => task.id === id);

      return {
        todoList: [...todoList.slice(0, idx), ...todoList.slice(idx + 1)],
      };
    });
  };

  editTask = (id, text) => {
    this.setState(({ todoList }) => {
      const idx = todoList.findIndex((task) => task.id === id);
      const editedTask = { ...todoList[idx], label: text };
      return {
        todoList: [...todoList.slice(0, idx), editedTask, ...todoList.slice(idx + 1)],
      };
    });
  };

  deleteCompletedTasks = () => {
    this.setState(({ todoList }) => {
      const activeTasks = todoList.filter((element) => !element.checked);

      return {
        todoList: activeTasks,
      };
    });
  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'done') {
      return items.filter((item) => item.checked);
    }
    if (filter === 'active') {
      return items.filter((item) => !item.checked);
    }
  }

  addNewTask = (text) => {
    const newTask = this.createItem(text);

    this.setState(({ todoList }) => ({
      todoList: [...todoList, newTask],
    }));
  };

  toggleProperty(array, id, property) {
    const idx = array.findIndex((el) => el.id === id);

    const copyItem = array[idx];
    const newItem = { ...copyItem, [property]: !copyItem[property] };

    return [...array.slice(0, idx), newItem, ...array.slice(idx + 1)];
  }

  onChecked = (id) => {
    this.setState(({ todoList }) => ({
      todoList: this.toggleProperty(todoList, id, 'checked'),
    }));
  };

  onEditing = (id) => {
    this.setState(({ todoList }) => ({
      todoList: this.toggleProperty(todoList, id, 'editing'),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoList, filter } = this.state;

    const todoCounter = todoList.filter((element) => !element.checked).length;

    const visibleTasks = this.filterItems(todoList, filter);

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addNewTask} />
        <section className="main">
          <TaskList
            todoList={visibleTasks}
            deleteItem={this.deleteItem}
            onChecked={this.onChecked}
            onEditing={this.onEditing}
            editTask={this.editTask}
          />
          <Footer
            todoCounter={todoCounter}
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteCompletedTasks={this.deleteCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

import './app.css';

import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
  maxId = 100;

  state = {
    todoList: [
      this.createItem('drink coffee', '1', '30'),
      this.createItem('eat samsa', '1', '30'),
      this.createItem('work hard', '1', '30'),
    ],
    filter: 'all',
  };

  createItem(label, min, sec) {
    return {
      label,
      id: this.maxId++,
      checked: false,
      editing: false,
      date: new Date(),
      sec: +min * 60 + +sec,
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

  addNewTask = (text, min, sec) => {
    const newTask = this.createItem(text, min, sec);

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

  tick = (id, sec) => {
    const copyTodoList = [...this.state.todoList];

    const idx = copyTodoList.findIndex((el) => el.id === id);

    const copyItem = this.state.todoList[idx];
    if (copyItem[sec] !== 0) {
      const newItem = { ...copyItem, [sec]: --copyItem[sec] };

      this.setState(({ todoList }) => ({
        todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)],
      }));
    }
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
            tick={this.tick}
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

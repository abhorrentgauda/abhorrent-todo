import './app.css';

import { useState } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

const App = () => {
  let maxId = 100;

  const createItem = (label, min, sec) => {
    return {
      label,
      id: maxId++,
      checked: false,
      editing: false,
      isTimer: false,
      date: new Date(),
      startTime: null,
      ms: (+min * 60 + +sec) * 1000,
    };
  };

  const [todoList, setTodoList] = useState([
    createItem('drink coffee', '1', '30'),
    createItem('eat samsa', '1', '30'),
    createItem('work hard', '1', '30'),
  ]);

  const [currentFilter, setCurrentFilter] = useState('all');

  const deleteItem = (id) => {
    const idx = todoList.findIndex((task) => task.id === id);

    setTodoList([...todoList.slice(0, idx), ...todoList.slice(idx + 1)]);
  };

  const editTask = (id, text) => {
    const idx = todoList.findIndex((task) => task.id === id);
    const editedTask = { ...todoList[idx], label: text };

    setTodoList([...todoList.slice(0, idx), editedTask, ...todoList.slice(idx + 1)]);
  };

  const deleteCompletedTasks = () => {
    const activeTasks = todoList.filter((element) => !element.checked);

    setTodoList(activeTasks);
  };

  const filterItems = (items, filter) => {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'done') {
      return items.filter((item) => item.checked);
    }
    if (filter === 'active') {
      return items.filter((item) => !item.checked);
    }
  };

  const addNewTask = (text, min, sec) => {
    const newTask = createItem(text, min, sec);

    setTodoList([...todoList, newTask]);
  };

  const toggleProperty = (array, id, property) => {
    const idx = array.findIndex((el) => el.id === id);

    const copyItem = array[idx];
    const newItem = { ...copyItem, [property]: !copyItem[property] };

    return [...array.slice(0, idx), newItem, ...array.slice(idx + 1)];
  };

  const onChecked = (id) => {
    setTodoList(toggleProperty(todoList, id, 'checked'));
  };

  const onEditing = (id) => {
    setTodoList(toggleProperty(todoList, id, 'editing'));
  };

  const onFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const timerToggle = (id, isTimer, startTime) => {
    const copyTodoList = [...todoList];
    const idx = copyTodoList.findIndex((el) => el.id === id);
    const copyItem = todoList[idx];

    let newItem;
    if (copyItem[isTimer]) {
      newItem = { ...copyItem, [isTimer]: !copyItem[isTimer], [startTime]: null };
    } else if (!copyItem[isTimer]) {
      newItem = { ...copyItem, [isTimer]: !copyItem[isTimer], [startTime]: Date.now() };
    }

    setTodoList((todoList) => [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)]);
  };

  const tick = (id, ms, startTime, isTimer) => {
    const copyTodoList = [...todoList];
    const idx = copyTodoList.findIndex((el) => el.id === id);
    const copyItem = todoList[idx];
    const diff = Date.now() - copyItem[startTime];

    let newItem;
    if (copyItem[ms] > 0) {
      newItem = { ...copyItem, [ms]: copyItem[ms] - diff, [startTime]: Date.now() };
    } else {
      newItem = { ...copyItem, [ms]: 0, [startTime]: null, [isTimer]: false };
    }

    setTodoList((todoList) => [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)]);
  };

  const todoCounter = todoList.filter((element) => !element.checked).length;

  const visibleTasks = filterItems(todoList, currentFilter);

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addNewTask} />
      <section className="main">
        <TaskList
          todoList={visibleTasks}
          deleteItem={deleteItem}
          onChecked={onChecked}
          onEditing={onEditing}
          editTask={editTask}
          timerToggle={timerToggle}
          tick={tick}
        />
        <Footer
          todoCounter={todoCounter}
          filter={currentFilter}
          onFilterChange={onFilterChange}
          deleteCompletedTasks={deleteCompletedTasks}
        />
      </section>
    </section>
  );
};

export default App;

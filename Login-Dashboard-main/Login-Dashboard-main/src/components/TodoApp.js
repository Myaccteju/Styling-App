import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput.trim(), completed: false, dueDate }]);
      setTaskInput('');
      setDueDate('');
    }
  };

  const [showSnackbar, setShowSnackbar] = useState(false);

  const deleteTask = (index) => {
    setRecentlyDeleted({ task: tasks[index], index });
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setShowSnackbar(true);
  };

  setTimeout(() => {
    setShowSnackbar(false);
  }, 4000);
  
  const undoDelete = () => {
    if (recentlyDeleted) {
      const newTasks = [...tasks];
      newTasks.splice(recentlyDeleted.index, 0, recentlyDeleted.task);
      setTasks(newTasks);
      setRecentlyDeleted(null);
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTaskInput(tasks[index].text);
    setDueDate(tasks[index].dueDate);
    deleteTask(index);
  };

  const filteredTasks = tasks.filter(task => {
    const textMatch = task.text.toLowerCase().includes(search.toLowerCase());
    const taskDate = new Date(task.dueDate);
    const today = new Date().toDateString();

    if (filter === 'completed') return task.completed && textMatch;
    if (filter === 'pending') return !task.completed && textMatch;
    if (filter === 'today') return taskDate.toDateString() === today && textMatch;
    return textMatch;
  });

  const completed = tasks.filter(task => task.completed).length;
  const progress = tasks.length ? (completed / tasks.length) * 100 : 0;

  useEffect(() => {
    if (tasks.length && completed === tasks.length) {
      confetti();
    }
  }, [completed, tasks.length]);

  return (
    <div className="container">
      <div className="stats-container">
        <div className="details">
          <h1>Todo Board</h1>
          <p> Keep it up!</p>
          
          <div className="progress-section">
            <div id="progressBar">
              <div id="progress" style={{ width: `${progress}%` }}></div>
            </div>
           <div id="numbers">{completed} / {tasks.length}</div>
        </div>
        </div>
      </div>

      {showSnackbar && (
        <div id="snackbar" className="show">
          Task deleted. <button onClick={undoDelete}>Undo</button>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Write your task"
          required
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="today">Today</option>
        </select>
        <button id="newTask" onClick={addTask}>+</button>
      </form>

      <ul id="task-list" className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <div className="taskItem">
              <div className={`task ${task.completed ? 'completed' : ''} ${task.dueDate && new Date(task.dueDate) < new Date() && !task.completed ? 'overdue' : ''}`}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <p>{task.text}</p>
                {task.dueDate && (
                  <span className="due-date">{new Date(task.dueDate).toLocaleString()}</span>
                )}
              </div>
              <div className="icons">
                <img src="./edit.png" alt="edit" onClick={() => editTask(index)} />
                <img src="./bin.png" alt="delete" onClick={() => deleteTask(index)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

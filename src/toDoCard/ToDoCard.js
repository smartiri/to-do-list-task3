import React, { useState } from "react";
import "../toDoCard/ToDoCard.css";
import ToDoList from "../toDoList/ToDoList";

let nextId = 1;
export default function ToDoCard() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const handleClick = () => {
    if (!newTask.trim()) return;

    setTodos([...todos, { id: nextId++, title: newTask }]);
    setNewTask("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setNewTask(todo.title);
    setCurrentTodo(todo);
  };

  const handleUpdateTodo = () => {
    if (!newTask.trim()) return;
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? { ...todo, title: newTask } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setNewTask("");
    setCurrentTodo(null);
  };
  return (
    <div className="card">
      <div className="title">To Do List</div>
      <div className="body">
        <input
          type="text"
          className="input"
          placeholder="enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="button"
          style={{ marginLeft: "-22%" }}
          onClick={isEditing ? handleUpdateTodo : handleClick}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      {todos.map((todo) => (
        <ToDoList
          key={todo.id}
          toDo={todo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </div>
  );
}

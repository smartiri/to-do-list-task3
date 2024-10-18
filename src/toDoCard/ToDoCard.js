import React, { useState, useMemo } from "react";
import "../toDoCard/ToDoCard.css";
import ToDoList from "../toDoList/ToDoList";
import useTodoApi from "../toDoList/service";

export default function ToDoCard() {
  const { todos, addTodo, toggleComplete, editTodo, deleteTodo } = useTodoApi();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [view, setView] = useState(0);
  const [filterTodo, setFilterTodo] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description cannot be empty");
      return;
    }
    const newTask = {
      title,
      description,
      completed: false,
    };
    addTodo(newTask);
    setTitle("");
    setDescription("");
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    const newTask = {
      id,
      title,
      description,
    };
    editTodo(newTask);
    setIsEditing(false);
    setTitle("");
    setDescription("");
  };

  const toggleEditTodo = (todo) => {
    setIsEditing(true);
    setId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleClick = (filter) => {
    setFilterTodo(filter);
  };

  const filteredTodos = useMemo(() => {
    if (filterTodo === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    if (filterTodo === "pending") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  }, [todos, filterTodo]);
  return (
    <div className="card">
      <div className="title">To Do List</div>
      <div className="body">
        <input
          type="text"
          className="input"
          placeholder="enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="button"
          onClick={(e) => (isEditing ? handleEditTask(e) : handleAddTask(e))}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
        <hr />
        <div
          style={{
            gap: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={() => handleClick("all")}>All</button>
          <button onClick={() => handleClick("completed")}>Completed</button>
          <button onClick={() => handleClick("pending")}>Pending</button>
        </div>
      </div>

      {filteredTodos.map((todo) => (
        <ToDoList
          key={todo.id}
          toDo={todo}
          view={view}
          toggleView={() => setView(todo.id)}
          complete={() => toggleComplete(todo)}
          close={() => setView(0)}
          edit={() => toggleEditTodo(todo)}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

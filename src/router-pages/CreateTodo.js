import React, { useState } from "react";
import useTodoApi from "../toDoList/service";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {
  // const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTodo } = useTodoApi();
  const navigate = useNavigate();
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
    navigate("/", {
      state: { data: newTask },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        gap: "20%",
        background: "white",
        padding: "4%",
      }}
    >
      <h5>Create Todo</h5>
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
      <button type="button" onClick={(e) => handleAddTask(e)}>
        Add Task
      </button>
    </div>
  );
}

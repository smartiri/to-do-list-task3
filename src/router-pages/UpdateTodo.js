import React, { useEffect, useState } from "react";
import useTodoApi from "../toDoList/service";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateTodo() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { editTodo } = useTodoApi();
  const navigate = useNavigate();
  const location = useLocation();
  const handleEditTask = (e) => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Title and description cannot be empty");
      return;
    }
    e.preventDefault();
    const newTask = {
      id,
      title,
      description,
    };
    editTodo(newTask);
    navigate("/", { state: newTask });
    setTitle("");
    setDescription("");
  };

  const fetchTasks = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/todos/" + id);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    if (location.state) {
      setId(location.state.id);
      fetchTasks(location.state.id);
    }
  }, [location]);
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
      <h5>Update Todo</h5>
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
      <button type="button" onClick={(e) => handleEditTask(e)}>
        Update Task
      </button>
    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import "../toDoCard/ToDoCard.css";
import ToDoList from "../toDoList/ToDoList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useTodoApi from "../toDoList/service";
export default function ToDoCard() {
  const [view, setView] = useState(0);
  const navigate = useNavigate();
  const { todos, fetchTasks, toggleComplete, deleteTodo } = useTodoApi();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("todo");

  useEffect(() => {
    if (location.state) {
      fetchTasks();
    }
  }, [fetchTasks]);

  const handleClick = (filter) => {
    setSearchParams({ todo: filter });
  };

  const handleCreate = () => {
    navigate("/todo");
  };

  const filteredTodos = useMemo(() => {
    if (queryParam) {
      if (queryParam === "completed") {
        return todos.filter((todo) => todo.completed);
      }
      if (queryParam === "pending") {
        return todos.filter((todo) => !todo.completed);
      }
    }
    return todos;
  }, [todos, searchParams]);
  // console.log("i am rendering");
  return (
    <div className="card">
      <div className="title">To Do List</div>
      <div className="body">
        <div>
          <button style={{ float: "right" }} onClick={handleCreate}>
            Create ToDo
          </button>
        </div>

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
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

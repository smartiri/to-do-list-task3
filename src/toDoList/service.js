import { useReducer, useEffect } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload];
    case "EDIT_TODO":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            }
          : task
      );
    case "DELETE_TODO":
      return state.filter((task) => task.id !== action.payload);
    case "COMPLETE_TODO":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
}

function useTodoApi() {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos");
        dispatch({ type: "SET_TODOS", payload: response.data });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTodo = async (task) => {
    try {
      const response = await axios.post("http://localhost:8080/todos", task);
      dispatch({ type: "ADD_TODO", payload: response.data });
    } catch (error) {
      console.error("Error while adding task:", error);
    }
  };

  const editTodo = async (task) => {
    try {
      console.log(task);
      const response = await axios.patch(
        "http://localhost:8080/todos/" + String(task.id),
        task
      );
      dispatch({ type: "EDIT_TODO", payload: response.data });
    } catch (error) {
      console.error("Error while updating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete("http://localhost:8080/todos/" + id);
      dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.patch("http://localhost:8080/todos/" + String(task.id), {
        ...task,
        completed: !task.completed,
      });
      dispatch({ type: "COMPLETE_TODO", payload: task.id });
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return { todos, addTodo, toggleComplete, editTodo, deleteTodo };
}

export default useTodoApi;

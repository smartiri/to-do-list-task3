import "../toDoList/ToDoList.css";
import React from "react";
const ToDoList = React.memo(
  ({ toDo, edit, onDelete, view, toggleView, close, complete }) => {
    return (
      <div className="table-order">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2%",
            paddingTop: "3%",
          }}
        >
          <input
            type="checkbox"
            onChange={complete}
            checked={toDo.completed ? "checked" : ""}
          />
          <div
            style={{ textDecoration: toDo.completed ? "line-through" : "none" }}
          >
            <h5 style={{ marginTop: "0.6rem" }}>{toDo.title}</h5>
          </div>
          <button className="view" onClick={toggleView}>
            View
          </button>
          {!toDo.completed && (
            <button className="edit" onClick={edit}>
              Edit
            </button>
          )}

          <button className="delete" onClick={onDelete}>
            Delete -
          </button>
        </div>
        {view === toDo.id && (
          <div className="view_more">
            <div>
              <span class="close" onClick={close}>
                &times;
              </span>
              <h5 style={{ marginTop: "0.6rem", color: "#7b4397" }}>
                {toDo.title}
              </h5>
            </div>
            <hr />
            <p style={{ wordBreak: "break-all", padding: "2%" }}>
              {toDo.description}
            </p>
            <p>
              Status:
              <span
                style={{
                  marginTop: "0.6rem",
                  color: toDo.completed ? "green" : "orange",
                }}
              >
                {toDo.completed ? "Complete" : "Pending"}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default ToDoList;

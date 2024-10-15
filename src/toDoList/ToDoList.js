import "../toDoList/ToDoList.css";
export default function ToDoList({ toDo, onEdit, onDelete }) {
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
        <h5>
          <span>{toDo.id}. </span>
          {toDo.title}
        </h5>
        <button className="edit" onClick={() => onEdit(toDo)}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(toDo.id)}>
          Delete -
        </button>
      </div>
    </div>
  );
}

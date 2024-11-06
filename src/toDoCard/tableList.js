import { DataGrid } from "@mui/x-data-grid";
import "../toDoCard/ToDoCard.css";
import useFetchData from "../api-fetch/useFetchData";
import { useRef } from "react";
export default function TableList() {
  const { data, loading, fetchData } = useFetchData();
  const searchTitleRef = useRef(null);
  const limitRef = useRef(null);
  const handleSearch = () => {
    limitRef.current.value
      ? fetchData(searchTitleRef.current.value, limitRef.current.value)
      : fetchData(searchTitleRef.current.value);
  };
  const columns = [
    { field: "cover_edition_key", headerName: "Edition Key", width: 150 },
    { field: "author_name", headerName: "Author", width: 200 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "publisher", headerName: "Publisher", width: 200 },
  ];

  return (
    <div className="card">
      <div className="title">Little Library</div>
      <br />
      <div style={{ display: "flex" }}>
        <input
          ref={searchTitleRef}
          type="text"
          placeholder="Search"
          className="input"
          defaultValue={null}
        />
        <input
          ref={limitRef}
          type="number"
          placeholder="Limit"
          className="input"
          defaultValue={null}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="body">
        <div
          style={{
            gap: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              loading={loading}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
}

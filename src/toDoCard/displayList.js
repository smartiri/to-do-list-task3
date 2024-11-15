import { DataGrid } from "@mui/x-data-grid";
import { memo } from "react";
const DisplayList = memo(function DisplayList({ data, columns, loading }) {
  return (
    <div>
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
          />
        </div>
      </div>
    </div>
  );
});

export default DisplayList;

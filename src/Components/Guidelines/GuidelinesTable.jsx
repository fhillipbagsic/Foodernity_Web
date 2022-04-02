import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { deleteGuideline, getGuidelines } from "../../Services/Guideline";
import CircularIndeterminate from "../CircularProgress";
import Appbar from "./Appbar";
import Edit from "./Edit";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "guideline",
    headerName: "Guideline",
    width: 400,
  },
  { field: "description", headerName: "Description", width: 400 },
  { field: "lastUpdated", headerName: "Last Updated", width: 150 },
  {
    field: "action",
    headerName: "Actions",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <>
          <Edit details={params.row} />
          <Box sx={{ width: "5px" }} />
          <Button
            onClick={() => {
              deleteGuideline(params.row._id).then((response) => {
                if (response.data["status"] === "ok") {
                  setTimeout(() => window.location.reload(), 0);
                } else {
                  console.log("error occurred");
                }
              });
            }}
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              backgroundColor: "#EF5350",
              ":hover": {
                backgroundColor: "#E53935",
              },
            }}
          >
            Delete
          </Button>
        </>
      );
    },
  },
];

function GuidelinesTable() {
  const [loading, setLoading] = useState(true);
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    getGuidelines().then((response) => {
      console.log(response);
      const guidelines = response.data.value;

      const withid = guidelines.map((guideline, index) => {
        const { ...rest } = guideline;
        return { id: index + 1, ...rest };
      });

      setLoading(false);
      console.log(withid);
      setGuidelines(withid);
    });
  }, []);
  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <Appbar />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rows={guidelines} columns={columns} pageSize={5} />
      </div>
    </>
  );
}

export default GuidelinesTable;

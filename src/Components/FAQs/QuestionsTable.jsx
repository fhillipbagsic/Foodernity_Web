import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { deleteQuestion, getQuestions } from "../../Services/Faq";
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
    field: "question",
    headerName: "Question",
    width: 400,
  },
  { field: "answer", headerName: "Answer", width: 400 },
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
              deleteQuestion(params.row._id).then((response) => {
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

function QuestionsTable() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions().then((response) => {
      const questions = response.data.value;

      const withid = questions.map((user, index) => {
        const { ...rest } = user;
        return { id: index + 1, ...rest };
      });
      setLoading(false);
      setQuestions(withid);
    });
  }, []);
  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <Appbar />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rows={questions} columns={columns} pageSize={5} />
      </div>
    </>
  );
}

export default QuestionsTable;

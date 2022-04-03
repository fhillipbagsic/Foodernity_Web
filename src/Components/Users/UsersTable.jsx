import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { getUsers, updateUserStatus } from "../../Services/User";
import CircularIndeterminate from "../CircularProgress";
import Appbar from "./Appbar";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 0,
    options: {
      display: "false",
    },
  },
  {
    field: "profilePicture",
    headerName: "Picture",
    width: 70,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <img
          src={params.row.profilePicture}
          alt="profile"
          style={{ width: "50px", height: "50px" }}
        />
      );
    },
  },
  { field: "fullName", headerName: "Full Name", width: 250 },
  { field: "emailAddress", headerName: "Email Address", width: 250 },
  { field: "method", headerName: "Sign-up Method", width: 130 },
  { field: "hidden", headerName: "Profile hidden", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      let color = params.row.status === "Active" ? "green" : "red";
      return <Typography sx={{ color }}>{params.row.status}</Typography>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      let action =
        params.row.status === "Active" ? "Suspend User" : "Unsuspend User";
      let color = params.row.status === "Active" ? "#EF5350" : "#66BB6A";
      let hoverColor = params.row.status === "Active" ? "#E53935" : "#4CAF50";
      let newStatus = params.row.status === "Active" ? "Suspended" : "Active";

      return (
        <Button
          onClick={() => {
            updateUserStatus(params.row._id, newStatus).then((response) => {
              if (response.data["status"] === "ok") {
                setTimeout(() => window.location.reload(), 0);
              } else {
                console.log("error occurred");
              }
            });
          }}
          sx={{
            backgroundColor: color,
            ":hover": {
              backgroundColor: hoverColor,
            },
          }}
          variant="contained"
        >
          {action}
        </Button>
      );
    },
  },
];

function UsersTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      const users = response.data.value;

      const withid = users.map((user, index) => {
        const { ...rest } = user;
        return { id: index + 1, ...rest };
      });
      setLoading(false);
      setUsers(withid);
    });
  }, []);

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <Appbar />
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}

          // checkboxSelection
        />
      </div>
    </>
  );
}

export default UsersTable;

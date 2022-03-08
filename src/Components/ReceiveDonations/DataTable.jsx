import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDonationsPerStatus,
  updateDonationStatus,
} from "../../Services/Donation";
import CircularIndeterminate from "../CircularProgress";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FoodBankRounded } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 0,
    options: {
      display: "false",
    },
  },

  { field: "emailAddress", headerName: "Donor", width: 200 },
  {
    field: "donationImage",
    headerName: "Image",
    width: 70,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <img
          src={params.row.donationImage}
          alt="donation"
          style={{ width: "50px", height: "50px" }}
        />
      );
    },
  },
  { field: "donationName", headerName: "Donation", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 80,
  },
  {
    field: "",
    headerName: "Actions",
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return params.row.status === "Accepted" ? (
        <Button
          onClick={() => {
            updateDonationStatus(params.row._id, "Received").then(
              (response) => {
                if (response.data["status"] === "ok") {
                  setTimeout(() => window.location.reload(), 0);
                } else {
                  console.log("error occurred");
                }
              }
            );
          }}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#66BB6A",
            ":hover": { background: "#4CAF50" },
          }}
        >
          Mark as received
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              updateDonationStatus(params.row._id, "Accepted").then(
                (response) => {
                  if (response.data["status"] === "ok") {
                    setTimeout(() => window.location.reload(), 0);
                  } else {
                    console.log("error occurred");
                  }
                }
              );
            }}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#2196f3",
              ":hover": {
                backgroundColor: "#1E88E5",
              },
            }}
          >
            Accept
          </Button>
          <Box sx={{ width: "5px" }} />
          <Button
            onClick={() => {
              updateDonationStatus(params.row._id, "Declined").then(
                (response) => {
                  if (response.data["status"] === "ok") {
                    setTimeout(() => window.location.reload(), 0);
                  } else {
                    console.log("error occurred");
                  }
                }
              );
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
            Decline
          </Button>
        </>
      );
    },
  },
  {
    field: "view",
    headerName: "View",
    sortable: false,
    width: 150,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

export default function DataTable() {
  const [loading, setLoading] = React.useState(true);
  const [donations, setDonations] = React.useState([]);

  React.useEffect(() => {
    const status = ["Pending", "Accepted"];
    getDonationsPerStatus(status).then((response) => {
      const donations = response.data.value;

      const withid = donations.map((donation, index) => {
        const { ...rest } = donation;
        return { id: index + 1, ...rest };
      });
      setLoading(false);
      setDonations(withid);
    });
  }, []);

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FoodBankRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Receive Donations
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={donations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    </>
  );
}

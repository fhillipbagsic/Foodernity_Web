import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { getStocksPerStatus } from "../../Services/Stocks";
import CircularIndeterminate from "../CircularProgress";
import Appbar from "./Appbar";
import { Inventory } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Form from "./Form";
import SecondForm from "./SecondForm";

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
  { field: "donationName", headerName: "Donation", width: 200 },
  { field: "foodCategory", headerName: "Category", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 100 },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    width: 150,
  },
  {
    field: "daysLeft",
    headerName: "Days before expiry",
    width: 200,
    renderCell: (params) => {
      const days = params.row.daysLeft;
      const color = days < 30 ? "red" : days < 60 ? "yellow" : "green";
      return (
        <Typography sx={{ color }}>{days} days left before expiry</Typography>
      );
    },
  },
];

function StocksTable() {
  const [selected, setSelected] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [commonDonations, setCommonDonations] = useState([]);
  const [callForDonations, setCallForDonations] = useState([]);

  const openFormRef = useRef(null);
  const openSecondFormRef = useRef(null);

  useEffect(() => {
    const status = "Inventory";
    getStocksPerStatus(status).then((response) => {
      const stocks = response.data.value;

      const commonDonationItems = stocks["commonDonations"]["items"];
      const callForDonationItems = [];

      for (let category in stocks) {
        if (category !== "commonDonations") {
          callForDonationItems.push(stocks[category]);
        }
      }

      setCommonDonations(commonDonationItems);
      setCallForDonations(callForDonationItems);
      setLoading(false);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getSelected = () => {
    let IDs = [];

    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < commonDonations.length; j++) {
        if (selected[i] === commonDonations[j]["id"]) {
          IDs.push(commonDonations[j]["_id"]);
          break;
        }
      }
    }

    setIDs(IDs);
  };

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderRadius: "10px", marginBottom: "10px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Inventory />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stockss
          </Typography>
          {selected.length ? (
            <Button
              color="inherit"
              onClick={() => {
                getSelected();
                openFormRef.current.openForm();
              }}
            >
              RELEASE DONATIONS
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Common Donations" />
            <Tab label="Call for donations" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={commonDonations}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(item) => setSelected(item)}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {callForDonations.map((item, index) => {
            const { _id, title, items } = item;

            const onClick = async () => {
              openSecondFormRef.current.openForm();
            };
            return (
              <React.Fragment key={index}>
                <Paper elevation={1} sx={{ padding: "1rem", marginY: "1rem" }}>
                  <Grid container>
                    <Grid item xs={12} sm={10}>
                      {" "}
                      <Typography variant="h6">{title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button variant="contained" onClick={onClick}>
                        Release Donations
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                <div style={{ height: 300, width: "100%" }}>
                  <DataGrid
                    rows={items}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
                <SecondForm
                  ref={openSecondFormRef}
                  _id={_id}
                  selected={items}
                />
              </React.Fragment>
            );
          })}
        </TabPanel>
      </Box>
      <Form ref={openFormRef} ids={IDs} />
    </>
  );
}
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default StocksTable;

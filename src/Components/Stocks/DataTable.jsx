import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { getStocks, getStocksPerStatus } from "../../Services/Stocks";
import CircularIndeterminate from "../CircularProgress";

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
      const color = days < 30 ? "red" : days < 60 ? "orange" : "green";
      return (
        <Typography sx={{ color }}>{days} days left before expiry</Typography>
      );
    },
  },
];

const columns2 = [
  {
    field: "id",
    headerName: "ID",
    width: 0,
  },
  {
    field: "category",
    headerName: "Category",
    width: 300,
    renderCell: (params) => {
      const category = params.row.category;
      const color = "";
      return <Chip label={category} color="primary" />;
    },
  },

  {
    field: "received",
    headerName: "Received",
    width: 200,
    renderCell: (params) => {
      const received = params.row.received;
      const color = "black";
      return <Typography sx={{ color }}>{received} pc/s</Typography>;
    },
  },
  {
    field: "donated",
    headerName: "Donated",
    width: 200,
    renderCell: (params) => {
      const donated = params.row.donated;
      const color = "black";
      return <Typography sx={{ color }}>{donated} pc/s</Typography>;
    },
  },
  {
    field: "balance",
    headerName: "Balance",
    width: 200,
    renderCell: (params) => {
      const balance = params.row.balance;
      const color = balance < 30 ? "red" : "green";
      return <Typography sx={{ color }}>{balance} pc/s</Typography>;
    },
  },
];
function StocksTable() {
  const [selected, setSelected] = useState([]);
  const [selectedCFD, setSelectedCFD] = useState("");
  const [selectedCFDItems, setSelectedCFDItems] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [commonDonations, setCommonDonations] = useState([]);
  const [callForDonations, setCallForDonations] = useState([]);
  const [stocks, setStocks] = useState([]);

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
    });

    getStocks().then((response) => {
      setStocks(response.data.value);
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
            Stocks
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
            <Tab label="Monitoring" />
            <Tab label="Common Donations" />
            <Tab label="Call for donations" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={stocks}
              columns={columns2}
              pageSize={12}

              // checkboxSelection
              // onSelectionModelChange={(item) => setSelected(item)}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        <TabPanel value={value} index={2}>
          {callForDonations.map((item, index) => {
            const { _id, title, items } = item;

            const onClick = async () => {
              setSelectedCFD(_id);
              setSelectedCFDItems(items);
              openSecondFormRef.current.openForm();
            };
            return (
              <React.Fragment key={index}>
                <Paper elevation={1} sx={{ padding: "1rem", marginY: "1rem" }}>
                  <Grid container>
                    <Grid item xs={12} sm={10}>
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ color: "#1976d2", fontWeight: "bold" }}
                      >
                        {title}
                      </Typography>
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
              </React.Fragment>
            );
          })}
        </TabPanel>
      </Box>
      <Form ref={openFormRef} ids={IDs} />
      <SecondForm
        ref={openSecondFormRef}
        _id={selectedCFD}
        selected={selectedCFDItems}
      />
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

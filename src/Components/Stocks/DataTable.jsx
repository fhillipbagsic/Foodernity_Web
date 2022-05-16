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
import {
  getReleasedDonations,
  getStocks,
  getStocksPerStatus,
} from "../../Services/Stocks";
import CircularIndeterminate from "../CircularProgress";

import { FoodBankRounded } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Form from "./Form";
import SecondForm from "./SecondForm";
import Edit from "./Edit";

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
      console.log("test");
      if (params.row.category === "Cereals") {
        console.log("test");
        console.log(balance);
        console.log(Number(localStorage.getItem(params.row.category)));
      }

      const color =
        balance > Number(localStorage.getItem(params.row.category))
          ? "green"
          : "red";
      return <Typography sx={{ color }}>{balance} pc/s</Typography>;
    },
  },
];

const column3 = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "documentation",
    headerName: "Image",
    width: 70,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <img
          src={params.row.documentation}
          alt="donation"
          style={{ width: "50px", height: "50px" }}
        />
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 350,
  },
  {
    field: "date",
    headerName: "Date Released",
    width: 200,
    renderCell: (params) => {
      const date = new Date(params.row.date);
      const fullDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

      return <Typography>{fullDate}</Typography>;
    },
  },
  {
    field: "beneficiaries",
    headerName: "Beneficiaries",
    width: 350,
  },
  {
    field: "",
    headerName: "# of Items Donated",
    width: 150,
    renderCell: (params) => {
      return <Typography>{params.row.itemsDonated.length}</Typography>;
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
  const [releasedDonations, setReleasedDonations] = useState([]);

  const openFormRef = useRef(null);
  const openSecondFormRef = useRef(null);
  const editFormRef = useRef(null);

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
    });

    getReleasedDonations().then((response) => {
      const items = response.data.value;
      const withid = items.map((item, index) => {
        const { ...rest } = item;
        return { id: index + 1, ...rest };
      });
      console.log(withid);
      setReleasedDonations(withid);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("Canned Foods")) {
      localStorage.setItem("Canned Foods", "30");
      localStorage.setItem("Instant Noodles", "30");
      localStorage.setItem("Canned Fruits", "30");
      localStorage.setItem("Canned Vegetables", "30");
      localStorage.setItem("Eggs", "30");
      localStorage.setItem("Rice", "30");
      localStorage.setItem("Cereals", "30");
      localStorage.setItem("Tea/Coffee/Milk/Sugar", "30");
      localStorage.setItem("Biscuits", "30");
      localStorage.setItem("Condiments and Sauces", "30");
      localStorage.setItem("Beverages", "30");
      localStorage.setItem("Snacks", "30");
    }
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
            <FoodBankRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stocks
          </Typography>
          {selected.length && value === 1 ? (
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
          {value === 0 && (
            <Button
              color="inherit"
              onClick={() => editFormRef.current.openForm()}
            >
              Edit
            </Button>
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
            <Tab label="Released Donations" />
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
        <TabPanel value={value} index={3}>
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={releasedDonations}
              columns={column3}
              pageSize={10}
            />
          </div>
        </TabPanel>
      </Box>
      <Form ref={openFormRef} ids={IDs} />
      <SecondForm
        ref={openSecondFormRef}
        _id={selectedCFD}
        selected={selectedCFDItems}
      />
      <Edit ref={editFormRef} />
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

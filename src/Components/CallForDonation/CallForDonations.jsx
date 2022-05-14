import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { Grid, Tabs, Tab, Typography } from "@mui/material";
import Item from "./Item";

import { getCallForDonations } from "../../Services/CallForDonation";
import CircularIndeterminate from "../CircularProgress";
import Loading from "../Loading";
import Appbar from "./Appbar";

function CallForDonations() {
  const [loading, setLoading] = useState(true);
  const [callfordonations, setCallfordonations] = useState([]);
  const [value, setValue] = useState(0);
  const loadingRef = useRef(null);

  useEffect(() => {
    getCallForDonations(["Active", "Completed"]).then((response) => {
      if (response.data["status"] === "ok") {
        console.log(response.data["value"]);
        setCallfordonations(response.data["value"]);
        setLoading(false);
      } else {
        console.log("error");
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <Appbar />
      <Box sx={{ height: "20px" }} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {callfordonations
              .filter((item) => item.status === "Active")
              .map((item, index) => (
                <Item key={index} data={item} />
              ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            {callfordonations
              .filter((item) => item.status === "Completed")
              .map((item, index) => (
                <Item key={index} data={item} />
              ))}
          </Grid>
        </TabPanel>
      </Box>

      <Loading ref={loadingRef} />
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
export default CallForDonations;

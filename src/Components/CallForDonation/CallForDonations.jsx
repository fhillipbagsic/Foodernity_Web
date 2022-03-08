import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Add, VolunteerActivismRounded } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Item from "./Item";
import Form from "./Form";
import { getCallForDonations } from "../../Services/CallForDonation";
import CircularIndeterminate from "../CircularProgress";
import Loading from "../Loading";

function CallForDonations() {
  const [loading, setLoading] = useState(true);
  const [callfordonations, setCallfordonations] = useState([]);
  const openFormRef = useRef(null);
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
            <VolunteerActivismRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Call for Donations
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => openFormRef.current.openForm()}
          >
            Create a call for donation
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "20px" }} />
      <Grid container spacing={2}>
        {callfordonations
          .filter((item) => item.status === "Active")
          .map((item, index) => (
            <Item key={index} data={item} />
          ))}
        {/* <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item /> */}
      </Grid>
      <Form ref={openFormRef} />
      <Loading ref={loadingRef} />
    </>
  );
}

export default CallForDonations;

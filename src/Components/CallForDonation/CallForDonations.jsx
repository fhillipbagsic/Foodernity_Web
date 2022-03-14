import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { Grid } from "@mui/material";
import Item from "./Item";

import { getCallForDonations } from "../../Services/CallForDonation";
import CircularIndeterminate from "../CircularProgress";
import Loading from "../Loading";
import Appbar from "./Appbar";

function CallForDonations() {
  const [loading, setLoading] = useState(true);
  const [callfordonations, setCallfordonations] = useState([]);

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
      <Appbar />
      <Box sx={{ height: "20px" }} />
      <Grid container spacing={2}>
        {callfordonations
          .filter((item) => item.status === "Active")
          .map((item, index) => (
            <Item key={index} data={item} />
          ))}
      </Grid>

      <Loading ref={loadingRef} />
    </>
  );
}

export default CallForDonations;

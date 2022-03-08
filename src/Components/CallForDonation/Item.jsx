import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Loading from "../Loading";
import { updateCallForDonation } from "../../Services/CallForDonation";

export default function Item(props) {
  const { _id, image, title, beneficiaries, remarks } = props.data;
  const loadingRef = useRef(null);

  const update = (newStatus) => {
    loadingRef.current.openLoading(true);
    updateCallForDonation(_id, newStatus).then((response) => {
      if (response.data["status"] === "ok") {
        setTimeout(() => window.location.reload(), 0);
      } else {
        console.log("error");
      }
    });
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardMedia
            component="img"
            alt="green iguana"
            height="350"
            image={image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {title}
            </Typography>
            <Typography noWrap>{beneficiaries}</Typography>
            <Typography variant="body2" color="text.secondary">
              {remarks}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => update("Completed")}>
              Mark as Complete
            </Button>
            <Button size="small">View More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Loading ref={loadingRef} />
    </>
  );
}

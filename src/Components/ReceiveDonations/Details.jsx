import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { DialogContent, Divider, Grid } from "@mui/material";

function SimpleDialog(props) {
  const { onClose, details, open } = props;

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <DialogTitle>Donation Details</DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12}>
            <img
              src={details.donationImage}
              alt="donation"
              style={{ height: "30vh", objectFit: "contain", width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <span style={{ fontWeight: "bold" }}>Donation:</span>{" "}
              {details.donationName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginY: ".5rem" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontWeight: "bold" }}>Donor's name:</Typography>
            <Typography>{details.fullName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontWeight: "bold" }}>
              Donor's Email Address:
            </Typography>
            <Typography>{details.emailAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontWeight: "bold" }}>Status:</Typography>
            <Typography>{details.status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginY: ".5rem" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>Items:</Typography>
          </Grid>
          <Grid container item xs={12}>
            {details.donations.map((donation, index) => {
              return (
                <Grid item key={index} xs={12} sm={6}>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Category: </span>
                    {donation.foodCategory}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Quantity: </span>
                    {donation.quantity}
                  </Typography>
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>Expiry Date: </span>
                    {donation.expiryDate}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default function DonationDetails(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <SimpleDialog details={props.details} open={open} onClose={handleClose} />
    </div>
  );
}

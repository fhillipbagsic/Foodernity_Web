import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";

const Edit = forwardRef((props, ref) => {
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [cannedFoodsCount, setCannedFoodsCount] = useState(
    Number(localStorage.getItem("Canned Foods"))
  );
  const [instantNoodlesCount, setInstantNoodlesCount] = useState(
    Number(localStorage.getItem("Instant Noodles"))
  );
  const [cannedFruitsCount, setCannedFruitsCount] = useState(
    Number(localStorage.getItem("Canned Fruits"))
  );
  const [cannedVegetablesCount, setCannedVegetablesCount] = useState(
    Number(localStorage.getItem("Canned Vegetables"))
  );
  const [eggsCount, setEggsCount] = useState(
    Number(localStorage.getItem("Eggs"))
  );
  const [riceCount, setRiceCount] = useState(
    Number(localStorage.getItem("Rice"))
  );
  const [cerealsCount, setCerealsCount] = useState(
    Number(localStorage.getItem("Cereals"))
  );
  const [teaCount, setTeaCount] = useState(
    Number(localStorage.getItem("Tea/Coffee/Milk/Sugar"))
  );
  const [biscuitsCount, setBiscuitsCount] = useState(
    Number(localStorage.getItem("Biscuits"))
  );
  const [condimentsCount, setCondimentsCount] = useState(
    Number(localStorage.getItem("Condiments and Sauces"))
  );
  const [beveragesCount, setBeveragesCount] = useState(
    Number(localStorage.getItem("Beverages"))
  );
  const [snacksCount, setSnacksCount] = useState(
    Number(localStorage.getItem("Snacks"))
  );

  useImperativeHandle(ref, () => ({
    openForm() {
      setOpen(true);
    },
  }));
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  const onChange = (e, val) => {
    console.log(val);

    if (!isNaN(e.target.value)) {
      if (val === "Canned Foods") {
        setCannedFoodsCount(e.target.value);
      } else if (val === "Instant Noodles") {
        setInstantNoodlesCount(e.target.value);
      } else if (val === "Canned Fruits") {
        setCannedFruitsCount(e.target.value);
      } else if (val === "Canned Vegetables") {
        setCannedVegetablesCount(e.target.value);
      } else if (val === "Eggs") {
        setEggsCount(e.target.value);
      } else if (val === "Rice") {
        setRiceCount(e.target.value);
      } else if (val === "Cereals") {
        setCerealsCount(e.target.value);
      } else if (val === "Tea/Coffee/Milk/Sugar") {
        setTeaCount(e.target.value);
      } else if (val === "Biscuits") {
        setBiscuitsCount(e.target.value);
      } else if (val === "Condiments and Sauces") {
        setCondimentsCount(e.target.value);
      } else if (val === "Beverages") {
        setBeveragesCount(e.target.value);
      } else {
        setSnacksCount(e.target.value);
      }
    }
  };

  const save = () => {
    localStorage.setItem("Canned Foods", cannedFoodsCount);
    localStorage.setItem("Instant Noodles", instantNoodlesCount);
    localStorage.setItem("Canned Fruits", cannedFruitsCount);
    localStorage.setItem("Canned Vegetables", cannedVegetablesCount);
    localStorage.setItem("Eggs", eggsCount);
    localStorage.setItem("Rice", riceCount);
    localStorage.setItem("Cereals", cerealsCount);
    localStorage.setItem("Tea/Coffee/Milk/Sugar", teaCount);
    localStorage.setItem("Biscuits", biscuitsCount);
    localStorage.setItem("Condiments and Sauces", condimentsCount);
    localStorage.setItem("Beverages", beveragesCount);
    localStorage.setItem("Snacks", snacksCount);
    window.location.reload();
  };
  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Canned Foods"
                value={cannedFoodsCount}
                onChange={(e) => onChange(e, "Canned Foods")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Instant Noodles"
                value={instantNoodlesCount}
                onChange={(e) => onChange(e, "Instant Noodles")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Canned Fruits"
                value={cannedFruitsCount}
                onChange={(e) => onChange(e, "Canned Fruits")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Canned Vegetables"
                value={cannedVegetablesCount}
                onChange={(e) => onChange(e, "Canned Vegetables")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Eggs"
                value={eggsCount}
                onChange={(e) => onChange(e, "Eggs")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Rice"
                value={riceCount}
                onChange={(e) => onChange(e, "Rice")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Cereals"
                value={cerealsCount}
                onChange={(e) => onChange(e, "Cereals")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Tea/Coffee/Milk/Sugar"
                value={teaCount}
                onChange={(e) => onChange(e, "Tea/Coffee/Milk/Sugar")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Biscuits"
                value={biscuitsCount}
                onChange={(e) => onChange(e, "Biscuits")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Condiments and Sauces"
                value={condimentsCount}
                onChange={(e) => onChange(e, "Condiments and Sauces")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Beverages"
                value={beveragesCount}
                onChange={(e) => onChange(e, "Beverages")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                label="Snacks"
                value={snacksCount}
                onChange={(e) => onChange(e, "Snacks")}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
});

export default Edit;

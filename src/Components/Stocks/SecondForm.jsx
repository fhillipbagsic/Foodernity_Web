import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Loading from "../Loading";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { releaseCallForDonation } from "../../Services/Stocks";

const SecondForm = forwardRef((props, ref) => {
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const loadingRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openForm() {
      setOpen(true);
    },
  }));
  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.selected);
  console.log(props._id);
  const onSubmit = async (data) => {
    data._id = props._id;
    data.selected = props.selected;
    data.title = props.title;

    loadingRef.current.openLoading();
    setOpen(false);
    releaseCallForDonation(data).then((response) => {
      if (response.data["status"] === "ok") {
        setTimeout(() => window.location.reload(), 0);
      } else {
        console.log(response.data["value"]);
      }
    });
  };
  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth="xs">
        <DialogTitle>Release Call for Donations</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="date"
              control={control}
              defaultValue={new Date()}
              //   rules={{ required: "Date required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label="Date donated"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                );
              }}
            />
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Image required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <input
                    type="file"
                    required
                    accept=".jpg,.jpeg,.png"
                    id="pubmat"
                    name="pubmat"
                    value={value.fileName}
                    onChange={(e) => {
                      var file = e.target.files[0];

                      onChange(file);
                    }}
                  />
                );
              }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Loading ref={loadingRef} />
    </>
  );
});
export default SecondForm;

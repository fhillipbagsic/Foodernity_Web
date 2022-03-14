import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Loading from "../Loading";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { releaseDonation } from "../../Services/Stocks";

const Form = forwardRef((props, ref) => {
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

  const onSubmit = async (data) => {
    data.selected = props.ids;

    loadingRef.current.openLoading();
    setOpen(false);
    releaseDonation(data).then((response) => {
      if (response.data["status"] === "ok") {
        setTimeout(() => window.location.reload(), 0);
      } else {
        console.log(response.data["value"]);
      }
    });
  };
  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth="sm">
        <DialogTitle>Release Donations</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="title"
                    label="Title"
                    margin="normal"
                    fullWidth
                    required
                    value={value}
                    onChange={onChange}
                    error={error}
                    helperText={error && error.message}
                  />
                );
              }}
            />
            <Controller
              name="beneficiaries"
              control={control}
              defaultValue=""
              rules={{ required: "Beneficiaries required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="beneficiaries"
                    label="Beneficiaries"
                    margin="normal"
                    fullWidth
                    required
                    value={value}
                    onChange={onChange}
                    error={error}
                    helperText={error && error.message}
                  />
                );
              }}
            />
            <Controller
              name="remarks"
              control={control}
              defaultValue=""
              rules={{ required: "Remarks required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="remarks"
                    label="Remarks"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    value={value}
                    onChange={onChange}
                    error={error}
                    helperText={error && error.message}
                  />
                );
              }}
            />
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
export default Form;

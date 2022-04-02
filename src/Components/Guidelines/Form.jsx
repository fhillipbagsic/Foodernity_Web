import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { addGuideline } from "../../Services/Guideline";
import Loading from "../Loading";

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
    console.log(data);
    loadingRef.current.openLoading();
    setOpen(false);
    addGuideline(data.guideline, data.description).then((response) => {
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
        <DialogTitle>Add a Guideline</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="guideline"
              control={control}
              defaultValue=""
              rules={{ required: "Guideline required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="guideline"
                    label="Guideline"
                    margin="normal"
                    fullWidth
                    required
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                  />
                );
              }}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="description"
                    label="Description"
                    margin="normal"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                  />
                );
              }}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Add
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

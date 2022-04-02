import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { editQuestion } from "../../Services/Faq";
import Loading from "../Loading";

function SimpleDialog(props) {
  const { onClose, details, open } = props;
  const { control, handleSubmit } = useForm();
  const loadingRef = useRef(null);

  const onSubmit = async (data) => {
    editQuestion(details._id, data.question, data.answer).then((response) => {
      if (response.data["status"] === "ok") {
        setTimeout(() => window.location.reload(), 0);
      } else {
        console.log(response.data["value"]);
      }
    });
  };
  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
        <DialogTitle>Edit question</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="question"
              control={control}
              defaultValue={details.question}
              rules={{ required: "Question required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="question"
                    label="Question"
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
              name="answer"
              control={control}
              defaultValue={details.answer}
              rules={{ required: "Answer required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="text"
                    variant="outlined"
                    id="answer"
                    label="Answer"
                    margin="normal"
                    fullWidth
                    required
                    rows={4}
                    multiline
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                  />
                );
              }}
            />
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Edit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Loading ref={loadingRef} />
    </>
  );
}

export default function Edit(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#2196f3",
          ":hover": {
            backgroundColor: "#1E88E5",
          },
        }}
      >
        Edit
      </Button>
      <SimpleDialog details={props.details} open={open} onClose={handleClose} />
    </div>
  );
}

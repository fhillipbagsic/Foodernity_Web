import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Add, BeenhereRounded, HelpRounded } from "@mui/icons-material";
import Form from "./Form";
function Appbar() {
  const openFormRef = useRef(null);
  return (
    <>
      <AppBar position="static" elevation={0} sx={{ borderRadius: "10px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {" "}
            <BeenhereRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guidelines
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => openFormRef.current.openForm()}
          >
            Add a guideline
          </Button>
        </Toolbar>
      </AppBar>
      <Form ref={openFormRef} />
    </>
  );
}

export default Appbar;

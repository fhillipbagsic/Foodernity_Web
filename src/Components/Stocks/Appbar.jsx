import { Inventory } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import React, { useRef } from "react";
import Form from "./Form";

function Appbar() {
  const openFormRef = useRef(null);
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderRadius: "10px", marginBottom: "10px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Inventory />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stocks
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;

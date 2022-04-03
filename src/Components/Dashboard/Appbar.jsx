import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DashboardRounded } from "@mui/icons-material";

function Appbar() {
  return (
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
          <DashboardRounded />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;

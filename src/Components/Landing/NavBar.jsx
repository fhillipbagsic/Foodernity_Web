import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridCloseIcon, GridMenuIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";

export function NavBar(props) {
  const { openMenu, setOpenMenu } = props;
  const [close, setClose] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
    setClose(!close);
  };

  return (
    <AppBar
      elevation={1}
      position="fixed"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              style={{
                fontFamily: "Inter",
                fontWeight: "600",
                marginRight: "1rem",
                color: "#66BB6A",
                textDecoration: "none",
              }}
            >
              Foodernity
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: "bold", color: "#66BB6A" }}>
              Download Now
            </Typography>
          </Grid>
          {/* <Hidden mdDown>
            <Grid item>
              <div>
                <img
                  src={apbadge}
                  alt="apple store store"
                  style={{ marginRight: ".5rem" }}
                />
                <img src={gpbadge} alt="google play store" />
              </div>
            </Grid>
          </Hidden> */}
          <Hidden mdUp>
            <IconButton onClick={handleOpenMenu} disableRipple>
              {close ? <GridCloseIcon /> : <GridMenuIcon />}
            </IconButton>
          </Hidden>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export function Menu() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Hidden mdUp>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          position: "fixed",
          top: xs ? "56px" : "64px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "30%",
          zIndex: "1",
          boxShadow: "1px 1px grey",
        }}
      >
        <Typography
          component={Link}
          to="/ourgoal"
          variant="h6"
          style={{
            fontFamily: "Inter",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          Our Goal
        </Typography>

        <Typography
          component={Link}
          to="/getinvolved"
          variant="h6"
          style={{
            fontFamily: "Inter",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          Get Involved
        </Typography>
        <Typography
          component={Link}
          to="/contactus"
          variant="h6"
          style={{
            fontFamily: "Inter",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          component={Link}
          to="/signin"
          variant="h6"
          style={{
            fontFamily: "Inter",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
          }}
        >
          Signin
        </Typography>
      </div>
    </Hidden>
  );
}

export default NavBar;

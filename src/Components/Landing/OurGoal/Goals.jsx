import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import hunger from "../../../Assets/Landing/hunger.png";
import waste from "../../../Assets/Landing/waste.png";
import community from "../../../Assets/Landing/community.png";

function GoalOne() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      style={{ margin: sm ? "2rem 0" : "5rem 0" }}
    >
      <Grid item xs={false} md={1} />
      <Grid container item xs={12} md={4} justifyContent="center">
        <img
          src={waste}
          alt="food-waste"
          style={{
            width: sm ? "200px" : "300px",
            marginBottom: sm ? "2rem" : "0",
          }}
        />
      </Grid>
      <Grid item xs={false} md={1} />
      <Grid
        container
        item
        xs={11}
        md={5}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant={md ? "h4" : "h3"}
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            textAlign: sm ? "center" : "start",
            marginBottom: sm ? "2rem" : 0,
          }}
        >
          To reduce food waste in the country
        </Typography>
        <Typography
          variant="h5"
          style={{
            textAlign: sm ? "center" : "left",
            fontFamily: "Inter",
            fontWeight: "500",
            marginBottom: "1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci viverra
          arcu, amet lobortis donec nibh. Feugiat nisl quis velit pharetra
          mattis nisl.
        </Typography>
      </Grid>

      <Grid item xs={false} md={1} />
    </Grid>
  );
}

function GoalTwo() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      style={{ margin: sm ? "2rem 0" : "5rem 0" }}
    >
      <Grid item xs={false} md={1} />
      <Grid container item xs={12} md={4} justifyContent="center">
        <img
          src={hunger}
          alt="food-waste"
          style={{
            width: sm ? "200px" : "300px",
            marginBottom: sm ? "2rem" : "0",
          }}
        />
      </Grid>
      <Grid item xs={false} md={1} />
      <Grid
        container
        item
        xs={11}
        md={5}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant={md ? "h4" : "h3"}
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            textAlign: sm ? "center" : "start",
            marginBottom: sm ? "2rem" : 0,
          }}
        >
          To help achieve zero hunger
        </Typography>
        <Typography
          variant="h5"
          style={{
            textAlign: sm ? "center" : "left",
            fontFamily: "Inter",
            fontWeight: "500",
            marginBottom: "1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci viverra
          arcu, amet lobortis donec nibh. Feugiat nisl quis velit pharetra
          mattis nisl.
        </Typography>
      </Grid>

      <Grid item xs={false} md={1} />
    </Grid>
  );
}

function GoalThree() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      style={{ margin: sm ? "2rem 0" : "5rem 0" }}
    >
      <Grid item xs={false} md={1} />
      <Grid container item xs={12} md={4} justifyContent="center">
        <img
          src={community}
          alt="food-waste"
          style={{
            width: sm ? "200px" : "300px",
            marginBottom: sm ? "2rem" : "0",
          }}
        />
      </Grid>
      <Grid item xs={false} md={1} />
      <Grid
        container
        item
        xs={11}
        md={5}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant={md ? "h4" : "h3"}
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            textAlign: sm ? "center" : "start",
            marginBottom: sm ? "2rem" : 0,
          }}
        >
          To strenghten communities through food sharing
        </Typography>
        <Typography
          variant="h5"
          style={{
            textAlign: sm ? "center" : "left",
            fontFamily: "Inter",
            fontWeight: "500",
            marginBottom: "1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci viverra
          arcu, amet lobortis donec nibh. Feugiat nisl quis velit pharetra
          mattis nisl.
        </Typography>
      </Grid>

      <Grid item xs={false} md={1} />
    </Grid>
  );
}

export { GoalOne, GoalTwo, GoalThree };

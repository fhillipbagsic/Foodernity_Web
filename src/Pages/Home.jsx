import { Grid, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../Components/Landing/Footer";
import DonatingSteps from "../Components/Landing/Home/DonatingSteps";

import Goal from "../Components/Landing/Home/Goal";
import Hero from "../Components/Landing/Home/Hero";
import Partner from "../Components/Landing/Home/Partner";
import NavBar, { Menu } from "../Components/Landing/NavBar";
import {
  GoalOne,
  GoalThree,
  GoalTwo,
} from "../Components/Landing/OurGoal/Goals";
import Overview from "../Components/Landing/OurGoal/Overview";

// Components
// import { NavBar, Menu } from "../../components/Landing/NavBar";
// import Hero from "../../components/Landing/Home/Hero";
// import Goal from "../../components/Landing/Home/Goal";
// import RequestingSteps from "../../components/Landing/Home/RequestingSteps";
// import DonatingSteps from "../../components/Landing/Home/DonatingSteps";
// import Partner from "../../components/Landing/Home/Partner";
// import Footer from "../../components/Landing/Footer";
// import { Grid, Toolbar } from "@mui/material";

function Home() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    fetch("https://foodernity-server.herokuapp.com/").then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>Foodernity</title>
      </Helmet> */}
      <Grid container justifyContent="center">
        <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Toolbar />
        {/* {openMenu && <Menu />} */}
        <Hero />
        <Goal />
        {/* <RequestingSteps /> */}
        <Overview />
        <GoalOne />
        <GoalTwo />
        <GoalThree />
        <DonatingSteps />
        <Partner />
        <Footer />
      </Grid>
    </>
  );
}

export default Home;

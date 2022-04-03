import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import getStatistics from "../../Services/Dashboard";
import CircularIndeterminate from "../CircularProgress";
import Appbar from "./Appbar";
import Chart from "./Chart";
import Item from "./Item";
import {
  CheckCircleRounded,
  CallReceivedRounded,
  VolunteerActivismRounded,
  BlockRounded,
  SupervisedUserCircleRounded,
  Beenhere,
  BeenhereRounded,
  CampaignRounded,
} from "@mui/icons-material";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [activeCFD, setActiveCFD] = useState(0);
  const [completedCFD, setCompletedCFD] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [suspendedUsers, setSuspendedUsers] = useState(0);
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    getStatistics().then((response) => {
      const stats = response.data.value;

      setPending(stats.pendingCount);
      setAccepted(stats.acceptedCount);
      setActiveCFD(stats.activeCallForDonations);
      setCompletedCFD(stats.completedCallForDonations);
      setActiveUsers(stats.activeUsers);
      setSuspendedUsers(stats.suspendedUsers);
      setStatistics(stats.stocksCount);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <Appbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Item
              title={"Donations to Accept"}
              count={pending}
              icon={
                <VolunteerActivismRounded
                  sx={{ color: "#2196f3", fontSize: 40 }}
                />
              }
            />
            <Box sx={{ flex: 1 }}></Box>
            <Item
              title={"Donations to Receive"}
              count={accepted}
              icon={
                <CallReceivedRounded sx={{ color: "#4CAF50", fontSize: 40 }} />
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Item
              title={"Active Call for Donations"}
              count={activeCFD}
              icon={<CampaignRounded sx={{ color: "#FF5722", fontSize: 40 }} />}
            />
            <Box sx={{ flex: 1 }}></Box>
            <Item
              title={"Completed Call for Donations"}
              count={completedCFD}
              icon={<BeenhereRounded sx={{ color: "#795548", fontSize: 40 }} />}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Item
              title={"Active Users"}
              count={activeUsers}
              icon={
                <SupervisedUserCircleRounded
                  sx={{ color: "#9C27B0", fontSize: 40 }}
                />
              }
            />
            <Box sx={{ flex: 1 }}></Box>
            <Item
              title={"Suspended Users"}
              count={suspendedUsers}
              icon={<BlockRounded sx={{ color: "#E35141", fontSize: 40 }} />}
            />
          </Paper>
        </Grid>
      </Grid>
      <Box height={20} />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 800,
        }}
      >
        <Chart statistics={statistics} />
      </Paper>
    </>
  );
}

export default Dashboard;

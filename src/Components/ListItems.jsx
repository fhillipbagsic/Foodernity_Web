import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import {
  BeenhereRounded,
  CampaignRounded,
  DashboardRounded,
  FoodBankRounded,
  GroupRounded,
  HelpRounded,
  LogoutRounded,
  PrivacyTipRounded,
  VolunteerActivismRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logout from "../Services/Logout";
export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Modules
    </ListSubheader>

    <Link
      to="/admin/dashboard"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton LinkComponent={Link} href="/admin/dashboard">
        <ListItemIcon>
          <DashboardRounded />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link
      to="/admin/receivedonations"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton LinkComponent={Link} href="/admin/receivedonations">
        <ListItemIcon>
          <VolunteerActivismRounded />
        </ListItemIcon>
        <ListItemText primary="Receive Donations" />
      </ListItemButton>
    </Link>

    <Link
      to="/admin/callfordonations"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <CampaignRounded />
        </ListItemIcon>
        <ListItemText primary="Call for Donations" />
      </ListItemButton>
    </Link>

    <Link to="/admin/stocks" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <FoodBankRounded />
        </ListItemIcon>
        <ListItemText primary="Stocks" />
      </ListItemButton>
    </Link>
    <Link to="/admin/users" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <GroupRounded />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>

    <Link
      to="/admin/guidelines"
      style={{ textDecoration: "none", color: "black" }}
    >
      <ListItemButton LinkComponent={Link} href="/admin/guidelines">
        <ListItemIcon>
          <BeenhereRounded />
        </ListItemIcon>
        <ListItemText primary="Guidelines" />
      </ListItemButton>
    </Link>
    <Link to="/admin/faqs" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton LinkComponent={Link} href="/admin/faqs">
        <ListItemIcon>
          <HelpRounded />
        </ListItemIcon>
        <ListItemText primary="FAQs" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PrivacyTipRounded />
      </ListItemIcon>
      <ListItemText primary="Privacy Notice" />
    </ListItemButton>
    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <LogoutRounded />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);

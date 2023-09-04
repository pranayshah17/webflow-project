import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

export default function Header() {
  const StyledAppBar = styled(AppBar)({
    backgroundColor: "white",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.06), 0px 1px 10px 0px rgba(0,0,0,0.04)",
    color: "black",
    display: "flex",
    justifyContent: "flex-start", // Align items to the center horizontally
    alignItems: "center", // Align items to the center vertically
  });

  const StyledLogo = styled("img")({
    width: 40,
    marginRight: 10,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing user session or calling an API
    // After logout, you can close the drawer if needed
    setDrawerOpen(false);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar sx={{width:"100%", justifyContent:"space-between"}}>
          <div style={{ display: "flex", alignItems: "center", justifyItems:"flex-start"} }>
            <StyledLogo src="logo.png" alt="Logo" />
            <Typography variant="h6" component="div">
              SARVADHI
            </Typography>
          </div>
          <div style={{display:"flex", justifyContent:"flex-end"}}>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <AccountCircleIcon sx={{fontSize:"40px"}} /> {/* Profile icon */}
            </IconButton>
          </div>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ style: { width: 250 } }}
      >
        <List>
          <ListItem button>
            <ListItemText sx={{ textAlign: "center" }} primary="Profile" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout}>
            <ExitToAppIcon /> {/* Logout icon */}
            <ListItemText primary="Log Out" />
          </ListItem>
          {/* Add more menu items as needed */}
        </List>
      </Drawer>
    </div>
  );
}

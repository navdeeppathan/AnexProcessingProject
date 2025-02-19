import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "../../dashboard/Dashboard.css";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Route, Routes, useNavigate } from "react-router-dom";

import Companies from "../../company/Companies.jsx";
import { ImgContainer } from "../../../assets/ImgContainer.jsx";
import DashboardTemplate from "./DashboardTemplate.jsx";
const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  {
    name: "Companies",
    path: "/admin/companies",
    icon: <DescriptionIcon />,
  },
  { name: "My Profile", path: "/admin/my-profile", icon: <PeopleAltIcon /> },
  {
    name: "Edit Profile",
    path: "/admin/edit-profile",
    icon: <MenuBookIcon />,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <div className="main-header">
        <img src={ImgContainer.logo} alt="Logo Icon" className="logo" />
      </div>
      <div className="main-section">
        <div className="drawer-container">{drawer}</div>
        <div className="righ-side-dashboard">
          <Routes>
            <Route path="/companies" element={<Companies />}></Route>
            <Route path="/" element={<DashboardTemplate />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

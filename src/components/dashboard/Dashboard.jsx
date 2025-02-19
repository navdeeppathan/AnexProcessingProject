import React from "react";
import MainDashboard from "./MainDashboard.jsx";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./Dashboard.css";
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
import AnnexForm from "../anexForm/AnexForm.jsx";
import Profile from "../profile/Profile.jsx";
import EditProfile from "../profile/EditProfile.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Form from "../anexForm/Form.jsx";
const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  {
    name: "Annex Forms",
    path: "/dashboard/annex-form",
    icon: <DescriptionIcon />,
  },
  { name: "My Profile", path: "/dashboard/profile", icon: <PeopleAltIcon /> },
  {
    name: "Edit Profile",
    path: "/dashboard/edit-profile",
    icon: <MenuBookIcon />,
  },
];

const Dashboard = () => {
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
              <ListItemIcon>{item.icon}</ListItemIcon>
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
        <img src="logo.png" alt="Logo Icon" className="logo" />
      </div>
      <div className="main-section">
        <div className="drawer-container">{drawer}</div>
        <div className="righ-side-dashboard">
          <Routes>
            <Route path="/" element={<MainDashboard />}></Route>
            <Route path="/annex-form" element={<Form />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/edit-profile" element={<EditProfile />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

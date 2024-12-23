import { Box } from "@mui/material";
import React, { useContext } from "react";
import { assets, colors } from "../../assets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const sidebarItems = [
    {
      label: "Dashboard",
      to: "/",
      icon: <DashboardIcon />,
    },
    {
      label: "Trips",
      to: "/trips",
      icon: <ModeOfTravelIcon />,
    },
    {
      label: "Vehicles",
      to: "/vehicles",
      icon: <DirectionsCarIcon />,
    },
    {
      label: "Users",
      to: "/users",
      icon: <GroupIcon />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <div className="sidebarWrap">
      <div className="sidebarContainer">
        <div className="sidebarLogo" onClick={() => navigate("/")}>
          <img src={assets.whiteLogo} alt={"Trackline solution logo"} />
        </div>
        {/* <Box
        sx={{
          textAlign: "center",
          alignContent: "center",
          fontSize: "20px",
          borderBottom: `1px solid ${colors.textLight}`,
          p: "10px 0 20px",
          mb: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <strong>Trackline Solutions</strong>
      </Box> */}

        {sidebarItems?.map((item, index) => (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "sidebarItem active"
                : isActive
                ? "sidebarItem active"
                : "sidebarItem"
            }
            key={index}
            to={item.to}
          >
            <div className="item-icon">{item.icon}</div>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="logoutBtn sidebarItem" onClick={handleLogout}>
          <div className="item-icon">
            <LogoutIcon />
          </div>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useState } from 'react'
import { Box, Divider, Typography, Button } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom';

import HouseBuilding from "../../../assests/superAdmin/house_building.svg"
import DashboardIcon from "../../../assests/commercialAdmin/Dashboard.svg"
import ActiveDashboardIcon from "../../../assests/commercialAdmin/ActiveDashboard.svg"
import Residents from "../../../assests/commercialAdmin/Residents.svg"
import ActiveResidents from "../../../assests/commercialAdmin/ActiveResidents.svg"
import PinCode from "../../../assests/commercialAdmin/PinCode.svg"
import ActivePinCode from "../../../assests/commercialAdmin/ActivePinCode.svg"
import Events from "../../../assests/commercialAdmin/Events.svg"
import ActiveEvents from "../../../assests/commercialAdmin/ActiveEvents.svg"
import Settings from "../../../assests/commercialAdmin/Settings.svg"
import ActiveSettings from "../../../assests/commercialAdmin/ActiveSettings.svg"
import LogoutIcon from "../../../assests/commercialAdmin/LogoutIcon.svg"
import LogoutWhite from "../../../assests/commercialAdmin/LogoutWhiteIcon.svg"
import Logo from "../../../assests/commercialAdmin/sideBarQRDoorManLogo.svg"


function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const propertyId = localStorage.getItem("commercialPropId");
    const propertyName = localStorage.getItem("commercialPropName");
    const propertyEmail = localStorage.getItem("commercialPropEmail");



    const [isHovered, setIsHovered] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.clear();
        alert("You have been logged out successfully.");
        navigate("/login")
    }


    // const isActive = (path) => location.pathname === path;
    const isActive = (path) => {
        if (path === '/commercial-admin/settings' &&
            (location.pathname.startsWith('/commercial-admin/settings_app_layout') ||
                location.pathname.startsWith('/commercial-admin/settings_visitor_screen'))) {
            return true;
        }
        return location.pathname === path;
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", height: "100vh", maxWidth: 320, background: "#F3F3F3" }}>

            <img src={Logo} style={{ margin: "1.2rem 0rem 1.1rem 0rem" }} alt="" />

            <Divider sx={{ border: "1px solid #566D90", width: 130, opacity: "70%", borderRadius: "0.75rem" }}></Divider>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "self-start", width: 130, mt: "1.5rem" }}>
                <img src={HouseBuilding} width={42} alt="" />
                <Typography sx={{ fontFamily: 'var(--font-family-baloo)', fontWeight: "700", color: "#566D90", mt: "0.5rem" }}>
                    {/* Property Name */}
                    {propertyName}
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-family-primary)', fontSize: "0.8rem", color: "#566D90" }}>
                    {/* sample@gmail.com */}
                    {propertyEmail}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "self-start", width: 130, mt: "3rem" }}>
                <Button
                    sx={{ ...buttonStyle, color: isActive("/commercial-admin") ? "#F69300" : "#566D90" }}
                    startIcon={<img src={isActive("/commercial-admin") ? ActiveDashboardIcon : DashboardIcon} />}
                    onClick={() => handleNavigation("/commercial-admin")}
                >
                    Dashboard
                </Button>
                <Button
                    sx={{ ...buttonStyle, color: isActive("/commercial-admin/residents") ? "#F69300" : "#566D90", paddingRight: "0.9rem" }}
                    startIcon={<img src={isActive("/commercial-admin/residents") ? ActiveResidents : Residents} />}
                    onClick={() => handleNavigation("/commercial-admin/residents")}
                >
                    Residents
                </Button>
                <Button
                    sx={{ ...buttonStyle, color: isActive("/commercial-admin/pincode") ? "#F69300" : "#566D90", paddingRight: "1rem" }}
                    startIcon={<img src={isActive("/commercial-admin/pincode") ? ActivePinCode : PinCode} />}
                    onClick={() => handleNavigation("/commercial-admin/pincode")}
                >
                    PIN Code
                </Button>
                <Button
                    sx={{ ...buttonStyle, color: isActive("/commercial-admin/events") ? "#F69300" : "#566D90", paddingRight: "2.1rem" }}
                    startIcon={<img src={isActive("/commercial-admin/events") ? ActiveEvents : Events} />}
                    onClick={() => handleNavigation("/commercial-admin/events")}
                >
                    Events
                </Button>
                <Button
                    sx={{ ...buttonStyle, color: isActive("/commercial-admin/settings") ? "#F69300" : "#566D90", paddingRight: "1.5rem" }}
                    startIcon={<img src={isActive("/commercial-admin/settings") ? ActiveSettings : Settings} />}
                    onClick={() => handleNavigation("/commercial-admin/settings")}
                >
                    Settings
                </Button>
            </Box>

            <Box sx={{ position: "absolute", bottom: 100 }}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.85rem", color: "#566D90" }}>Property ID:{" "}
                    <Typography component="span" sx={{ fontFamily: "Poppins", fontSize: "0.85rem", color: "#566D90", fontWeight: 500 }}>
                        {propertyId}
                    </Typography>
                </Typography>
                <Button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    sx={LogoutButton} startIcon={<img src={isHovered ? LogoutWhite : LogoutIcon} />} onClick={handleLogout}> Log out</Button>
            </Box>

        </Box >
    )
}


const buttonStyle = {
    fontFamily: "Raleway",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#566D90",
    textTransform: "none",
    minWidth: 130,
    justifyContent: "space-between",
    display: "flex",
    '&:hover': {
        backgroundColor: '#E2E2E2',
    }
}

const LogoutButton = {
    mt: "1.5rem", borderRadius: "1.1rem", border: "1px solid #566D90", padding: "0.27rem 2.5rem", textTransform: "none", gap: "1rem", fontFamily: "Poppins", fontSize: "0.7rem", color: "#566D90",
    '&:hover': {
        backgroundColor: '#2A3649',
        color: "#FFF"
    }
}
export default SideBar





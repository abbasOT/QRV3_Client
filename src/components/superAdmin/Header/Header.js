import React from "react";
import NotificationIcon from "../../../assests/notification_icon.svg";
import Logo from "../../../assests/header_logo.png";

import DashboardIcon from "../../../assests/superAdmin/dashboard_icon.svg";
import AddPropertyIcon from "../../../assests/superAdmin/addprop_icon.svg";
import CommercialIcon from "../../../assests/superAdmin/commercial_icon.svg";
import ResidentialIcon from "../../../assests/superAdmin/residential_icon.svg";
import SubscriptionIcon from "../../../assests/superAdmin/subscription_icon.svg";
import PCBIcon from "../../../assests/superAdmin/pcb_icon.svg";
import { Link, useLocation } from 'react-router-dom';

import "../../../App.css";

const NavItemsStyle = {
  margin: "30px",
  textDecoration: "none",
};

const NavItemsColor = {
  color: 'white',
  whiteSpace: 'nowrap',
  fontFamily:"Raleway",
  fontWeight:"600"
};

const selectedNavStyle = {
  ...NavItemsColor,
  color: '#E3982A',
  
};

const Header = () => {
  const location = useLocation();


  return (
    <div className="container-fluid" style={{ backgroundColor: "#2A3649" }}>
      <div className="row d-flex">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="col-8 d-flex justify-content-center align-items-center">
          <Link to="/dashboard" style={NavItemsStyle}>
            <img src={DashboardIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/dashboard' ? selectedNavStyle : NavItemsColor}>
            Dashboard
            </span>
          </Link>

          <Link to="/add_property" style={NavItemsStyle}>
            <img src={AddPropertyIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/add_property' ? selectedNavStyle : NavItemsColor}>
            Add Property
            </span>
          </Link>

          <Link to="/commercial_properties" style={NavItemsStyle}>
            <img src={CommercialIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/commercial_properties' ? selectedNavStyle : NavItemsColor}>
            Commercial
            </span>
          </Link>

          <Link to="/residentia_properties" style={NavItemsStyle}>
            <img src={ResidentialIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/residentia_properties' ? selectedNavStyle : NavItemsColor}>
              {" "}
            Residential
            </span>
          </Link>

          <Link to="/subscription" style={NavItemsStyle}>
            <img src={SubscriptionIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/subscription' ? selectedNavStyle : NavItemsColor} >
            Subscription
            </span>
          </Link>

          <Link to="/pcb" style={NavItemsStyle}>
            <img src={PCBIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/pcb' || location.pathname ==='/stand_by_pcb' ? selectedNavStyle : NavItemsColor}>
           PCB
            </span>
          </Link>
        </div>

        <div className="col-2 d-flex justify-content-center align-items-center">
          {" "}
          <img src={NotificationIcon} alt="" />
        </div>
       
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import NotificationIcon from "../../../assests/notification_icon.svg";
import Logo from "../../../assests/header_logo.png";

import DashboardIcon from "../../../assests/superAdmin/dashboard_icon.svg";
import AddPropertyIcon from "../../../assests/superAdmin/addprop_icon.svg";
import CommercialIcon from "../../../assests/superAdmin/commercial_icon.svg";
import ResidentialIcon from "../../../assests/superAdmin/residential_icon.svg";
import SubscriptionIcon from "../../../assests/superAdmin/subscription_icon.svg";
import PCBIcon from "../../../assests/superAdmin/pcb_icon.svg";

import DashboardOrgIcon from "../../../assests/superAdmin/dashboard_org_icon.svg";
import AddPropertyOrgIcon from "../../../assests/superAdmin/addprop_org_icon.svg";
import CommercialOrgIcon from "../../../assests/superAdmin/commercial_org_icon.svg";
import ResidentialOrgIcon from "../../../assests/superAdmin/residential_org_icon.svg";
import SubscriptionOrgIcon from "../../../assests/superAdmin/subscription_org_icon.svg";
import PCBOrgIcon from "../../../assests/superAdmin/pcb_org_icon.svg";

import { Link, useLocation } from 'react-router-dom';

import "../../../App.css";

const NavItemsStyle = {
  margin: "30px",
  textDecoration: "none",
  display:"flex"
};

const NavItemsColor = {
  color: 'white',
  whiteSpace: 'nowrap',
  fontFamily:"Raleway",
  fontWeight:"500",
  marginLeft:"10px",
  fontSize:"18px"
};

const selectedNavStyle = {
  ...NavItemsColor,
  color: '#E3982A',
  
};

const container ={
  // minWidth:"1200px",
  backgroundColor: "#2A3649"
}

const Header = () => {
  const location = useLocation();


  return (
    <div className="container-fluid" style={container}>
      <div className="row d-flex">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="col-8 d-flex justify-content-center align-items-center">
          <Link to="/dashboard" style={NavItemsStyle}>
            <img src={location.pathname === '/dashboard' ?DashboardOrgIcon:DashboardIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/dashboard' ? selectedNavStyle : NavItemsColor}>
            Dashboard
            </span>
          </Link>

          <Link to="/add_property" style={NavItemsStyle}>
            <img src={location.pathname === '/add_property' ?AddPropertyOrgIcon:AddPropertyIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/add_property' ? selectedNavStyle : NavItemsColor}>
            Add Property
            </span>
          </Link>

          <Link to="/commercial_properties" style={NavItemsStyle}>
            <img src={location.pathname === '/commercial_properties' ?CommercialOrgIcon:CommercialIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/commercial_properties' ? selectedNavStyle : NavItemsColor}>
            Commercial
            </span>
          </Link>

          <Link to="/residentia_properties" style={NavItemsStyle}>
            <img src={location.pathname === '/residentia_properties' ?ResidentialOrgIcon:ResidentialIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/residentia_properties' ? selectedNavStyle : NavItemsColor}>
              {" "}
            Residential
            </span>
          </Link>

          <Link to="/subscription" style={NavItemsStyle}>
            <img src={location.pathname === '/subscription' ?SubscriptionOrgIcon:SubscriptionIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/subscription' ? selectedNavStyle : NavItemsColor} >
            Subscription
            </span>
          </Link>

          {/* <Link to="/pcb" style={NavItemsStyle}>
            <img src={location.pathname === '/pcb' || location.pathname ==='/stand_by_pcb' ?PCBOrgIcon:PCBIcon} alt="" />{" "}
            <span className="" style={location.pathname === '/pcb' || location.pathname ==='/stand_by_pcb' ? selectedNavStyle : NavItemsColor}>
           PCB
            </span>
          </Link> */}

          <Link to="/pcb" style={NavItemsStyle}>
            <img src={location.pathname === '/pcb' || location.pathname ==='/stand_by_pcb' ?PCBOrgIcon:PCBIcon} alt="" />{" "}
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

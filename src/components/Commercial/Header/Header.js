import React, { useState } from "react";
import NotificationIcon from "../../../assests/notification_icon.svg";
import Logo from "../../../assests/header_logo.png";
import ResidentIcon from "../../../assests/resident.svg";
import PincodeIcon from "../../../assests/pincode.svg";
import VisitorScreen from "../../../assests/visitorscreen.svg";
import Events from "../../../assests/events.svg";
import LightIcon from "../../../assests/light.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import EditIcon from "../../../assests/edit_icon.svg";
import GoIcon from "../../../assests/go_next.svg";

import ResidentOrgIcon from "../../../assests/org1.svg";
import PincodeOrgIcon from "../../../assests/org2.svg";
import VisitorScreenOrg from "../../../assests/org3.svg";
import EventsOrg from "../../../assests/org4.svg";
import LightOrgIcon from "../../../assests/org5.svg";

const NavItemsStyle = {
  margin: "30px",
  textDecoration: "none",
  display: "flex",
};

const NavItemsColor = {
  color: "white",
  whiteSpace: "nowrap",
  fontFamily: "Raleway",
  fontWeight: "500",
  marginLeft: "10px",
  fontSize: "18px",
};

const selectedNavStyle = {
  ...NavItemsColor,
  color: "#E3982A",
};

const Header = () => {
  const [showModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const propId = localStorage.getItem("PropertyId");

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userKey');
    navigate("/login");
  };
  function MouseOver(event) {
    event.target.style.color = "#E3982A";
    event.target.style.fontSize = "20px"; // Change font size on mouseover
    setIsHovered(true);
  }

  function MouseOut(event) {
    if (!location.pathname.includes("/property_residents")) {
      event.target.style.color = "white";
      event.target.style.fontSize = "18px";
      // Change font size back on mouseout
      setIsHovered(false);
    }
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#2A3649" }}>
      <div className="row d-flex">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="col-8 d-flex justify-content-center align-items-center">
          <Link
            to={`/property_residents/${propId}`}
            style={NavItemsStyle}
         
          >
            <img
              src={
                location.pathname.includes("/property_residents") 
                  ? ResidentOrgIcon
                  : ResidentIcon
              }
              alt=""
            />{" "}
            <span
              className=""
              style={
                location.pathname.includes("/property_residents") 
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              Residents
            </span>
          </Link>

          <Link to="/pin_code" style={NavItemsStyle}>
            <img
              src={
                location.pathname === "/pin_code"  ? PincodeOrgIcon : PincodeIcon
              }
              alt=""
            />{" "}
            <span
              className=""
              style={
                location.pathname === "/pin_code" 
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              PIN Code
            </span>
          </Link>

          <Link to="/visitor_screen" style={NavItemsStyle}>
            <img
              src={
                location.pathname === "/visitor_screen"
                  ? VisitorScreenOrg
                  : VisitorScreen
              }
              alt=""
            />{" "}
            <span
              className=""
              style={
                location.pathname === "/visitor_screen"
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              Visitor Screen
            </span>
          </Link>

          <Link to="/events" style={NavItemsStyle}>
            <img
              src={location.pathname === "/events" ? EventsOrg : Events}
              alt=""
            />{" "}
            <span
              className=""
              style={
                location.pathname === "/events"
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              {" "}
              Events
            </span>
          </Link>

          <Link to="/light_timer" style={NavItemsStyle}>
            <img
              src={
                location.pathname === "/light_timer" ? LightOrgIcon : LightIcon
              }
              alt=""
            />{" "}
            <span
              className=""
              style={
                location.pathname === "/light_timer"
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              Light Timer
            </span>
          </Link>
        </div>

        <div
          className="col-2 d-grid justify-content-center align-items-center"
          style={{ height: "fit-content", margin: "auto" }}
        >
          {" "}
          <div className="d-flex align-items-center">
            <img style={{ cursor: "pointer" }} src={NotificationIcon} alt="" />
            <Link to={"/profile"}>
              <img style={{ cursor: "pointer" }} src={EditIcon} alt="" />
            </Link>
          </div>
          <div>
            <img style={{ cursor: "pointer" }} src={GoIcon} alt=""  onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

{
  /* <div className="header">

<div className="logo">Your Logo</div>


</div>


*/
}

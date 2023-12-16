import React from "react";
import NotificationIcon from "../../../assests/notification_icon.svg";
import Logo from "../../../assests/header_logo.png";
import ResidentIcon from "../../../assests/resident.svg";
import PincodeIcon from "../../../assests/pincode.svg";
import VisitorScreen from "../../../assests/visitorscreen.svg";
import Events from "../../../assests/events.svg";
import LightIcon from "../../../assests/light.svg";
import { Link, useLocation,useNavigate } from "react-router-dom";
import "../../../App.css";

const NavItemsStyle = {
  margin: "30px",
  textDecoration: "none",
};

const NavItemsColor = {
  color: "white",
  whiteSpace: "nowrap",
  fontFamily: "Raleway",
  fontWeight: "600",
};

const selectedNavStyle = {
  ...NavItemsColor,
  color: "#E3982A",
};

const Header = () => {
  const navigate =useNavigate()
  const location = useLocation();

  const handleLogout = () => {
 
    localStorage.clear();

    navigate("/login");
  };
  return (
    <div className="container-fluid" style={{ backgroundColor: "#2A3649" }}>
      <div className="row d-flex">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="col-8 d-flex justify-content-center align-items-center">
          <Link to="/property_residents" style={NavItemsStyle}>
            <img src={ResidentIcon} alt="" />{" "}
            <span
              className=""
              style={
                location.pathname === "/property_residents"
                  ? selectedNavStyle
                  : NavItemsColor
              }
            >
              Residents
            </span>
          </Link>

          <Link to="/pin_code" style={NavItemsStyle}>
            <img src={PincodeIcon} alt="" />{" "}
            <span className=""  style={
                location.pathname === "/pin_code"
                  ? selectedNavStyle
                  : NavItemsColor
              }>
              PIN Code
            </span>
          </Link>

          <Link to="/visitor_screen" style={NavItemsStyle}>
            <img src={VisitorScreen} alt="" />{" "}
            <span className="" style={
                location.pathname === "visitor_screen"
                  ? selectedNavStyle
                  : NavItemsColor
              }>
              Visitor Screen
            </span>
          </Link>

          <Link to="/events" style={NavItemsStyle}>
            <img src={Events} alt="" />{" "}
            <span className=""  style={
                location.pathname === "/events"
                  ? selectedNavStyle
                  : NavItemsColor
              }>
              {" "}
              Events
            </span>
          </Link>

          <Link to="/light_timer" style={NavItemsStyle}>
            <img src={LightIcon} alt="" />{" "}
            <span className=""  style={
                location.pathname === "/light_timer"
                  ? selectedNavStyle
                  : NavItemsColor
              }>
              Light Timer
            </span>
          </Link>
        </div>

        <div className="col-2 d-flex justify-content-center align-items-center">
          {" "}
          <img src={NotificationIcon} alt="" />
          <button onClick={handleLogout}>
              Logout
          </button>
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

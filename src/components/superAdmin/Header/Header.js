import React, { useState, useEffect } from "react";
import axios from 'axios';
import NotificationIcon from "../../../assests/notification_icon.svg";
import AppUsersIcon from "../../../assests/superAdmin/appUser.svg";
import AppUsersOrgIcon from "../../../assests/superAdmin/activeAppUser.svg";
import NotificationOrgIcon from "../../../assests/superAdmin/notification.svg"
import EditOrgIcon from "../../../assests/superAdmin/edit.svg"
import GoOrgIcon from "../../../assests/superAdmin/logout.svg"
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
import EditIcon from "../../../assests/edit_icon.svg";
import GoIcon from "../../../assests/go_next.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import Notifications from "../../../pages/superAdmin/Notifications/Notifications";
import { getDatabase, ref, onValue, get, push, update } from "firebase/database";




const Header = () => {

  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  // const toggleDrawer = (open) => {

  //   setIsDrawerOpen(open);
  //   setActiveLink(open ? 'notification' : null);
  // };
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
    setActiveLink(open ? 'notification' : null);
    if (open) {
      setTimeout(() => {
        const timestamp = Date.now(); // Get the current timestamp in milliseconds

        // Reference to the desired Firebase node
        const db = getDatabase();
        const timestampRef = ref(db, `/superadminit38XGIc27Q8HDXoZwe1OzI900u1`);

        // Update only the timestamp in Firebase
        update(timestampRef, {
          LastSuperAdminNotificationClick: timestamp
        })
          .then(() => {
            console.log("Timestamp successfully saved to Firebase");
          })
          .catch((error) => {
            console.error("Error updating timestamp in Firebase:", error);
          });

      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('superEmail');

    navigate("/super-login");
  };

  const [notifications, setNotifications] = useState([]);


  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://ot-technologies.com/super/get_notifications`
  //       );
  //       // Assuming the response data format includes 'unRead' as an array
  //       const { unRead } = response.data;
  //       // Check if unRead is an array, if not, default to an empty array
  //       const unreadNotifications = Array.isArray(unRead) ? unRead : [];

  //       console.log('Unread Notifications:', unreadNotifications); // Log extracted unread notifications

  //       // Update the state with the retrieved notifications
  //       setNotifications({ unRead: unreadNotifications });

  //       console.log("Notifications retrieved successfully");
  //     } catch (error) {
  //       // Handle errors
  //       if (error.response && error.response.data) {
  //         console.error("Error retrieving Notifications:", error.response.data);
  //       } else {
  //         alert("An error occurred while retrieving Notifications");
  //       }
  //       console.error("Error retrieving Notifications:", error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []); // Empty dependency array ensures this runs once on component mount

  // console.log(notifications);



  useEffect(() => {
    // Initialize Firebase database reference
    const database = getDatabase();
    const notificationsRef = ref(database, "/superadminit38XGIc27Q8HDXoZwe1OzI900u1/notifications/unRead");

    // Real-time listener for notifications
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const unReadNotifications = snapshot.val() || {};
      const unReadArray = Object.values(unReadNotifications);

      console.log('Unread Notifications:', unReadArray); // Log the unread notifications

      // Update the state with the retrieved notifications
      setNotifications(unReadArray);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once on component mount

  console.log(notifications, "Real-time notifications");





  const NavItemsColor = {
    color: 'white',
    whiteSpace: 'nowrap',
    fontFamily: "Raleway",
    fontWeight: "500",
    marginLeft: "10px",
    fontSize: "18px",

  };

  const NavItemsStyle = {
    margin: "30px",
    textDecoration: "none",
    display: "flex",
    gap: "0.5rem",


  };



  const selectedNavStyle = {
    ...NavItemsColor,
    color: '#E3982A',


  };

  const container = {

    backgroundColor: "#2A3649",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  }
  const navTextHover = {
    ...NavItemsColor,
    color: '#E3982A',
    transform: "scale(1.15)",
  };

  return (
    <div className="container-fluid" style={container}>
      <div className="row d-flex" style={{ width: "1600px", minWidth: "1200px" }}>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="col-10 d-flex justify-content-evenly align-items-center">

          <Link
            to="/dashboard"
            style={NavItemsStyle}
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter('dashboard')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'dashboard' || location.pathname === '/dashboard' ? DashboardOrgIcon : DashboardIcon}
              alt=""
              style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", }}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/dashboard' ? selectedNavStyle : (hoveredLink === 'dashboard' ? navTextHover : NavItemsColor)}
            >
              Dashboard
            </span>
          </Link>

          <Link
            to="/add_property"
            style={NavItemsStyle}
            onMouseEnter={() => handleMouseEnter('add_property')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'add_property' || location.pathname === '/add_property' ? AddPropertyOrgIcon : AddPropertyIcon}
              alt=""
              style={hoveredLink === 'add_property' && location.pathname !== '/add_property' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/add_property' ? selectedNavStyle : (hoveredLink === 'add_property' ? navTextHover : NavItemsColor)}
            >
              Add Property
            </span>
          </Link>

          <Link
            to="/commercial_properties"
            style={NavItemsStyle}
            onMouseEnter={() => handleMouseEnter('commercial_properties')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'commercial_properties' || location.pathname === '/commercial_properties' ? CommercialOrgIcon : CommercialIcon}
              alt=""
              style={hoveredLink === 'commercial_properties' && location.pathname !== '/commercial_properties' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/commercial_properties' ? selectedNavStyle : (hoveredLink === 'commercial_properties' ? navTextHover : NavItemsColor)}
            >
              Commercial
            </span>
          </Link>

          <Link
            to="/app_users"
            style={NavItemsStyle}
            onMouseEnter={() => handleMouseEnter('app_users')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'app_users' || location.pathname === '/app_users' ? AppUsersOrgIcon : AppUsersIcon}
              alt=""
              style={hoveredLink === 'app_users' && location.pathname !== '/app_users' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/app_users' ? selectedNavStyle : (hoveredLink === 'app_users' ? navTextHover : NavItemsColor)}
            >
              App Users
            </span>
          </Link>


          {/* <Link
            to="/residential_properties"
            style={NavItemsStyle}
            onMouseEnter={() => handleMouseEnter('residential_properties')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'residential_properties' || location.pathname === '/residential_properties' ? ResidentialOrgIcon : ResidentialIcon}
              alt=""
              style={hoveredLink === 'residential_properties' && location.pathname !== '/residential_properties' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/residential_properties' ? selectedNavStyle : (hoveredLink === 'residential_properties' ? navTextHover : NavItemsColor)}
            >
              Residential
            </span>
          </Link> */}
          {/* {(location.pathname === '/stand_by_properties' || location.pathname === '/stand_by_pcb') &&
            <Link
              to="/subscription"
              style={NavItemsStyle}
              onMouseEnter={() => handleMouseEnter('subscription')}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={hoveredLink === 'subscription' || location.pathname === '/subscription' ? SubscriptionOrgIcon : SubscriptionIcon}
                alt=""
                style={hoveredLink === 'subscription' && location.pathname !== '/subscription' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
              />
              <span
                className="nav-item-text"
                style={location.pathname === '/subscription' ? selectedNavStyle : (hoveredLink === 'subscription' ? navTextHover : NavItemsColor)}
              >
                Subscription
              </span>
            </Link>
          } */}

          <Link
            to="/pcb"
            style={NavItemsStyle}
            onMouseEnter={() => handleMouseEnter('pcb')}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredLink === 'pcb' || location.pathname === '/pcb' ? PCBOrgIcon : PCBIcon}
              alt=""
              style={hoveredLink === 'pcb' && location.pathname !== '/pcb' ? { transform: "scale(1.40)", transition: "transform 0.1s ease-in-out" } : {}}
            />
            <span
              className="nav-item-text"
              style={location.pathname === '/pcb' || location.pathname === '/stand_by_pcb' ? selectedNavStyle : (hoveredLink === 'pcb' ? navTextHover : NavItemsColor)}
            >
              PCB
            </span>
          </Link>
        </div>

        <div
          className="col-1 d-grid justify-content-center align-items-center"
          style={{ height: "fit-content", margin: "auto" }}
        >
          {" "}
          <div className="d-flex align-items-center">
            <img style={{ cursor: "pointer", }} onMouseEnter={() => handleMouseEnter('notification')} onMouseLeave={handleMouseLeave}
              src={activeLink === 'notification' || hoveredLink === 'notification' ? NotificationOrgIcon : NotificationIcon}
              onClick={() => toggleDrawer(true)}

              alt="" />
            <Link to={"/superProfile"} onMouseEnter={() => handleMouseEnter('superProfile')} onMouseLeave={handleMouseLeave} >
              <img style={{ cursor: "pointer", width: 24, }} src={hoveredLink === 'superProfile' || location.pathname === '/superProfile' ? EditOrgIcon : EditIcon} alt="" />
            </Link>
          </div>
          <div onMouseEnter={() => handleMouseEnter('logout')} onMouseLeave={handleMouseLeave}>
            <img style={{ cursor: "pointer", marginLeft: "1.3rem", marginTop: "-1rem" }} src={hoveredLink === 'logout' ? GoOrgIcon : GoIcon} alt="" onClick={handleLogout} />
          </div>
        </div>

      </div>
      <Notifications isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} notifications={notifications} />
    </div>
  );
};

export default Header;

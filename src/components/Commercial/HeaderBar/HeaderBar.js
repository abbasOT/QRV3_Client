import React, { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountEditIcon from "../../../assests/commercialAdmin/accountEditIcon.svg"
import { Box, Typography, Badge, Divider } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import ActiveAccountEditIcon from "../../../assests/superAdmin/edit.svg"
import Notifications from '../../../pages/superAdmin/Notifications/Notifications';
import axios from 'axios';
import CommercialNotifications from '../CommercialNotifications/CommercialNotifications';
import { getDatabase, ref, onValue, get, push, update } from "firebase/database";


function HeaderBar() {

    const location = useLocation();
    const navigate = useNavigate()
    const path = location.pathname;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notification, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState([]);

    let com_prop_id = localStorage.getItem("userKey");
    const commercial_prop_id = localStorage.getItem("commercialPropId")
    const propertyId = commercial_prop_id



    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         try {
    //             const response = await axios.get(`https://ot-technologies.com/commercialAdmin/get_notifications/${com_prop_id}?propertyId=${propertyId}`);
    //             const { readNotifications, unReadNotifications, unreadCount } = response.data;

    //             console.log('Unread Notifications:', unReadNotifications); // Log extracted unread notifications
    //             console.log('Unread Notifications Count:', unreadCount); // Log unread notifications count

    //             // Update the state with the retrieved notifications
    //             setNotifications({
    //                 read: readNotifications,
    //                 unRead: unReadNotifications,
    //             });
    //             setUnreadCount(unreadCount); // Update state for unread count

    //             console.log("Notifications retrieved successfully");
    //         } catch (error) {
    //             // Handle errors
    //             if (error.response && error.response.data) {
    //                 console.error("Error retrieving Notifications:", error);
    //             } else {
    //                 alert("An error occurred while retrieving Notifications");
    //             }
    //             console.error("Error retrieving Notifications:", error);
    //         }
    //     };

    //     fetchNotifications();
    // }, [])

    // console.log(unreadCount, notification, "notifications in the header")




    useEffect(() => {
        const database = getDatabase();
        const notificationsRef = ref(database, `/property/${propertyId}/commercialAdmin/notifications`);

        const handleNotifications = (snapshot) => {
            const readSnapshot = snapshot.child("read");
            const unReadSnapshot = snapshot.child("unRead");

            const readNotifications = readSnapshot.val() ? Object.values(readSnapshot.val()) : [];
            const unReadNotifications = unReadSnapshot.val() ? Object.values(unReadSnapshot.val()) : [];

            setNotifications({
                read: readNotifications,
                unRead: unReadNotifications,
            });

            setUnreadCount(unReadNotifications.length);
        };

        // Attach the listener for real-time updates
        onValue(notificationsRef, handleNotifications);


    }, [propertyId]);

    console.log(unreadCount, notification, "notifications in the header");




    const updateNotifications = async () => {
        try {
            const response = await axios.post(`https://ot-technologies.com/commercialAdmin/update_notifications/${com_prop_id}?propertyId=${propertyId}`);
            console.log(response.data.message);

            // After updating, refresh notifications
            const fetchResponse = await axios.get(`https://ot-technologies.com/commercialAdmin/get_notifications/${com_prop_id}?propertyId=${propertyId}`);
            const { readNotifications, unReadNotifications } = fetchResponse.data;

            // Update the state with the latest notifications
            setNotifications({
                read: readNotifications,
                unRead: unReadNotifications,
            });
            setUnreadCount(unReadNotifications.length); // Update state for unread count
        } catch (error) {
            console.error("Error updating notifications:", error);
        }
    };




    const pathToHeading = {
        "/commercial-admin/residents": "Residents",
        "/commercial-admin/pincode": "PIN Code",
        "/commercial-admin/events": "Events",
        "/commercial-admin/settings": "Settings",
        "/commercial-admin/settings_app_layout": "Settings",
    };

    const heading = pathToHeading[path] || "Dashboard";




    const toggleDrawer = (open) => {
        updateNotifications();
        setIsDrawerOpen(open);
        if (open) {
            setTimeout(() => {
                const timestamp = Date.now(); // Get the current timestamp in milliseconds

                // Reference to the desired Firebase node
                const db = getDatabase();
                const timestampRef = ref(db, `/commercial/${com_prop_id}`);

                // Update only the timestamp in Firebase
                update(timestampRef, {
                    LastCommercialAdminNotificationClick: timestamp
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
    const handleAccount = () => {
        navigate("account");
    };



    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "5.7rem", }}>
                <Typography sx={{ fontFamily: "Raleway", fontSize: "1.5rem", fontWeight: 700, color: "#566D90" }}>
                    {heading}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", paddingRight: "0.5rem" }}>
                    <Box sx={{ borderRadius: "50%", padding: "0.2rem", border: "1px solid #FFFFFF", '&:hover': { border: "1px solid #B1B1B1", }, }}>
                        <Badge badgeContent={unreadCount} sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '0.75rem', // Adjust font size
                                width: '15px', // Adjust width
                                height: '15px', // Adjust height
                                minWidth: 'unset',
                                backgroundColor: '#D0301F', // Custom background color
                                color: '#FFF',
                            }
                        }}>
                            <NotificationsIcon sx={{ color: '#566D90', cursor: "pointer" }} onClick={() => toggleDrawer(true)} />
                        </Badge>
                    </Box>
                    <Box sx={{ borderRadius: "50%", padding: "0.2rem", border: "1px solid #FFFFFF", '&:hover': { border: path !== "/commercial-admin/account" && "1px solid #B1B1B1", }, }}>
                        <img src={path === "/commercial-admin/account" ? ActiveAccountEditIcon : AccountEditIcon} style={{ cursor: "pointer", marginTop: "-0.3rem", width: path === "/commercial-admin/account" && 25, }} onClick={handleAccount} />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ border: "1px solid #B1B1B1", opacity: "50%" }} />


            <CommercialNotifications isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} notifications={notification} />
        </>
    )
}

export default HeaderBar

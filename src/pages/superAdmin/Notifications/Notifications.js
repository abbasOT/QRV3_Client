import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import NotificationsCard from '../../../components/superAdmin/NotificationsCard/NotificationsCard';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseDeleteAllcon from "../../../assests/superAdmin/closeDeleteAllcon.svg"
import DeleteDialogue from "../../../components/superAdmin/DeleteDialogue/DeleteDialogue";

import { getDatabase, ref, onValue, get, push, update, remove } from "firebase/database";



const Notifications = ({ isOpen, toggleDrawer, notifications }) => {


    console.log('in the drawer', notifications);
    const unreadNotifications = notifications || [];
    const [lastClickTimestamp, setLastClickTimestamp] = useState(0);
    const [sortedNotifications, setSortedNotifications] = useState([]);
    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);


    const handleDelete = async () => {
        const db = getDatabase();
        const notificationsRef = ref(db, '/superadminit38XGIc27Q8HDXoZwe1OzI900u1/notifications/unRead');

        try {
            // Attempt to remove the notifications
            await remove(notificationsRef);
            setSortedNotifications([])
            console.log("All unread notifications removed successfully.");
        } catch (error) {
            console.error("Error deleting notifications:", error);
        }

        // Hide the delete dialogue after the operation
        setShowDeleteDialogue(false);
    };

    const handleDeleteDialogueOpen = () => {
        setShowDeleteDialogue(true);
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };

    // const sortedNotifications = [...unreadNotifications].sort((a, b) => b.timestamp - a.timestamp);
    // const lastClickTimestamp = parseInt(localStorage.getItem('LastSuperAdminNotificationClick') || '0', 10);

    useEffect(() => {
        const db = getDatabase();
        const timestampRef = ref(db, `/superadminit38XGIc27Q8HDXoZwe1OzI900u1/LastSuperAdminNotificationClick`);

        // Listen for real-time updates to the timestamp
        const unsubscribe = onValue(timestampRef, (snapshot) => {
            if (snapshot.exists()) {
                setLastClickTimestamp(snapshot.val());
            } else {
                setLastClickTimestamp(0);
            }
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Retrieve the timestamp from localStorage

        // Sort notifications and set their status based on the timestamp
        const notificationsWithStatus = [...unreadNotifications].map(notification => ({
            ...notification,
            status: notification.timestamp < lastClickTimestamp ? 0 : 3,
        })).sort((a, b) => b.timestamp - a.timestamp);

        setSortedNotifications(notificationsWithStatus);
    }, [unreadNotifications, lastClickTimestamp]);



    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => toggleDrawer(false)}
            PaperProps={{
                sx: { display: 'flex', top: 88, width: 370, height: "85vh", padding: "3rem 1rem 1.5rem 1rem", position: "absolute", background: "#2A3649", alignItems: 'center', borderRadius: "0rem 0rem 0rem 1.2rem" },
            }}
        >
            {/* <NotificationsCard status={1} />
            <Divider sx={{ border: "1px solid #FFF", width: "90%", opacity: "unset", margin: "2.3rem 0rem" }}></Divider>
            <NotificationsCard status={0} />
            <Divider sx={{ border: "1px solid #FFF", width: "90%", opacity: "unset", margin: "2.3rem 0rem" }}></Divider>
            <NotificationsCard status={0} /> */}


            {/* <Box sx={{
                width: 35, height: 30, background: "#2A3649", borderRadius: " 0rem 0rem 1.2rem 0rem", position: "absolute", top: 0, left: 0, boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)'
            }}>
                <IconButton sx={{ color: 'white', padding: "0.2rem 0.5rem", }} >
                    <img src={CloseDeleteAllcon} width={16} />
                </IconButton>
            </Box>
            
            <Typography sx={{ position: "absolute", top: 8, left: 45, fontFamily: "Poppins", fontSize: "0.65rem", color: "#FFF" }}>
                Deleted All
            </Typography>

            {sortedNotifications.map((notification, index) => (
                <React.Fragment key={index}>
                    <NotificationsCard status={notification.status} notification={notification} />
                    {index < sortedNotifications.length - 1 && (
                        <Divider sx={{ border: "1px solid #FFF", width: "90%", opacity: "unset", margin: "2.3rem 0rem" }} />
                    )}
                </React.Fragment>
            ))} */}


            {sortedNotifications && sortedNotifications.length > 0 ? (
                <React.Fragment>
                    {/* "Delete All" button */}
                    <Box sx={{
                        width: 35,
                        height: 30,
                        background: "#2A3649",
                        borderRadius: "0rem 0rem 1.2rem 0rem",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)'
                    }}>
                        <IconButton sx={{ color: 'white', padding: "0.2rem 0.5rem" }} onClick={handleDeleteDialogueOpen}>
                            <img src={CloseDeleteAllcon} width={16} alt="delete" />
                        </IconButton>
                    </Box>
                    <Typography sx={{
                        position: "absolute",
                        top: 8,
                        left: 45,
                        fontFamily: "Poppins",
                        fontSize: "0.65rem",
                        color: "#FFF"
                    }}>
                        Deleted All
                    </Typography>

                    {/* Notifications List */}
                    {sortedNotifications.map((notification, index) => (
                        <React.Fragment key={index}>
                            <NotificationsCard status={notification.status} notification={notification} />
                            {/* Add a Divider between cards, but not after the last card */}
                            {index < sortedNotifications.length - 1 && (
                                <Divider sx={{
                                    border: "1px solid #FFF", width: "90%", opacity: "unset", margin: "2.3rem 0rem"
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ) : (
                <Typography sx={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    fontFamily: 'Poppins',
                    fontSize: '0.9rem',
                    color: '#FFF'
                }}>
                    No notifications right now
                </Typography>
            )}



            {showDeleteDialogue && (
                <DeleteDialogue
                    handleDeleteOpen={handleDeleteDialogueOpen}
                    handleDelete={handleDelete}
                    handleDeleteClose={handleDeleteDialogueClose}
                />
            )}

        </Drawer>
    );
};

export default Notifications;

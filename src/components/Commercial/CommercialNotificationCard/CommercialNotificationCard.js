import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import PhoneIcon from "../../../assests/superAdmin/phoneIcon.svg"
import EmailIcon from "../../../assests/superAdmin/emailIcon.svg"
import UsersIcon from "../../../assests/superAdmin/usersIcon.svg"
import NotificationBell from "../../../assests/superAdmin/NotificationBellRed.svg"

function CommercialNotificationCard({ status, notification }) {
    return (
        <div>
            <Typography sx={{ textAlign: "right", fontSize: "0.6rem", color: "#FFF", fontFamily: "Poppins", paddingRight: "1rem" }}> {new Date(notification.timestamp).toLocaleDateString()} - {new Date(notification.timestamp).toLocaleTimeString()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.8rem 1.8rem", borderRadius: "1rem", background: "#FFF", minWidth: 300, maxHeight: 200, gap: "1rem", position: "relative" }}>
                {status === 3 && <Box component="img" src={NotificationBell} width={25} sx={{ position: "absolute", top: -5, right: -10 }} />}
                <Typography sx={{ textAlign: "center", fontFamily: "Poppins", fontSize: "0.8rem", fontWeight: 500, color: "#566D90" }}>
                    {notification.message}
                </Typography>
                <Divider sx={{ border: "2px solid #D9D9D9", width: "100%", opacity: "unset", borderRadius: "0.75rem" }} ></Divider>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1.7rem", }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", flexDirection: "column" }}>
                        <Box component="img" src={PhoneIcon} width={18} alt="Phone Icon" />
                        <Box component="img" src={EmailIcon} width={18} alt="Email Icon" />
                        {status === 1 && <Box component="img" src={UsersIcon} width={18} alt="Users Icon" />}
                    </Box>
                    <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "left" }}>
                        <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", fontWeight: 500, color: "#566D90" }}> {notification.userPhoneNumber}</Typography>
                        <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", fontWeight: 500, color: "#566D90" }}>{notification.userEmail}</Typography>
                        {status === 1 && <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", fontWeight: 500, color: "#566D90" }}>Total Users</Typography>}
                    </Box>
                </Box>

            </Box>
        </div >
    )
}

export default CommercialNotificationCard

import React from 'react'
import { Box, Typography, Divider } from '@mui/material';
import HouseUserWarning from "../../../assests/superAdmin/house_user_yellow.svg"
import GreenDot from "../../../assests/superAdmin/green_dot.svg";
import HouseUser from "../../../assests/superAdmin/house_user.svg"

function AppUserModalDetailsCard({ subscriptionCanceled, associations, propertyId, detail }) {
    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp, 10)); // Convert timestamp to Date object
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with 0 if needed
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
        const year = date.getFullYear(); // Get full year

        return `${month}/${day}/${year}`; // Return formatted date string
    };
    console.log(associations)
    return (
        <Box sx={{ minWidth: '314px', borderRadius: "0.6rem", boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', background: '#EEEEEE', }}>
            <div className="row">
                <div className="col text-end" style={dateStyle}>
                    {formatDate(detail.assignedDate)}
                </div>
            </div>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: "2rem", mt: -1 }}>
                <Box component="img" src={detail.paymentStatus !== "done" ? HouseUserWarning : HouseUser} />
            </Box>
            <Box sx={{ padding: "0rem 2rem", pb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "0.3rem", mt: 3 }}>
                    <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>Property ID: </Typography>
                    <Box sx={{ border: "1px solid #727272", padding: "0.2rem 1rem", borderRadius: "0.2rem", width: "60%", textAlign: "center", fontFamily: "Poppins", fontWeight: 700, color: "#727272" }}>{propertyId}</Box>
                </Box>


                {detail.intercoms.map((id, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "0.3rem", mt: 3 }}>
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>PCB ID {index + 1}: </Typography>
                        <Box sx={{ border: "1px solid #727272", padding: "0.2rem 2rem", borderRadius: "0.2rem", width: "60%", textAlign: "center", fontFamily: "Poppins", fontWeight: 700, color: "#727272", position: "relative" }}>
                            <img src={GreenDot} style={{ left: 5, top: 8, position: "absolute" }} alt="" />
                            {id}
                        </Box>
                    </Box>
                ))}

                <Divider sx={{ border: "2px solid #D9D9D9", opacity: "unset", mt: "2rem", mb: "0.5rem" }}></Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90" }}>
                        Users:
                    </Typography>
                    {associations.associatedResidentEmails.map((email, index) => (
                        <Typography key={index} sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>
                            {email}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default AppUserModalDetailsCard

const dateStyle = {
    color: "#727272",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    padding: "7px 24px 0px 0px",
};

import React from 'react'
import { Box, Typography } from '@mui/material'
import BuildingWarning from "../../../assests/superAdmin/house_building_yellow.svg"
import HouseWarning from "../../../assests/superAdmin/house_blank_yellow.svg"
import Building from "../../../assests/superAdmin/house_building.svg"
import House from "../../../assests/superAdmin/house_blank.svg"

function AppUserModalPropIdCard({ subscriptionCanceled, associations, cardValue, propertyId, paymentStatus }) {
    return (
        <Box sx={{ minWidth: '314px', maxHeight: '168px', borderRadius: "0.6rem", boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', background: '#EEEEEE', padding: "1rem 2rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mb: "2rem" }}>
                {cardValue === "1" &&
                    <Box component="img" src={paymentStatus !== "done" ? HouseWarning : House} />
                }
                {cardValue === "2" &&
                    <Box component="img" src={paymentStatus !== "done" ? BuildingWarning : Building} />
                }
            </Box>
            <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#727272" }}>link to</Typography>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: "0.3rem", mt: 0.5 }}>
                <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>Property ID: </Typography>
                <Box sx={{ border: "1px solid #727272", padding: "0.2rem 1rem", borderRadius: "0.2rem", width: "60%", textAlign: "center", fontFamily: "Poppins", fontWeight: 700, color: "#727272" }}>{propertyId}</Box>
            </Box>
        </Box>
    )
}

export default AppUserModalPropIdCard

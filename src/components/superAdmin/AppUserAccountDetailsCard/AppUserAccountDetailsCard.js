import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import HouseUserIcon from "../../../assests/superAdmin/houseUserIconSmall.svg"
import HouseBlankIcon from "../../../assests/superAdmin/houseBlankIconSmall.svg"
import HouseBuilding from "../../../assests/superAdmin/houseBuildingIconSmall.svg"
import AppUserModal from '../../../components/superAdmin/AppUserModal/AppUserModal';


function AppUserAccountDetailsCard({ bgColor, user, associations }) {



    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

    const handleDelete = () => {
        setShowDeleteDialogue(false);
    };

    const handleDeleteDialogueOpen = () => {
        setShowDeleteDialogue(true);
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };
    return (
        <>
            <Box sx={{ minWidth: 500, minHeight: 50, display: "flex", cursor: "pointer" }} onClick={handleDeleteDialogueOpen}>
                <Box sx={{ width: "65%", background: bgColor, borderRadius: "0.8rem 0rem 0rem 0.8rem", display: "flex", alignItems: "center", paddingLeft: "1rem" }}>
                    <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: bgColor === "#EEEEEE" ? "#566D90" : "#FFF" }}>{user?.email}</Typography>
                </Box>
                <Box sx={{ width: "35%", background: "#2A3649", borderRadius: "0rem 0.8rem 0.8rem 0rem", display: "flex", alignItems: "center", }}>
                    <Box sx={{ position: "relative", width: "33%", padding: "" }}>
                        <Box component="img" src={HouseUserIcon} sx={{ position: "absolute", top: 0, left: 5 }} />
                        <Typography sx={{ fontSize: "1.5rem", fontFamily: "Poppins", fontWeight: 700, color: "#FFF" }}>{associations?.adminCount}</Typography>
                    </Box>
                    <Divider orientation='vertical' sx={{ border: "1px solid #FFF", height: "85%", opacity: "unset" }} />
                    <Box sx={{ position: "relative", width: "33%" }}>
                        <Box component="img" src={HouseBlankIcon} sx={{ position: "absolute", top: 0, left: 5 }} />
                        <Typography sx={{ fontSize: "1.5rem", fontFamily: "Poppins", fontWeight: 700, color: "#FFF" }}>{associations?.propertyResidentCount}</Typography>
                    </Box>
                    <Divider orientation='vertical' sx={{ border: "1px solid #FFF", height: "85%", opacity: "unset" }} />
                    <Box sx={{ position: "relative", width: "33%" }}>
                        <Box component="img" src={HouseBuilding} sx={{ position: "absolute", top: 0, left: 5 }} />
                        <Typography sx={{ fontSize: "1.5rem", fontFamily: "Poppins", fontWeight: 700, color: "#FFF" }}>{associations?.commercialResidentCount}</Typography>
                    </Box>
                </Box>

            </Box>
            {/* <button onClick={(e) => handleDeleteDialogueOpen()}>click it </button> */}
            {showDeleteDialogue && (
                <AppUserModal
                    handleDeleteOpen={handleDeleteDialogueOpen}
                    handleDelete={handleDelete}
                    handleDeleteClose={handleDeleteDialogueClose}
                    user={user}
                    associations={associations}
                    modalContent={bgColor}
                />
            )}
        </>
    )
}

export default AppUserAccountDetailsCard

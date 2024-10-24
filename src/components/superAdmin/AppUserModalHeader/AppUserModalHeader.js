import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import TrashIcon from "../../../assests/superAdmin/trashIcon.svg"
import DeleteDialogue from '../DeleteDialogue/DeleteDialogue';
import axios from 'axios';


function AppUserModalHeader({ user, handleClickClose }) {

    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
    const [userId, setUserId] = useState("")





    const handleDelete = async () => {
        try {
            // Make a DELETE request to super/deleteProperty with the propertyId
            await axios.delete(`https://ot-technologies.com/super/deleteAppUser/${userId}`);
            setShowDeleteDialogue(false);
            handleClickClose();
        } catch (error) {
            console.error('Error deleting property:', error.message);
            setShowDeleteDialogue(false);
            handleClickClose();
        }

    };

    const handleDeleteDialogueOpen = (userId) => {
        setUserId(userId)
        setShowDeleteDialogue(true);
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };

    console.log(user, "the user i want in the header")

    return (
        <>
            <Box sx={{ width: '100%', minHeight: 95, boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)', mb: 4, display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={2.5} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90", paddingLeft: "4rem" }}>Name</Typography>
                        <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90", paddingLeft: "4rem" }}>{user.firstName}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90" }}>Last Name</Typography>
                        <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>{user.lastName}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90" }}>Phone</Typography>
                        <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>{user.phone}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90" }}>Address</Typography>
                        <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>{user.address}</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", justifyContent: "center" }} >
                        <Typography sx={{ textAlign: "start", fontSize: "0.9rem", fontFamily: "Poppins", fontWeight: 700, color: "#566D90" }}>Email</Typography>
                        <Typography sx={{ textAlign: "start", fontSize: "0.8rem", fontFamily: "Poppins", fontWeight: 500, color: "#566D90" }}>{user.email}</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ background: "#C24E42", display: "flex", minWidth: 60, alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => handleDeleteDialogueOpen(user.userId)}> <img src={TrashIcon} /></Box>
            </Box>
            {showDeleteDialogue && (
                <DeleteDialogue
                    handleDeleteOpen={handleDeleteDialogueOpen}
                    handleDelete={handleDelete}
                    handleDeleteClose={handleDeleteDialogueClose}
                />
            )}
        </>
    )
}

export default AppUserModalHeader




import React, { useState } from 'react';
import { Dialog, Box, Typography, Slide } from '@mui/material';
import AppUserModalPropIdCard from '../AppUserModalPropIdCard/AppUserModalPropIdCard';
import AppUserModalDetailsCard from '../AppUserModalDetailsCard/AppUserModalDetailsCard';
import AppUserModalHeader from '../AppUserModalHeader/AppUserModalHeader';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AppUserModal({ handleDeleteOpen, handleDeleteClose, modalContent, user, associations }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleDeleteOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleDeleteClose();
        setOpen(false);
    };

    console.log(associations);

    // Render cards based on property details
    const renderPropIdCards = () => {
        return associations.propertyDetails.map((detail, index) => {
            let cardValue = null;
            if (detail.propertyName === 'Property Owner') {
                return <AppUserModalDetailsCard key={index} detail={detail} propertyId={detail.propertyId} subscriptionCanceled={modalContent} associations={associations} />;
            } else if (detail.propertyName === 'Property Resident') {
                cardValue = "1";
            } else if (detail.propertyName === 'commercialResidents') {
                cardValue = "2";
            }

            return (
                cardValue && (
                    <AppUserModalPropIdCard
                        key={index}
                        propertyId={detail.propertyId}
                        paymentStatus={detail.paymentStatus}
                        subscriptionCanceled={modalContent}
                        associations={associations}
                        cardValue={cardValue}
                    />
                )
            );
        });
    };

    return (
        <>
            <Dialog
                open={handleClickOpen}
                onClose={handleClickClose}
                PaperProps={{
                    sx: { ...themeStyle.paperPropsStyle },
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <AppUserModalHeader user={user} handleClickClose={handleClickClose} />
                <div style={{ height: "100%", margin: "1rem", maxHeight: "50vh", overflowY: "auto", }}>
                    {(modalContent === "#E3982A" || modalContent === "#EEEEEE") && (
                        <Box sx={{ display: "flex", gap: "1rem", flexFlow: "wrap", justifyContent: "center", padding: "0.5rem" }}>
                            {renderPropIdCards()}
                        </Box>
                    )}

                    {modalContent === "#446B54" && (
                        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                            <Typography sx={{ fontSize: "4rem", fontFamily: "Poppins", fontWeight: 700, color: "#446B54" }}>Without ID</Typography>
                        </Box>
                    )}
                </div>

            </Dialog>
        </>
    );
}

const themeStyle = {
    actionButtonStyle: {
        background: '#C24E42', color: "#FFFFFF", textTransform: "none", fontFamily: 'var(--font-family-primary)', fontWeight: 500, marginTop: "1rem", fontSize: "0.9rem", padding: "0.5rem 2rem", borderRadius: "0.3rem",
        '&:hover': {
            background: 'gray',
            color: "#FFF"
        },
        width: "100%"
    },
    paperPropsStyle: {
        background: "#FFF",
        width: "100%",
        minWidth: { xl: "60%", xs: "70%" },
        paddingBottom: "2rem",
        borderRadius: "1.2rem",
        height: "100%",
        maxHeight: "70vh", // Set a maximum height for the container

    },
    textStyle: {
        fontFamily: 'var(--font-family-primary)',
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1rem",
        color: "#C24E42"
    },
}

export default AppUserModal;

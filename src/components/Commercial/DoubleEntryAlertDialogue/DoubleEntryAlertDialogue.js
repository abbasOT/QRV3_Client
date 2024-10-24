import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, Divider, Typography } from '@mui/material';
import PersonIcon from "../../../assests/commercialAdmin/doubleEntryPersonIcon.svg"
import { ButtonStyle } from '../CommercialSettings/CommercialSettings';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DoubleEntryAlertDialogue({ handleDoubleEntryAlertOpen, handleDoubleEntryAlert, handleDoubleEntryAlertClose }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleDoubleEntryAlertOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleDoubleEntryAlertClose();
        setOpen(false)
    }

    const handleOkClick = () => {
        handleDoubleEntryAlert();
        setOpen(false)
    }

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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>


                    <Box component="img" src={PersonIcon} mt={"2.2rem"} />

                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.8rem", color: "#566D90", maxWidth: 450, textAlign: "center", mt: "1rem", border: "2px solid #EEEEEE",
                        padding: "1rem 2rem"
                    }}>
                        This functionality has been   <Box component="span" sx={{ fontWeight: 600, }}> designed to be operated by technicians,</Box>it may require prior cable connections.
                    </Typography>

                    <Box sx={{ borderRadius: "5px", background: "#EEEEEE", fontSize: "0.8rem", color: "#B1B1B1", fontFamily: "Poppins", width: 280, mt: "2.4rem", padding: "0.5rem", textAlign: "center" }} >Please enter the technician password </Box>
                    <Button sx={{
                        ...ButtonStyle, width: 210, m: "1rem 0rem", boxShadow: '0px 4px 4px 0px #00000040'
                    }} onClick={handleOkClick}>
                        Ok
                    </Button>

                </Box>

            </Dialog>
        </>
    );

}
const themeStyle = {

    paperPropsStyle: {
        background: "#FFF",
        borderRadius: "1.9rem",
        width: "auto",
        minWidth: "30%",
        padding: "2rem 1.5rem 0.5rem 1.5rem",

    },

}
export default DoubleEntryAlertDialogue
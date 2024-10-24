import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, Divider, Typography } from '@mui/material';
import WarningRed from "../../../assests/commercialAdmin/warningRed.svg"
import WarningEmail from "../../../assests/commercialAdmin/warningEmail.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EmailDialogue({ handleEmailOpen, handleEmailClose, handleEmail }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleEmailOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleEmailClose();
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
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%", gap: "2rem" }}>
                    <Box component="img" sx={{ textAlign: "center" }} src={WarningRed} />
                    <Box component="img" sx={{ textAlign: "center" }} src={WarningEmail} />
                    <Box component="img" sx={{ textAlign: "center" }} src={WarningRed} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", }}>
                    <Divider sx={{ border: "1px solid #B1B1B1", opacity: "unset", margin: "1rem", width: 360 }}></Divider>
                    <DialogTitle sx={themeStyle.textStyle}>
                        Please{" "}
                        <Typography component="span" sx={{ ...themeStyle.textStyle, fontWeight: 700 }}>
                            do not use a personal email
                        </Typography>, use the official email associated with the property.
                    </DialogTitle>
                    <Divider sx={{ border: "1px solid #B1B1B1", opacity: "unset", margin: "1rem", width: 360 }}></Divider>
                </Box>
                <DialogActions>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "-1rem", width: "100%" }}>
                        <Button sx={{ ...themeStyle.actionButtonStyle, color: '#D0301F', border: "1px solid #D0301F" }} onClick={handleClickClose}>OK</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );

}
const themeStyle = {
    actionButtonStyle: {
        color: "#FFFFFF", textTransform: "none", fontFamily: 'var(--font-family-primary)', fontWeight: 600, marginTop: "1rem", fontSize: "0.9rem", padding: "0.2rem 1rem", borderRadius: "0.8rem",
        '&:hover': {
            background: 'gray',
            color: "#FFF"
        },
        width: "20%"
    },
    paperPropsStyle: {
        background: "#FFF",
        borderRadius: "1.9rem",
        width: "auto",
        minWidth: "20%",
        padding: "2rem 1.5rem 0.5rem 1.5rem",

    },
    textStyle: {
        fontFamily: 'var(--font-family-primary)',
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1.2rem",
        color: "#D0301F"
    },
}
export default EmailDialogue
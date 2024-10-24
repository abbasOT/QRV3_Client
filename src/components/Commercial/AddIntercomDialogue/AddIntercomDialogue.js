import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, Divider, Typography } from '@mui/material';

import IntercomImage from "../../../assests/commercialAdmin/IntercomImage.svg"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddIntercomDialogue({ handleAddIntercomOpen, handleAddIntercom, handleAddIntercomClose }) {


    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleAddIntercomOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleAddIntercomClose();
        setOpen(false)
    }


    const [intercomId, setIntercomId] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const handleDone = () => {
        handleAddIntercom(intercomId, deviceName);
    }

    return (
        <>

            <Dialog
                open={true}
                onClose={handleClickClose}
                PaperProps={{
                    sx: { ...themeStyle.paperPropsStyle },
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>


                    <Box component="img" src={IntercomImage} width={110} mt={"2.2rem"} />

                    <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", width: 250, mt: "2rem" }} />



                    <input
                        type="text"
                        className="intercomModalInputField"
                        style={themeStyle.inputStyle}
                        placeholder="      Enter Device Name"
                        autoComplete="off"
                        value={deviceName}
                        maxLength={18}
                        onChange={(e) => setDeviceName(e.target.value)}
                    />



                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.8rem", color: "#566D90", fontWeight: 600, maxWidth: 320, textAlign: "center", mt: "2.4rem"
                    }}>
                        You received the Intercom ID Code along with the device, <Box component="span" sx={{ fontWeight: 400, }}> please enter it here.</Box>
                    </Typography>


                    <input
                        type="text"
                        className="intercomModalInputField"
                        style={themeStyle.inputIntercomStyle}
                        placeholder="      Enter Intercom ID"
                        autoComplete="off"
                        value={intercomId}
                        onChange={(e) => setIntercomId(e.target.value)}
                    />

                    <Button sx={{
                        width: 230, m: "2.2rem 0rem", color: "#566D90", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none", boxShadow: "0px 4px 4px 0px #00000040",
                        border: "1px solid #566D90", borderRadius: "0.8rem", padding: "0.2rem 2rem"
                    }} onClick={handleDone}>
                        Done
                    </Button>

                </Box>

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
    inputStyle: {
        border: "2px solid #EEEEEE", borderRadius: 2, fontSize: "0.8rem", color: "#B1B1B1", fontFamily: "Poppins", padding: "0.2rem 2rem", marginTop: "2.2rem", textAlign: "center"
    },
    inputIntercomStyle: {
        borderRadius: "5px", background: "#EEEEEE", fontSize: "0.8rem", color: "#B1B1B1", fontFamily: "Poppins", width: 280, marginTop: "1rem", padding: "0.5rem", textAlign: "center", border: "none"
    }
}
export default AddIntercomDialogue
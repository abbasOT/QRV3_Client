import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, Divider, Typography } from '@mui/material';
import DriveLayoutImage from "../../../assests/commercialAdmin/DrivewayLayoutModalImage.svg"
import { ButtonStyle } from '../CommercialSettings/CommercialSettings';
import GreenTick from "../../../assests/commercialAdmin/checkGreenIcon.svg"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DrivewayLayoutDialogue({ handleDrivewayLayoutOpen, handleDrivewayLayout, handleDrivewayLayoutClose }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleDrivewayLayoutOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleDrivewayLayoutClose();
        setOpen(false)
    }

    const [activeButton, setActiveButton] = useState(0);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(activeButton === buttonIndex ? null : buttonIndex);
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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>


                    <Box component="img" src={DriveLayoutImage} mt={"2.2rem"} />

                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.8rem", color: "#566D90", maxWidth: 450, textAlign: "center", mt: "2rem",
                    }}>
                        Visitors and residents   <Box component="span" sx={{ fontWeight: 600, }}> enter through different doors</Box>
                    </Typography>



                    <Box sx={{ m: "3rem 0rem", position: "relative", }}>
                        <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", width: 500 }} />
                        <Box sx={{ border: "2px solid #EEEEEE", background: "#FFF", borderRadius: "50%", width: 50, height: 50, position: "absolute", bottom: -20, left: 225, cursor: "pointer", textAlign: "center", pt: 0.5 }} onClick={() => handleButtonClick(1)}>
                            {activeButton === 1 && <img src={GreenTick} alt="Green Tick" />}
                        </Box>
                    </Box>


                    <Typography component="ul" >
                        <Typography component="li" sx={{
                            fontFamily: "Poppins", fontSize: "0.8rem", color: "#566D90", textAlign: "center"
                        }}>
                            If you still have doubts regarding this functionality, please call QR Doorman customer support.
                        </Typography>
                    </Typography>



                    <Button sx={{
                        ...ButtonStyle, width: 310, m: "2rem 0rem", boxShadow: '0px 4px 4px 0px #00000040'
                    }}>
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
        minWidth: "37%",
        padding: "2rem 1.5rem 0.5rem 1.5rem",
    },

}
export default DrivewayLayoutDialogue
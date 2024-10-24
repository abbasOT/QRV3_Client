import React, { useState } from 'react'
import { Box, Button, Typography, Divider } from '@mui/material'
import IntercomIcon from "../../../assests/commercialAdmin/intercomIcon.svg"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import GreenTick from "../../../assests/commercialAdmin/checkGreenIcon.svg"
import PinsImage from "../../../assests/commercialAdmin/pinsImage.svg"
import PinsKeyImage from "../../../assests/commercialAdmin/pinsKeyImage.svg"
import KeyButtonLine from "../../../assests/commercialAdmin/keyButtonLine.svg"
import { ButtonStyle } from '../CommercialSettings/CommercialSettings';
import { useLocation } from 'react-router-dom';
import DoubleEntry from "../../../assests/commercialAdmin/doubleEntry.svg"
import DoubleEntryWhite from "../../../assests/commercialAdmin/doubleEntryWhite.svg"
import DoubleEntryAlertDialogue from '../DoubleEntryAlertDialogue/DoubleEntryAlertDialogue';
import DrivewayLayoutDialogue from '../DrivewayLayoutDialogue/DrivewayLayoutDialogue';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CommercialSettingsAppLayout() {

    let com_prop_id = localStorage.getItem("userKey");

    const propertyId = localStorage.getItem("commercialPropId")

    const navigate = useNavigate();
    const location = useLocation();
    const { pcbId, indexNumber, appLayout } = location.state || {};

    // const [activeButton, setActiveButton] = useState(0);
    const [activeButton, setActiveButton] = useState(appLayout);


    const handleNavigateIntercom = () => {
        navigate("/commercial-admin/settings")
    }



    const handleButtonClick = async (buttonIndex) => {
        setActiveButton(activeButton === buttonIndex ? null : buttonIndex);
        try {
            const response = await axios.put(
                `https://ot-technologies.com/commercialAdmin/updateIntercomId/${com_prop_id}`, // Replace with your actual API URL
                { applayoutValue: buttonIndex, intercomId: pcbId, propId: propertyId, pcbIndexNumber: indexNumber + 1 }
            );

            console.log('Intercom updated successfully:', response.data.message);
            return response.data.message;
        } catch (error) {
            console.error('Error updating intercom:', error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.error : 'Internal Server Error');
        }
    };


    const [isKeyOpen, setIsKeyOpen] = useState(false);
    const [doorValue, setDoorValue] = useState("0"); // Initialize with "0"
    // const handleKeyClick = async () => {
    //     try {
    //         // Set door value to "1" and update the intercom
    //         await axios.put(
    //             `https://ot-technologies.com/commercialAdmin/updateIntercomId/${com_prop_id}`,
    //             { doorValue: "1", intercomId: pcbId, propId: propertyId }
    //         );
    //         setDoorValue("1"); // Update the state immediately
    //         setIsKeyOpen(true); // Show key open state

    //         // After 3 seconds, revert door value to "0" and update the intercom
    //         setTimeout(async () => {
    //             try {
    //                 await axios.put(
    //                     `https://ot-technologies.com/commercialAdmin/updateIntercomId/${com_prop_id}`,
    //                     { doorValue: "0", intercomId: pcbId, propId: propertyId }
    //                 );
    //                 setDoorValue("0"); // Update the state immediately
    //                 setIsKeyOpen(false); // Hide key open state
    //             } catch (error) {
    //                 console.error('Error reverting intercom door value:', error.response ? error.response.data : error.message);
    //             }
    //         }, 3000);
    //     } catch (error) {
    //         console.error('Error updating intercom door value:', error.response ? error.response.data : error.message);
    //     }
    // };

    const handleKeyClick = () => {
        try {
            setIsKeyOpen(true);
            setTimeout(() => {
                setIsKeyOpen(false); // Hide key open state
            }, 3000);
        } catch (error) {
            console.error('Error simulating intercom door value:', error.message);
        }
    };


    const [showDoubleEntryAlertDialogue, setShowDoubleEntryAlertDialogue] = useState(false);
    const [showDrivewayLayoutDialogue, setShowDrivewayLayoutDialogue] = useState(false);

    const handleDoubleEntryAlert = () => {
        setShowDoubleEntryAlertDialogue(false);
        setShowDrivewayLayoutDialogue(true)
    };

    const handleDoubleEntryAlertDialogueOpen = () => {
        setShowDoubleEntryAlertDialogue(true);
    };

    const handleDoubleEntryAlertDialogueClose = () => {
        setShowDoubleEntryAlertDialogue(false);
    };


    const handleDrivewayLayout = () => {
        setShowDrivewayLayoutDialogue(false)
    };

    const handleDrivewayLayoutDialogueClose = () => {
        setShowDrivewayLayoutDialogue(false)
    };



    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "2rem" }}>
                <Button sx={{
                    gap: "1rem", color: "#F08F00", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none"
                }} onClick={handleNavigateIntercom} >
                    <img src={IntercomIcon} />
                    Intercom
                </Button>

                <KeyboardDoubleArrowRightIcon sx={{ color: "#566D90", width: 20 }} />

                <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "0.9rem", color: "#F08F00" }}>App Layout</Typography>

                <Box sx={{ border: "2px solid #F08F00", borderRadius: "50%", width: 27, height: 27, fontWeight: 600, color: "#F08F00", fontFamily: "Raleway", }} >{indexNumber + 1}</Box>
            </Box>



            <Box sx={{ display: "flex", gap: "2rem", positiom: "relative", }}>

                <Box sx={{ position: "relative", pt: "10rem", width: 450, }}>
                    <Box sx={{ position: "absolute", top: "15%", left: "60%", }}>
                        <Typography sx={{ color: "#D0301F", fontWeight: 700, fontSize: "0.75rem", fontFamily: "Poppins", pl: "1.7rem" }}>Quick Entry Button</Typography>
                        <img src={KeyButtonLine} />
                    </Box>
                    <Box sx={{
                        border: isKeyOpen ? "1px solid #19A752" : "1px solid #566D90", borderRadius: "50%", width: 130, height: 130, boxShadow: "0px 0px 6px 1px #00000040", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute",
                        bottom: "35%", left: "35%",
                    }}>

                        <Box sx={{
                            border: "1px solid #566D90", borderRadius: "50%", width: 105, height: 105, boxShadow: "0px 0px 6px 1px #00000040", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer",
                            background: isKeyOpen
                                ? "linear-gradient(270.77deg, #19A752 -8.08%, #10713E 166.03%)"
                                : "linear-gradient(270.77deg, #2A3649 -8.08%, #566D91 166.03%)",
                        }} onClick={handleKeyClick}>
                            {isKeyOpen ? (
                                <Typography sx={{ fontWeight: 700, fontFamily: "Poppins", color: "#FFF" }}>Door Opening</Typography>
                            ) : (
                                <VpnKeyRoundedIcon sx={{ color: "#FFF", width: 34, height: 34, transform: "rotate(320deg)" }} />
                            )}

                        </Box>
                    </Box>


                    <img src={PinsKeyImage} />
                </Box>

                <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", height: 240, mt: "5rem" }} />
                <Box sx={{ pt: "10rem" }}>
                    <img src={PinsImage} />
                </Box>
            </Box>





            <Box sx={{ paddingTop: "1rem", position: "relative", }}>
                <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", maxWidth: 1000 }} />

                <Box sx={{ border: "2px solid #EEEEEE", background: "#FFF", borderRadius: "50%", width: 50, height: 50, position: "absolute", bottom: -20, left: 210, cursor: "pointer", pt: 0.4 }} onClick={() => handleButtonClick("custom")}>
                    {activeButton === "custom" && <img src={GreenTick} alt="Green Tick" />}
                </Box>

                <Box sx={{ border: "2px solid #EEEEEE", background: "#FFF", borderRadius: "50%", width: 50, height: 50, position: "absolute", bottom: -20, left: 720, cursor: "pointer", pt: 0.4 }} onClick={() => handleButtonClick("default")}>
                    {activeButton === "default" && <img src={GreenTick} alt="Green Tick" />}
                </Box>


                <Typography sx={{ color: "#B1B1B1", fontFamily: "Poppins", fontSize: "0.8rem", position: "absolute", left: 780, bottom: 10 }} > Default </Typography>
            </Box>




            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 1000, flexDirection: "column" }}>

                <Typography component="ul" sx={{ pt: "4rem" }}>
                    <Typography component="li" sx={{
                        fontFamily: "Poppins", fontSize: "0.8rem", color: "#566D90"
                    }}>
                        The <Box component="span" sx={{ color: "#D0301F", fontWeight: 700 }}>Quick Entry Button</Box> allows users to remotely open the gate without being on a video call with a visitor.
                    </Typography>
                </Typography>


                <Button sx={{ ...ButtonStyle, mt: "2rem" }} >
                    Ok
                </Button>

                <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", minWidth: 700, margin: "2rem 0rem" }} />

                <Button sx={ButtonStyle} onClick={handleDoubleEntryAlertDialogueOpen}>
                    <Box component="img" src={DoubleEntry} alt="Double Entry" className="default-img" />
                    <Box component="img" src={DoubleEntryWhite} alt="Double Entry White" className="hover-img" sx={{ display: 'none' }} />
                    Double Entry
                </Button>


            </Box>

            {showDoubleEntryAlertDialogue && (
                <DoubleEntryAlertDialogue
                    handleDoubleEntryAlertOpen={handleDoubleEntryAlertDialogueOpen}
                    handleDoubleEntryAlert={handleDoubleEntryAlert}
                    handleDoubleEntryAlertClose={handleDoubleEntryAlertDialogueClose}
                />
            )}

            {showDrivewayLayoutDialogue && (
                <DrivewayLayoutDialogue
                    handleDrivewayLayout={handleDrivewayLayout}
                    handleDrivewayLayoutClose={handleDrivewayLayoutDialogueClose}
                />
            )}


        </>
    )
}

export default CommercialSettingsAppLayout

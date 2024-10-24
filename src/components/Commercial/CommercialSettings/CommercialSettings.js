import React, { useState, useEffect } from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import IntercomIcon from "../../../assests/commercialAdmin/intercomIcon.svg"
import IntercomImage from "../../../assests/commercialAdmin/IntercomImage.svg"
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AddIntercomDialogue from '../AddIntercomDialogue/AddIntercomDialogue';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, update } from "firebase/database";
import DeleteDialogue from '../../superAdmin/DeleteDialogue/DeleteDialogue';
import axios from 'axios';

function CommercialSettings() {


    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(true);

    let com_prop_id = localStorage.getItem("userKey");
    const commercial_prop_id = localStorage.getItem("commercialPropId")


    const handleAppLayout = (pcbId, indexNumber, appLayout) => {
        navigate("/commercial-admin/settings_app_layout", { state: { pcbId, indexNumber, appLayout } });
    }
    const handleVisitorScreen = (pcbId, indexNumber) => {
        navigate("/commercial-admin/settings_visitor_screen", { state: { pcbId, indexNumber } });
    }

    const [intercoms, setIntercoms] = useState([]);
    const [showAddIntercomDialogue, setShowAddIntercomDialogue] = useState(false);
    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
    const [pcbIdToDelete, setPcbIdToDelete] = useState("")
    const [reloadIntercoms, setReloadIntercoms] = useState(false);
    const [deviceName, setDeviceName] = useState("");
    const [okclicked, setOkClicked] = useState(false);

    const propertyId = commercial_prop_id
    const commercialAdminKey = com_prop_id

    useEffect(() => {
        const fetchIntercoms = async () => {
            try {
                const response = await axios.get(
                    `https://ot-technologies.com/commercialAdmin/getIntercoms/${propertyId}`,
                );

                // Update the state with the retrieved intercoms
                setIntercoms(response.data.intercoms);

                console.log("Intercoms retrieved successfully:", response.data.intercoms);
            } catch (error) {
                // Handle errors
                if (error.response && error.response.data) {
                    console.error("Error retrieving intercoms:", error);
                } else {
                    alert("An error occurred while retrieving intercoms");
                }
                console.error("Error retrieving intercoms:", error);
            }
        };

        fetchIntercoms();
    }, [commercial_prop_id, showAddIntercomDialogue, reloadIntercoms, okclicked]); // Empty dependency array to run only once on mount


    const updateIntercom = async (pcbId, newStatus) => {
        try {
            const response = await axios.put(
                `https://ot-technologies.com/commercialAdmin/updateIntercomId/${com_prop_id}`, // Replace with your actual API URL
                { intercomId: pcbId, propId: propertyId, onlineStatus: newStatus }
            );

            console.log('Intercom updated successfully:', response.data.message);
            return response.data.message;
        } catch (error) {
            console.error('Error updating intercom:', error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.error : 'Internal Server Error');
        }

    }

    const handleToggle = async (pcbId) => {
        // Toggle the online status in local state
        const newStatus = !isOnline[pcbId];
        setIsOnline((prevState) => ({
            ...prevState,
            [pcbId]: newStatus,
        }));

        // Update the server with the new status
        try {
            await updateIntercom(pcbId, newStatus);
        } catch (error) {
            console.error("Failed to update the intercom status:", error);
            alert("Failed to update intercom status. Please try again.");
            // Revert local state if update fails
            setIsOnline((prevState) => ({
                ...prevState,
                [pcbId]: !newStatus,
            }));
        }
    };

    const intercomNo = intercoms.length + 1
    const handleAddIntercom = async (intercomId, deviceName) => {
        console.log(intercomId, deviceName, "the intercom and device names are ...")
        if (intercomId === "" || deviceName === "") {
            alert("Please Enter IntercomId");
            return;
        }
        try {
            const response = await axios.put(
                `https://ot-technologies.com/commercialAdmin/AddInterComId/${com_prop_id}`,
                { intercomId, deviceName, commercial_prop_id, intercomNo }
            );
            alert(response.data.message)

            setReloadIntercoms(prev => !prev);

        } catch (error) {
            // Handle errors
            if (error.response.data.login) {

                alert(error.response.data.message);
                navigate("/login");
                return;
            } else if (error.response.data.pcbId) {
                alert(`PCB with id: ${error.response.data.pcbId} already exists`);
                return;
            } else {
                alert(error.response.data.error)
            }

            console.error("Error:", error);
        }

        setShowAddIntercomDialogue(false);
    };

    const handleAddIntercomDialogueOpen = () => {
        setShowAddIntercomDialogue(true);

    };
    const handleAddIntercomDialogueClose = () => {
        setShowAddIntercomDialogue(false);
    };


    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `https://ot-technologies.com/commercialAdmin/delete_InterComId/${com_prop_id}?intercomId=${pcbIdToDelete}&propId=${propertyId}` // Corrected query parameter syntax
            );

            console.log('Intercom deleted successfully:', response.data.message);

            // Close the delete dialogue
            setShowDeleteDialogue(false);
            setReloadIntercoms(prev => !prev);
            setIntercoms(prevIntercoms => prevIntercoms.filter(intercom => intercom.pcbId !== pcbIdToDelete));

            return response.data.message;
        } catch (error) {
            console.error('Error deleting intercom:', error.response ? error.response.data : error.message);
            // Consider showing an error message to the user
            alert(error.response ? error.response.data.error : 'Internal Server Error');

            // Close the delete dialogue in case of error
            setShowDeleteDialogue(false);

            // Optionally, you can re-throw the error if needed
            // throw new Error(error.response ? error.response.data.error : 'Internal Server Error');
        }
    };

    const handleDeleteDialogueOpen = (selectedPcbId) => {
        setPcbIdToDelete(selectedPcbId)
        setShowDeleteDialogue(true);
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };



    const handleDeviceName = async (intercomId, intercomNo) => {
        if (deviceName === "") {
            alert("Please Enter deviceName");
            return;
        }
        try {
            setOkClicked(true)
            console.log("The intercomId and intercom number is:", intercomId, intercomNo);

            const db = getDatabase();

            // Reference to update deviceName in /property/${propertyId}/intercoms/${intercomId}/deviceName
            const propertyRef = ref(db, `/property/${propertyId}/intercoms/${intercomId}`);

            // Reference to update deviceName in /PCB/${intercomId}/deviceName
            const pcbRef = ref(db, `/PCB/${intercomId}`);

            // Reference to update deviceName1 or deviceName2 in /commercial/${commercialAdminKey}
            const commercialRef = ref(db, `/commercial/${commercialAdminKey}`);

            // Update the deviceName in the appropriate references
            await update(propertyRef, { deviceName: deviceName });
            await update(pcbRef, { deviceName: deviceName });

            // Determine if it's Intercom 1 or 2 and update accordingly
            if (intercomNo === "1") {
                await update(commercialRef, { deviceName1: deviceName });
            } else if (intercomNo === "2") {
                await update(commercialRef, { deviceName2: deviceName });
            }

            console.log(`Device name updated successfully for Intercom ${intercomNo}`);
            alert("Device name updated successfully");
            setDeviceName("")
        } catch (error) {
            alert("Error updating device name:");
            console.error("Error updating device name:", error);
        }
        finally {
            setOkClicked(false)
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button sx={{
                    gap: "1rem", color: "#F08F00", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none"
                }} >
                    <img src={IntercomIcon} />
                    Intercom
                </Button>
                <Button sx={{
                    gap: "1rem", color: "#566D90", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none", boxShadow: "0px 4px 4px 0px #00000040",
                    border: "1px solid #566D90", borderRadius: "0.8rem", padding: "0.2rem 2rem"
                }} onClick={handleAddIntercomDialogueOpen} disabled={intercoms.length >= 2} >
                    Add Intercom
                </Button>
            </Box>

            <Grid container spacing={1} mt={"1.5rem"} alignItems={"center"} gap={"1rem"} >

                {intercoms.map((intercom, index) => (
                    <React.Fragment key={intercom.pcbId}>
                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    border: "2px solid #F3F3F3",
                                    borderRadius: "2.6rem",
                                    boxShadow: "0px 0px 10px 0px #00000040",
                                    minWidth: 340,
                                    minHeight: 500,
                                    padding: "2rem 1.8rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "2px solid #566D90",
                                        borderRadius: "50%",
                                        width: 27,
                                        height: 27,
                                        fontWeight: 600,
                                        color: "#566D90",
                                        fontFamily: "Raleway",
                                    }}
                                >
                                    {index + 1}
                                </Box>

                                <Box component="img" src={IntercomImage} mt={"2.2rem"} />

                                <Typography
                                    sx={{
                                        color: isOnline[intercom.pcbId] ? "#19A752" : "#C24E42",
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                        mt: "2.5rem",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleToggle(intercom.pcbId)}
                                >
                                    {isOnline[intercom.pcbId] ? "Online" : "Offline"}
                                </Typography>

                                <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                                    {/* <Box
                                    sx={{
                                        border: "2px solid #EEEEEE",
                                        width:"60%",
                                        borderRadius: 2,
                                        fontSize: "0.8rem",
                                        color: "#B1B1B1",
                                        fontFamily: "Poppins",
                                        padding: "0.2rem 1rem",
                                        mt: "2.2rem",
                                    }}
                                >
                                    {intercom.deviceName}                                  
                                </Box> */}

                                    <input
                                        type="text"
                                        className="intercomModalInputField"
                                        style={inputStyle}
                                        placeholder={intercom.deviceName}
                                        autoComplete="off"
                                        value={deviceName}
                                        maxLength={18}
                                        onChange={(e) => setDeviceName(e.target.value)}
                                    />
                                    <Button sx={{ ...ButtonStyle, position: "absolute", width: 30, padding: "0rem 0rem", fontSize: "0.8rem", height: "1.7rem", right: "-7%", top: "55%" }} onClick={() => handleDeviceName(intercom.pcbId, intercom.IntercomNo)} disabled={okclicked}>
                                        OK
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        borderRadius: "5px",
                                        background: "#EEEEEE",
                                        fontSize: "0.8rem",
                                        color: "#B1B1B1",
                                        fontFamily: "Poppins",
                                        width: "100%",
                                        mt: "2.2rem",
                                        padding: "0.2rem",
                                    }}
                                >
                                    {intercom.pcbId}
                                </Box>

                                <Box
                                    sx={{
                                        border: "1px solid #C24E42",
                                        borderRadius: "50%",
                                        width: 30,
                                        height: 30,
                                        mt: "2.2rem",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleDeleteDialogueOpen(intercom.pcbId)}
                                >
                                    <DeleteIcon sx={{ color: "#C24E42" }} />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    pt: "3.5rem",
                                }}
                            >
                                <Button sx={ButtonStyle} onClick={() => handleAppLayout(intercom.pcbId, index, intercom.appLayout)}>
                                    <SpaceDashboardOutlinedIcon />
                                    App Layout
                                </Button>

                                <Button sx={ButtonStyle} onClick={() => handleVisitorScreen(intercom.pcbId, index)}>
                                    <PhoneAndroidOutlinedIcon />
                                    Visitor Screen
                                </Button>
                            </Box>
                        </Grid>

                        {index < intercoms.length - 1 && (
                            <Divider
                                sx={{
                                    border: "7px solid #EEEEEE",
                                    opacity: "unset",
                                    borderRadius: "0.75rem",
                                    height: 150,
                                    mt: "-10%",
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}

                {showDeleteDialogue && (
                    <DeleteDialogue
                        handleDeleteOpen={handleDeleteDialogueOpen}
                        handleDelete={handleDelete}
                        handleDeleteClose={handleDeleteDialogueClose}
                    />
                )}

                {showAddIntercomDialogue && (
                    <AddIntercomDialogue
                        handleAddIntercomOpen={handleAddIntercomDialogueOpen}
                        handleAddIntercom={handleAddIntercom}
                        handleAddIntercomClose={handleAddIntercomDialogueClose}
                    />
                )}
            </Grid>


        </>
    )
}

export default CommercialSettings

export const ButtonStyle = {
    gap: "1rem", color: "#566D90", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none", width: 340,
    border: "1px solid #566D90", borderRadius: "0.8rem", padding: "0.2rem 2rem",
    '&:hover': {
        background: "#2A3649",
        color: "#FFFFFF",

    },
    '&:hover .hover-img': {
        display: 'block',
    },
    '&:hover .default-img': {
        display: 'none',
    },
}

const inputStyle = {
    border: "2px solid #EEEEEE", borderRadius: 2, fontSize: "0.8rem", color: "#B1B1B1", fontFamily: "Poppins", padding: "0.2rem 0.4rem", marginTop: "2.2rem", textAlign: "center"
}
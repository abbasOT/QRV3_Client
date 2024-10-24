import React, { useState, useRef, useEffect } from "react";
import Header from "../../../components/Commercial/Header/Header";
import QrCodeIcon from "../../../assests/download_qr_icon.svg";
import uploadIcon from "../../../assests/upload_icon.svg";
import IntercomIcon from "../../../assests/intercomId_icon.png";
import BrightnessIcon from "../../../assests/brightness_icon.svg";
import IntercomIdModal from "../../../components/Commercial/IntercomIdModal/InterComModal";
import VisitorScreenCard from "../../../components/Commercial/VisitorScreenCard/VisitorScreenCard";
import { Box, Grid, Button, Typography, Divider } from "@mui/material";
import IntercomButtonIcon from "../../../assests/commercialAdmin/intercomIcon.svg";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Modal } from "react-bootstrap";
import axios from "axios";
import Loader from "../../../pages/Loader/Loader";
import Slider from "@mui/material/Slider";
import VisitorScreenFrame from "../../../assests/commercialAdmin/VisitorScreenFrame.svg"
import DownloadQRModal from "../../../components/Commercial/DownloadQRModal/DownloadQR";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NewVisitorScreenCard from "../NewVisitorScreenCard/NewVisitorScreenCard";

const InputDivStyle = {
    borderRadius: "5px",
    color: "#566D90",
    width: "312px",
    height: "37px",
    border: "none",
    backgroundColor: "#EEE",
    paddingLeft: "10%",
};

const btnStyle = {
    width: "312px",
    height: "37px",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "10px",
    border: "#566D90 solid 1px",
    backgroundColor: "white",
    color: "#566D90",
    fontWeight: "600",
};
const brightBtn = {
    ...btnStyle,
    width: "182px",
    fontWeight: "400",
}

const InterCombtnStyle = {
    width: "312px",
    height: "37px",
    borderRadius: "20px",
    border: "#566D90 solid 1px",
    backgroundColor: "white",
    color: "#566D90",
    fontWeight: "600",
};

const iconStyle = {
    marginRight: "13px",
    marginTop: "-0.2rem"
};
function CommercialSettingsVisitorScreen() {
    const [progressValue, setProgressValue] = useState(0);
    const [showIntercomModal, setInterIdModal] = useState(false);
    const [WelcomMessage, setWelcomeMessage] = useState("");
    const [commercialData, setCommercialData] = useState(null);
    const [ResidentsData, setResidentsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [brightness, setBrightness] = useState(0);


    const [showQRModal, setQRModal] = useState(false);
    // const [pcbId, setpcbId] = useState("");
    const [Data, setData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { pcbId, indexNumber } = location.state || {};

    const propertyId = localStorage.getItem("commercialPropId")

    const handleNavigateIntercom = () => {
        navigate("/commercial-admin/settings")
    }

    console.log(pcbId)


    let com_prop_id = localStorage.getItem("userKey");

    useEffect(() => {
        const fetchIntercoms = async () => {
            try {
                const response = await axios.get(
                    `https://ot-technologies.com/commercialAdmin/getIntercoms/${propertyId}`,
                );

                // Update the state with the retrieved intercoms
                const intercoms = response.data.intercoms;
                const matchingIntercom = intercoms.find(intercom => intercom.pcbId === pcbId);
                // const matchingIntercom = intercoms.filter(intercom => intercom.pcbId === pcbId);

                setLoading(false)
                setCommercialData(matchingIntercom);
                const initialBrightness = commercialData?.brightness
                setBrightness(initialBrightness)

            } catch (error) {
                // Handle errors
                if (error.response && error.response.data) {
                    alert(error.response.data.error);
                } else {
                    alert("An error occurred while retrieving intercoms");
                }
                console.error("Error retrieving intercoms:", error);
            }
        };

        fetchIntercoms();
    }, [com_prop_id, loading]);



    console.log(brightness, "the value brightness")



    const handleBrightnessChange = (event, newValue) => {
        setBrightness(newValue);
    };
    console.log(brightness, "the value of brightness")

    const handleProgressBarClick = (e) => {
        const progressBarWidth = e.target.offsetWidth;
        const clickedPercentage = parseInt(
            (e.nativeEvent.offsetX / progressBarWidth) * 100,
            10
        );

        setProgressValue(clickedPercentage);
    };

    const handleOpenModal = () => {
        setInterIdModal(true);
        console.log(showIntercomModal);
    };

    const handleEnterKeyPress = async (e) => {
        if (e.key === "Enter") {
            try {
                // Make a POST request to the server
                const response = await axios.post(
                    `https://ot-technologies.com/commercialAdmin/WelcomMessage/${com_prop_id}`,
                    {
                        WelcomMessage: e.target.value,
                        propertyId,
                        pcbId,
                    }
                );

                console.log(response.data);
                alert(response.data.message);
                setCommercialData(response.data.pcbData);
                // Clear the input field after successful submission
                setWelcomeMessage("");
            } catch (error) {
                alert(error.response.data.error);
                console.error("Error making POST request:", error);
                if (error.response.data.login) {
                    alert(error.response.data.message);
                    navigate("/login");
                }
                // Handle the error if needed
            }
        }
    };

    //uploadWallpaper

    const fileInputRef = useRef(null);

    const handleWallpaper = () => {

        // Trigger click on the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        // setLoading(true)
        const selectedFile = event.target.files[0];
        console.log(selectedFile);
        try {

            const formData = new FormData();
            formData.append("image", selectedFile);
            const response = await axios.post(
                `https://ot-technologies.com/commercialAdmin/uploadWallpaper/${com_prop_id}/${propertyId}/${pcbId}`,
                formData,
            );

            // setLoading(false)
            console.log("File uploaded successfully", response.data);
            alert(response.data.message);
            setCommercialData(response.data.pcbData);
        } catch (error) {
            console.error("Error uploading file", error);
            if (error.response.data.login) {
                alert(error.response.data.message);
                navigate("/login");
            }
        }
    };
    const DownloadQR = async () => {
        if (!commercialData.pcbId) {
            alert("first Add PcbId");
            return;
        }

        const pcbId = commercialData.pcbId;
        // setpcbId(pcbId);
        setQRModal(true);
    };

    const saveBrightnessValue = () => {
        // Make a POST request using Axios
        axios
            .post(
                `https://ot-technologies.com/commercialAdmin/savebrightness/${com_prop_id}`,
                {
                    brightness,
                    propertyId,
                    pcbId,
                }
            )
            .then((response) => {
                // Handle successful response
                alert(response.data.message);
                console.log("Timer set successfully", response);
                setCommercialData(response.data.pcbData);
            })
            .catch((error) => {
                // Handle error
                console.error("Error setting timer:", error.message);
                if (error.response.data.login) {
                    alert(error.response.data.message);
                    navigate("/login");
                }
            });
    };

    return (

        <>
            <Loader open={loading} />
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "2rem" }}>
                <Button sx={{
                    gap: "1rem", color: "#F08F00", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none"
                }} onClick={handleNavigateIntercom} >
                    <img src={IntercomButtonIcon} />
                    Intercom
                </Button>

                <KeyboardDoubleArrowRightIcon sx={{ color: "#566D90", width: 20 }} />

                <Typography sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "0.9rem", color: "#F08F00" }}>Visitor Screen</Typography>

                <Box sx={{ border: "2px solid #F08F00", borderRadius: "50%", width: 27, height: 27, fontWeight: 600, color: "#F08F00", fontFamily: "Raleway", }} >{indexNumber + 1}</Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                    <div className="mb-5">
                        <input
                            type="text"
                            className="residentialModalInputField"
                            style={InputDivStyle}
                            placeholder="      Write a welcome message..."
                            value={WelcomMessage}
                            onChange={(e) => setWelcomeMessage(e.target.value)}
                            onKeyPress={handleEnterKeyPress}
                        />
                    </div>
                    <Divider sx={{ border: "1px solid #EEEEEE", opacity: "unset", width: 400 }} />
                    <div className="mt-5 mb-5">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <button
                            style={btnStyle}
                            type="button"
                            className="btn btn-primary "
                            onClick={handleWallpaper}
                        >
                            <img style={iconStyle} src={uploadIcon} alt="" />
                            Wallpaper

                        </button>
                    </div>

                    <Divider sx={{ border: "1px solid #EEEEEE", opacity: "unset", width: 400 }} />

                    <div className="mt-5 mb-3 d-flex justify-content-center">
                        <div
                            onClick={handleProgressBarClick}
                            style={{ cursor: "pointer", width: "316px", height: "21px" }}
                        >
                            <div className="d-flex">
                                <div style={{ marginRight: "15px" }}>
                                    <img src={BrightnessIcon} alt="" />
                                </div>
                                <Slider sx={{
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#FFFFFF', // Thumb color
                                        width: '1.3rem',            // Thumb size
                                        height: '1.3rem',           // Thumb size

                                        '&:hover, &:active': {
                                            boxShadow: '0px 0px 0px 8px rgba(86, 109, 144, 0.16)',
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#566D90', // Track color
                                        height: '1.2rem',           // Track height
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #2A3649',
                                        boxShadow: '0px 4px 4px 0px #00000040 inset',
                                        height: '1.2rem',           // Rail height
                                    },
                                }}
                                    value={brightness}
                                    onChange={handleBrightnessChange}
                                />
                            </div>


                        </div>
                    </div>


                    <div className="mt-5  mb-5">
                        <button
                            style={brightBtn}
                            type="button"
                            onClick={saveBrightnessValue}
                            className="btn btn-primary "
                        >
                            Save Brightness
                        </button>
                    </div>

                </Grid>
                <Grid item xs={12} sm={7} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className="row align-items-center justify-content-around">


                        <div className="col-6 " style={{ display: "contents" }}>
                            {loading ? (
                                <>loading</>
                            ) : (
                                // Render your component with the fetched data
                                <>
                                    <Box sx={{ position: "relative", display: "flex" }}>
                                        <Box sx={{ position: "absolute", top: 0, zIndex: 0, left: "18.5%" }}>
                                            <NewVisitorScreenCard
                                                CommercialData={commercialData}
                                                ResidentsData={ResidentsData}
                                                brightness={brightness}
                                                Data={Data}
                                            />
                                        </Box>
                                        <img src={VisitorScreenFrame} style={{ zIndex: 0 }} />
                                    </Box>
                                </>

                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>



            <Modal
                centered
                className="abc"
                show={showQRModal}
                onHide={() => setQRModal(false)}
            >
                <Modal.Body>
                    <DownloadQRModal pcbId={pcbId} setQRModal={setQRModal} />
                </Modal.Body>
            </Modal>

            <Modal
                size=""
                centered
                className="abc"
                show={showIntercomModal}
                style={{ width: "", height: "" }}
                onHide={() => setInterIdModal(false)}
            >
                <Modal.Body>
                    <IntercomIdModal setInterIdModal={setInterIdModal} commercialData={commercialData} setCommercialData={setCommercialData} />
                </Modal.Body>
            </Modal>

        </>
    );
}

export default CommercialSettingsVisitorScreen;

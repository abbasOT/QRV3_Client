import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import AddIcon from '@mui/icons-material/Add';
import PinCodeIcon from "../../../assests/commercialAdmin/PinCode.svg"
import PincodeWhite from "../../../assests/pincode.svg";
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import PinCodeModalIcon from "../../../assests/pin_code_modal_icon.svg";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";
import AddPinCodeModal from '../AddPinCodeModal/AddPinModal';


function CommercialPinCode() {
    const [showPinCodeModal, setPinCodeModal] = useState(false);
    const [username, setUserName] = useState();
    const [PinsData, setPins] = useState([]);
    const [PinsData2, setPins2] = useState([]);
    const [PinCodeName, setPinName] = useState();
    const [PinCode, setPinCode] = useState("");
    const [pinId, setPinId] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [asciiValue, setAsciiValue] = useState("");
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();



    const handleOpenModal = (content, pinData) => {
        setPinCodeModal(true);
        setModalContent(content);
        setPinCode(pinData?.pin.substring(2));
        setPinName(pinData?.name);
        setPinId(pinData?.pinId);
        console.log(showPinCodeModal);
        // setUserName(item.name);
    };

    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    };



    let com_prop_id = localStorage.getItem("userKey");
    const propertyId = localStorage.getItem("commercialPropId")

    useEffect(() => {
        const fetchPinsCode = async () => {
            try {
                // Make a GET request to fetch residents with the specified comPropId
                const response = await axios.get(
                    `https://ot-technologies.com/commercialAdmin/get_pins/${com_prop_id}?propertyId=${propertyId}`
                );

                // Assuming the response contains a property 'residents' with an array of resident data
                setPins(response.data.pins);
                setAsciiValue(response.data.SC);


            } catch (error) {
                console.error("Error fetching residents:", error);
                if (error.response.data.login) {
                    alert(error.response.data.message);
                    navigate("/login");
                }
                // Handle error if needed
            }
        };

        fetchPinsCode();
    }, [showPinCodeModal, com_prop_id]);


    console.log(PinsData, asciiValue, "the data comming from database")
    const createPincode = async () => {
        console.log(asciiValue);
        let pin = `${asciiValue}${PinCode}`;

        if (PinCode.length < 4) {
            alert("Pin code must be exactly 4 digits");
            return; // Exit the function if the condition is met
        }



        try {
            const response = await axios.post(
                `https://ot-technologies.com/commercialAdmin/add_pins/${com_prop_id}`,
                {
                    PinCode: pin,
                    PinCodeName,
                    propertyId: propertyId
                }
            );
            console.log("API Response:", response.data);
            setPins(response.data.pins);
            setPinCodeModal(false);
            setPinName("");
            setPinCode("");
        } catch (error) {

            if (error?.response?.data?.message) {
                alert(error.response.data.message);
            }
            console.log(error.response.data)
            if (error.response.data.login) {
                alert(error.response.data.message);
                navigate("/login");
            }
        }
    };

    const pinEntries = PinsData ? Object.entries(PinsData) : [];

    // Filter PIN codes based on the search input
    const filteredPins = PinsData
        ? Object.entries(PinsData).filter(([key, pin]) =>
            pin.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : [];

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button sx={{ gap: "0.7rem", color: "#566D90", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none" }} onClick={handleOpenModal}>
                    <AddIcon sx={{ color: '#566D90', }} />   Add PIN Code
                </Button>

                <div className="col-4 d-flex" style={{ marginRight: "-1.3rem" }}>
                    <img src={searchIcon} style={iconStyle} alt="" />{" "}
                    <Form.Control
                        style={SearchInputStyle}
                        id="SearchInput"
                        type="text"
                        placeholder="Search PIN Code Name"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>
            </Box>

            <Box sx={{ display: "flex", gap: "0.3rem", flexDirection: "column", alignItems: "left", pt: "4.7rem" }}>
                <span style={TotalPropStyle}>
                    Total PIN Code <span style={TotalPropNumStyle}>{pinEntries.length}</span>
                </span>
            </Box>


            <Grid container spacing={5} mt={"0rem"}>
                {filteredPins.length > 0 ? (
                    filteredPins.map(([key, pin]) => (
                        <Grid item lg={4} sm={6} xs={12} key={key}>
                            <Box sx={BoxStyle} onClick={() => handleOpenModal("activePinCode", pin)}>
                                <img src={PinCodeIcon} className="pinCodeImage" alt="Pin Code" />
                                <Typography className='name' sx={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "0.9rem", color: "#566D90" }}>
                                    {pin?.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ fontFamily: "Poppins", fontSize: "1rem", color: "#566D90", textAlign: "center", mt: "2rem" }}>
                        No PIN Codes available.
                    </Typography>
                )}
            </Grid>


            <Modal
                centered
                className="abc"
                show={showPinCodeModal}
                style={{ width: "", height: "", marginLeft: "", marginRight: "auto" }}
                onHide={() => setPinCodeModal(false)}
            >
                <Modal.Title
                    className="w-100 p-2 align-itmes-center d-flex justify-content-center"
                    style={{
                        alignItems: "center",
                        height: "62px",
                        backgroundColor: "#2A3649",
                        color: "white",
                    }}
                >
                    <img src={PinCodeModalIcon} style={{ marginRight: "30px" }} alt="" />
                    <span
                        style={{
                            fontWeight: "600",
                            fontFamily: "Open Sans",
                            fontSize: "20px",
                        }}
                    ></span>
                    {/* {username} */}
                    Pin Name
                </Modal.Title>
                <Modal.Body style={{ background: "#FFF" }}>
                    <AddPinCodeModal
                        asciiValue={asciiValue}
                        createPincode={createPincode}
                        PinCodeName={PinCodeName}
                        setPinName={setPinName}
                        PinCode={PinCode}
                        setPinCode={setPinCode}
                        pinId={pinId}
                        setPinCodeModal={setPinCodeModal}
                        ModalStatus={modalContent}
                    />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default CommercialPinCode


const SearchInputStyle = {
    border: "none",
    backgroundColor: "#EEEEEE",
    color: "#8E8E8E",
    paddingLeft: "50px",
};

const iconStyle = {
    position: "relative",
    marginRight: "-40px", // Adjust the spacing between the icon and the text
};


const TotalPropStyle = {
    fontFamily: "Raleway",
    color: "#566D90",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 400,
}

const TotalPropNumStyle = {
    ...TotalPropStyle,
    fontWeight: 700,
    fontSize: "1rem"
}

const BoxStyle = {
    minWidth: 300, borderRadius: "0.75rem", background: "#EEEEEE", minHeight: 50, gap: "2rem", display: "flex", justifyContent: "center", alignItems: "center",
    '&:hover': {
        background: "#2A3649",
        cursor: "pointer",
        '& > .name': {
            color: "#FFFFFF", // Example: change text color on hover
        },
        '& > .pinCodeImage': {
            content: `url(${PincodeWhite})`, // Change image on hover
        },
    },
}
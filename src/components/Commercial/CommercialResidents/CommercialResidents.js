import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import AddResidentModal from '../AddResidentModal/AddResidentModal';
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddResidentIcon from "../../../assests/add_residen_icon.svg";
import ResidentIcon from "../../../assests/commercialAdmin/resident_person_icon.svg"
import { getDatabase, ref, onValue, get, push } from "firebase/database";





function CommercialResidents() {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");
    const [activeTab, setActiveTab] = useState("totalResidents")

    const [showAddUserModal, setAddUserModal] = useState(false);
    const [modalBgColor, setModalBgColor] = useState('#2A3649'); // Default color
    const [modalContent, setModalContent] = useState(''); // State for modal content

    const [showBlockModal, setBlockModal] = useState(false);
    const [username, setUserName] = useState();
    const [residents, setResidents] = useState([]);
    const [selectedResident, setSelectedResident] = useState([]);
    const [status, setStatus] = useState("");
    const [Residents2, setResidents2] = useState([]);

    let com_prop_id = localStorage.getItem("userKey");
    const commercial_prop_id = localStorage.getItem("commercialPropId");


    // useEffect(() => {
    //     const fetchResidents = async () => {
    //         try {
    //             // Make a GET request to fetch residents with the specified comPropId
    //             const response = await axios.get(
    //                 `https://ot-technologies.com/commercialAdmin/get_residents/${com_prop_id}?commercial_prop_id=${commercial_prop_id}`
    //             );
    //             setStatus(response.data.status)
    //             setResidents(response.data.residents);
    //         } catch (error) {
    //             console.error("Error fetching residents:", error);
    //             if (error.response.data.login) {
    //                 alert(error.response.data.message);
    //                 navigate("/login");
    //             }

    //         }
    //     };

    //     fetchResidents();
    // }, [com_prop_id, showAddUserModal]);



    useEffect(() => {
        const database = getDatabase();
        const residentsRef = ref(database, `/property/${commercial_prop_id}/commercialResidents`);
        onValue(residentsRef, (snapshot) => {
            const residentsData = snapshot.val();

            if (residentsData) {
                setResidents(residentsData);
                setStatus("Residents fetched successfully");
            }
            else {
                setResidents([])
            }
        });
    }, []);



    const handleSearchInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    };

    console.log(residents, "the resident that i want ")

    const residentEntries = residents ? Object.entries(residents) : [];

    const totalResidents = residentEntries;
    const suspendedResidents = residentEntries.filter(([key, resident]) => resident.suspendResident === 'true');
    const notLinkedResidents = residentEntries.filter(([key, resident]) => !resident.propertyId);
    const subscriptionCanceledResidents = residentEntries.filter(([key, resident]) => resident.isSubscriptionCancelled === 'true');

    const residentsToDisplay = () => {
        switch (activeTab) {
            case 'suspendedResidents':
                return suspendedResidents;
            case 'notLinked':
                return notLinkedResidents;
            case 'subscriptionCanceled':
                return subscriptionCanceledResidents;
            default:
                return totalResidents;
        }
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    console.log(activeTab)


    const handleOpenModal = (color, content, selectedResident) => {
        setModalBgColor(color);
        setModalContent(content);
        setSelectedResident(selectedResident)
        setAddUserModal(true);

    };



    const [formData, setFormData] = useState({
        name: "",
        lname: "",
        email: "",
        repeatEmail: "",
        // address: "",
        // phone: "",
        status: "active",
    });



    const handleSendInvitation = async () => {
        try {
            // Assuming formData contains the resident details
            const { name, lname, email, repeatEmail, status } = formData;

            // Check if all required fields are filled
            if (!name || !lname || !email || !repeatEmail || !status) {
                alert("Please fill in all required fields");
                return;
            }

            // Check if email matches repeatEmail
            if (email !== repeatEmail) {
                alert("Emails do not match. Please check and try again.");
                return;
            }

            // Make a POST request to the backend endpoint
            const response = await axios.post(
                `https://ot-technologies.com/commercialAdmin/add_residents/${com_prop_id}`,
                {
                    name,
                    lname,
                    email,
                    // address,
                    // phone,
                    commercial_prop_id,
                    status,
                }
            );

            console.log("API Response:", response.data);

            // setResidents(response.data.residents);
            setAddUserModal(false);
            setFormData({
                ...formData,
                name: "",
                lname: "",
                email: "",
                repeatEmail: "",
                // address: "",
                // phone: "",
            });
            // Handle the response or update state as needed
        } catch (error) {
            console.error("Error sending invitation:", error);
            if (error.response.data.login) {
                alert(error.response.data.message);
                navigate("/login");
            }
            alert(error.response.data.error);
            // Handle errors or show an error message to the user
        }
    };




    // Apply search filter
    const filteredResidents = residentsToDisplay().filter(([key, resident]) => {
        const residentName = `${resident.firstName} ${resident.lastName}`.toLowerCase();
        const residentEmail = resident?.email?.toLowerCase();
        return residentName.includes(searchInput.toLowerCase()) || residentEmail.includes(searchInput.toLowerCase());
    });



    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button onClick={() => handleOpenModal("#2A3649", "addResident")} sx={{ gap: "0.7rem", color: "#566D90", fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9rem", textTransform: "none" }} >
                    <PersonAddAlt1Icon sx={{ color: '#566D90', }} />   Add Resident
                </Button>

                <div className="col-4 d-flex" style={{ marginRight: "-1.3rem" }}>
                    <img src={searchIcon} style={iconStyle} alt="" />{" "}
                    <Form.Control
                        style={SearchInputStyle}
                        id="SearchInput"
                        type="text"
                        placeholder="Search Resident"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>
            </Box>


            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", pt: "0.2rem" }}>



                <Box sx={{ display: "flex", gap: "0.3rem", flexDirection: "column", alignItems: "left", pt: "0.5rem" }}>
                    <div onClick={() => handleTabClick('totalResidents')} style={{ cursor: 'pointer' }}>
                        <span style={TotalPropStyle}>
                            Total Residents
                        </span>
                    </div>

                    <div onClick={() => handleTabClick('notLinked')} style={{ cursor: 'pointer' }}>
                        <span style={TotalPropStyle}>
                            Not Linked
                        </span>
                    </div>
                    <div onClick={() => handleTabClick('suspendedResidents')} style={{ cursor: 'pointer' }}>
                        <span style={TotalPropStyle}>
                            Suspended Residents
                        </span>
                    </div>
                    <div onClick={() => handleTabClick('subscriptionCanceled')} style={{ cursor: 'pointer' }}>
                        <span style={TotalPropStyle}>
                            Subscription Canceled
                        </span>
                    </div>
                </Box>
                <Box sx={{ display: "flex", gap: "0rem", flexDirection: "column", alignItems: "left" }}>
                    <span style={TotalPropNumStyle}>{totalResidents.length}</span>
                    <span style={{ ...TotalPropNumStyle, color: "#446B54" }}>{notLinkedResidents.length}</span>
                    <span style={{ ...TotalPropNumStyle, color: "#D0301F" }}>{suspendedResidents.length}</span>
                    <span style={{ ...TotalPropNumStyle, color: "#F08F00" }}>{subscriptionCanceledResidents.length}</span>
                </Box>


                <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: "column", position: "relative" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        {activeTab === 'totalResidents' && <Box sx={{ borderRadius: "0.7rem", background: "#566D90", width: "1.5rem", height: "0.5rem", position: "absolute", right: -20, top: -38 }} />}
                        {activeTab === 'notLinked' && <Box sx={{ borderRadius: "0.7rem", background: "#446B54", width: "1.5rem", height: "0.5rem", position: "absolute", right: -20, top: -15 }} />}
                        {activeTab === 'suspendedResidents' && <Box sx={{ borderRadius: "0.7rem", background: "#D0301F", width: "1.5rem", height: "0.5rem", position: "absolute", right: -20, top: 10 }} />}
                        {activeTab === 'subscriptionCanceled' && <Box sx={{ borderRadius: "0.7rem", background: "#F08F00", width: "1.5rem", height: "0.5rem", position: "absolute", right: -20, top: 33 }} />}

                    </Box>
                </Box>
            </Box>


            <Grid container spacing={5} mt={'0rem'}>
                {filteredResidents.map(([key, resident]) => {
                    const isSuspended = resident.suspendResident === 'true';
                    const isSubscriptionCancelled = resident.isSubscriptionCancelled === "true";
                    const notLinked = !resident.propertyId;


                    let boxColor = '#EEEEEE'; // Default color
                    let modalBgColor = '#2A3649';
                    let modalType = 'activeResident'; // Default modal type


                    if (isSubscriptionCancelled) {
                        boxColor = '#F08F00';
                        modalBgColor = '#F08F00';
                        modalType = 'subscriptionCancelled';
                    } else if (notLinked) {
                        boxColor = '#446B54';
                        modalBgColor = '#446B54';
                        modalType = 'notLinked';
                    } else if (isSuspended) {
                        boxColor = '#D0301F';
                        modalBgColor = '#D0301F';
                        modalType = 'suspendedResident';
                    }


                    const textColor = modalType === "activeResident" ? '#566D90' : '#FFF';

                    // Conditionally apply hover styles
                    const boxStyleWithHover = {
                        ...BoxStyle,
                        background: boxColor,
                        '&:hover': modalType === 'activeResident' ? {
                            background: '#2A3649',
                            cursor: 'pointer',
                            '& > .name': {
                                color: '#FFFFFF',
                            },
                            '& > .icon': {
                                color: '#FFFFFF',
                            },
                        } : {},
                    };

                    return (
                        <Grid item lg={4} sm={6} xs={12} key={key}>
                            <Box
                                sx={boxStyleWithHover}
                                onClick={() =>
                                    handleOpenModal(modalBgColor, modalType, resident)
                                }
                            >
                                <PersonIcon className={modalType === 'activeResident' ? 'icon' : ''} sx={{ color: textColor }} />
                                <Typography
                                    className={modalType === 'activeResident' ? 'name' : ''}
                                    sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '0.9rem', color: textColor }}
                                >
                                    {`${resident.firstName} ${resident.lastName}`}
                                </Typography>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>


            <Modal
                size="lg"
                centered
                show={showAddUserModal}
                style={{}}
                onHide={() => setAddUserModal(false)}
            >
                <Modal.Title
                    className="w-100 p-2 align-itmes-center d-flex justify-content-center"
                    style={{
                        alignItems: "center",
                        height: "62px", background: modalBgColor,
                        color: "white",
                    }}
                >
                    <img style={{ marginRight: "30px" }}
                        src={modalContent === "addResident" ? AddResidentIcon : ResidentIcon}
                        alt="" />
                    <span
                        style={{
                            fontWeight: "600",
                            fontFamily: "Open Sans",
                            fontSize: "20px",
                        }}
                    ></span>
                    {modalContent === "addResident" ? '' : `${selectedResident.firstName} ${selectedResident.lastName}`}
                </Modal.Title>
                <Modal.Body style={{ background: "#FFF", }}>
                    <AddResidentModal

                        formData={formData}
                        setFormData={setFormData}
                        handleSendInvitation={handleSendInvitation}
                        setResidents={setResidents}
                        selectedResident={selectedResident}
                        setAddUserModal={setAddUserModal}
                        ModalStatus={modalContent}
                    />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default CommercialResidents



const SearchInputStyle = {
    border: "none",
    height: 35,
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
    minWidth: 300, borderRadius: "0.75rem", background: "#EEEEEE", minHeight: 50, gap: "2rem", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer",
}
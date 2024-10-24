import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import DeleteDialogue from "../DeleteDialogue/DeleteDialogue"
import GreenDot from "../../../assests/superAdmin/green_dot.svg";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import RedDot from "../../../assests/superAdmin/red_dot.svg";

import QRCode from "qrcode.react";
import { Typography } from "@mui/material";



export default function NewResidendialDetailModal({
    property,
    PropertyData,
    setPropertyData,
    label,
    setCommercialProperties,
    setPropertyModal,
}) {
    const box2Text = {
        color: "#19A752",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "700",
        cursor: "pointer",
    };

    const RedText = {
        ...box2Text,
        color: "#C24E42",
    };

    const downloadText = {
        ...box2Text,
        textDecoration: "underline",
        color: "#2A3649",
        cursor: "pointer",
    };

    const [isListed, setIsListed] = useState(false);

    const [status, setStatus] = useState("");
    const [minUserLicenses, setMinUserLicenses] = useState("");


    const [usercount, setUserCount] = useState("")

    useEffect(() => {
        if (!PropertyData.propertyId || !PropertyData.id) {
            setUserCount(0)
            return;
        }
        const db = getDatabase();
        const commercialResidentsRef = ref(db, `/property/${PropertyData.propertyId}/commercialResidents`);
        const commercialRef = ref(db, `/commercial/${PropertyData.id}/usercount`);

        onValue(commercialResidentsRef, (snapshot) => {
            let userCount = 0;

            if (snapshot.exists()) {
                userCount = snapshot.size; // Count the number of children in the node
                // Update the `usercount` key in the /commercial/${PropertyData.id} reference
                set(commercialRef, userCount)
                    .then(() => {
                        console.log(`User count updated to ${userCount} for property ID: ${PropertyData.propertyId}`);
                        setUserCount(userCount)
                    })
                    .catch((error) => {
                        console.error('Error updating user count:', error);
                    });
            }
            else {
                setUserCount(userCount)
            }

        });


    }, [PropertyData.propertyId, PropertyData.id]);


    useEffect(() => {
        setStatus(PropertyData.status);

        setMinUserLicenses(PropertyData.minUserLicense)
    }, []);

    const [licenseCount, setLicenseCount] = useState(0);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            try {
                // Make GET request to the server
                const response = await axios.get(`https://ot-technologies.com/super/getUserLicenseCount/${PropertyData.id}`);

                // Extract license count from the response data
                const { data } = response;
                setLicenseCount(data.licenseCount);
                setLoader(false)
            } catch (error) {
                // Handle errors
                console.error('Error fetching license count:', error);
                setLoader(false)
            }
        };

        // Call the fetchData function
        fetchData();
    }, [licenseCount]);



    console.log(PropertyData, "the data i am looking for")

    const propertyId = PropertyData?.propertyId
    const com_prop_id = PropertyData?.id
    const DeleteCommercialAdmin = async () => {
        try {
            const response = await axios.delete(
                `https://ot-technologies.com/super/deleteCommercialAdmin/${com_prop_id}?propertyId=${propertyId}`,

            );
            console.log(response.data); // Handle the response as needed

        } catch (error) {
            console.error("Error deleting user:", error);
            if (error.response.data.login) {
                alert(error.response.data.message);
                return;
            }
        }
    };



    const handleSaveClick = async () => {
        console.log(PropertyData.id)
        try {
            const prop_id = PropertyData.id;
            const commericalPropertyId = PropertyData.propertyId;

            const response = await axios.put(
                `https://ot-technologies.com/super/changeStatus/${prop_id}`,
                {
                    commericalPropertyId: commericalPropertyId,
                    minUserLicense: minUserLicenses,
                }
            );
            alert(`Status Changed Successfully`);
            console.log("PUT request successful:", response.data);
            // setPropertyData(response.data.propData)
            // setCommercialProperties(response.data.properties)

            // Handle the response or perform additional actions as needed
        } catch (error) {
            console.error("Error making PUT request:", error);
            // Handle the error or perform fallback actions
        }
    };

    const toggleStatus = () => {
        setStatus((prevStatus) =>
            prevStatus === "active" ? "inactive" : "active"
        );
    };
    // console.log(PropertyData);
    const dotImage1 = PropertyData.pcbId1 ? GreenDot : RedDot;
    const dotImage2 = PropertyData.pcbId2 ? GreenDot : RedDot;

    console.log((licenseCount));
    console.log(PropertyData.propertyId, "the property id comming from card to this modal")






    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

    const handleDelete = () => {
        DeleteCommercialAdmin();
        setShowDeleteDialogue(false);
        setPropertyModal(false);
    };

    const handleDeleteDialogueOpen = () => {
        setShowDeleteDialogue(true);
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };







    const phoneNumber = PropertyData?.phoneNumber;
    const formattedPhoneNumber = phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');


    return (
        //border: "4px solid #2A3649"
        <div
            className="container"
            style={{ backgroundColor: "#EEE", padding: "0px", }}
        >
            <LoadingScreen open={isListed} />

            <div className="row">
                <div className="col text-end" style={dateStyle}>
                    {PropertyData.createdAt}
                </div>
            </div>
            <div className="row mt-3 d-flex align-items-center justify-content-center" >
                <div className="col-5">
                    <span style={boxLabelText}>PCB ID 1:{""}</span>
                </div>

                <div className="col-4 p-1 text-center" style={{ ...boxStyle, position: "relative" }}>
                    <span>
                        <img src={dotImage1} style={{ left: 5, top: 10, position: "absolute" }} alt="" />
                    </span>
                    <span style={boxText}>{PropertyData.pcbId1 || "-"}</span>
                </div>
            </div>
            <div className="row mt-3 d-flex align-items-center justify-content-center">
                <div className="col-5">
                    <span style={boxLabelText}>PCB ID 2:{""}</span>
                </div>

                <div className="col-4 p-1 text-center" style={{ ...boxStyle, position: "relative" }}>
                    <span>
                        <img src={dotImage2} style={{ left: 5, top: 10, position: "absolute" }} alt="" />
                    </span>
                    <span style={boxText}>{PropertyData.pcbId2 || "-"}</span>
                </div>
            </div>

            {label === "Residential" ? null : (
                <>
                    {" "}
                    <div className="row mt-4 d-flex align-items-center justify-content-center ">
                        <div className="col-5">
                            <span style={boxLabelText}>Max PIN Codes :</span>
                        </div>

                        <div className="col-4 p-1 text-center" style={boxStyle}>
                            <span style={boxText}>10</span>
                        </div>
                    </div>
                    <div className="row mt-4 d-flex align-items-center justify-content-center">
                        <div className="col-5">
                            <span style={boxLabelText}>Minimum Users:</span>
                        </div>

                        <div className="col-4 p-1 text-center" style={boxStyle}>
                            <input
                                type="text"
                                value={minUserLicenses}
                                maxLength={5}
                                onChange={(e) => setMinUserLicenses(e.target.value)}
                                style={{
                                    ...boxText,
                                    border: "none",
                                    outline: "none",
                                    width: "100%",
                                    textAlign: "center",
                                    backgroundColor: "rgb(238, 238, 238)"
                                }}
                            />
                        </div>
                    </div>
                </>
            )}


            <div className="row d-flex justify-content-center mt-5">
                <div className="col-8 text-center">
                    <button style={savebtn} onClick={handleSaveClick}>
                        Save
                    </button>
                    <div className="text-center mt-2" >
                        <span style={{ color: "#C24E42", fontFamily: "Poppins", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }} onClick={handleDeleteDialogueOpen} >Delete Account</span>
                    </div>
                </div>
            </div>


            <div style={lineContainerStyle}>
                <hr style={lineStyle} />
            </div>

            <div className="row mt- d-grid mb-4" >
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-9">
                        <span style={ManagmentHeadingStyle}>Managment</span>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Name:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <span style={{ ...ManagmentTextStyle, fontWeight: 600, textTransform: "capitalize" }}>
                            {PropertyData.name || PropertyData.UserName}
                        </span>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Last Name:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <span style={{ ...ManagmentTextStyle, fontWeight: 600, textTransform: "capitalize" }}>
                            {PropertyData.lastName || PropertyData.LastName}
                        </span>
                    </div>
                </div>


                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Email:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <Typography style={{ ...ManagmentTextStyle, fontWeight: 600, }}>{PropertyData.email}</Typography>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Phone Number:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <span style={{ ...ManagmentTextStyle, fontWeight: 600, }}>
                            {formattedPhoneNumber}
                        </span>
                    </div>
                </div>


            </div>



            <div className="row d-grid mb-3">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-9">
                        <span style={ManagmentHeadingStyle}>Property</span>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Property Name:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <span style={{ ...ManagmentTextStyle, fontWeight: 600, textTransform: "capitalize" }}>
                            {PropertyData.propertyName}
                        </span>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Property Email:</span>
                    </div>

                    <div className="col-4 p-1 " style={{}}>
                        <span style={{ ...ManagmentTextStyle, fontWeight: 600, }}>
                            {PropertyData.propertyEmail}
                        </span>
                    </div>
                </div>


                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="col-5">
                        <span style={ManagmentTextStyle}>Address:</span>
                    </div>

                    <div className="col-4 p-1" style={{}} >
                        <Typography sx={{ ...ManagmentTextStyle, fontWeight: 600, }}>{PropertyData.address} </Typography>
                    </div>
                </div>


            </div>


            <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="col-5">
                    <span style={ManagmentHeadingStyle} >Users</span>
                </div>

                <div className="col-4 p-1 " style={{}}>
                    <span style={ManagmentHeadingStyle}>
                        {usercount}
                    </span>
                </div>
            </div>

            {showDeleteDialogue && (
                <DeleteDialogue
                    handleDeleteOpen={handleDeleteDialogueOpen}
                    handleDelete={handleDelete}
                    handleDeleteClose={handleDeleteDialogueClose}
                />
            )}
        </div>
    );
}


const savebtn = {
    borderRadius: "15px",
    border: "#2A3649 solid 1px",
    color: "#2A3649",
    borderRadius: "15px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    width: "234px",
    height: "36px",
};

const boxStyle = {
    borderRadius: "3px",
    border: "#727272 solid 1px",
};
const boxText = {
    color: "#727272",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
};

const boxLabelText = {
    color: "#566D90",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
};

const dateStyle = {
    color: "#727272",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    padding: "5px 20px 0px 0px",
};
const lineContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px", // Adjust the height as needed
};

const lineStyle = {
    width: "90%",
    borderRadius: "0.75rem",
    border: "2px solid #2A3649",
    opacity: "unset"
};

const ManagmentTextStyle = {
    color: "#727272",
    fontFamily: "Poppins",

    fontSize: "14px",
    fontStyle: "normal",
    textAlign: "start",
    fontWeight: 500,
};

const ManagmentHeadingStyle = {
    ...ManagmentTextStyle,
    color: "#2A3649",
    fontSize: "1rem",
};



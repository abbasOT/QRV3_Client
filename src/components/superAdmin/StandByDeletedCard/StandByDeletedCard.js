import React, { useState } from "react";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import { Box, Grid } from "@mui/material";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import QRCode from "qrcode.react";

import { Button, Card, Form, Modal } from "react-bootstrap";
import PropertyDetailModal from "../../../components/superAdmin/PropertyDetailModal/PropertyDetailModal";
import DeleteDialogue from "../DeleteDialogue/DeleteDialogue";
import { Typography } from "@mui/material";
const CardStyle = {
    width: "405px",
    borderRadius: "13px",
    border: "#C24E42 solid 5px",
    backgroundColor: "#EEE",
    marginLeft: "20px",
    marginRight: "20px",
    cursor: "pointer",
    //   cursor: "pointer",
};



const TextStyle = {
    color: "#566D90",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "0.9rem",
};

const dateStyle = {
    color: "#727272",
    fontFamily: "Poppins",
    fontSize: "0.9rem",
    fontWeight: 400,
    padding: "5px 5px 0px 0px",
    marginLeft: "auto",
};

const TotalPropStyle = {
    fontFamily: "Raleway",
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
};
const TotalPropNumStyle = {
    ...TotalPropStyle,
    fontWeight: 400,
    marginLeft: "10px",
};

function StandByDeletedCard({
    status,
    arrayName,
    dataArray,
    handleDeleteDeletedProperty,
}) {

    console.log(dataArray);

    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState("");


    const handleDelete = () => {
        handleDeleteDeletedProperty(propertyToDelete)
        setShowDeleteDialogue(false);
    };

    const handleDeleteDialogueOpen = (propertyId) => {
        setShowDeleteDialogue(true);
        setPropertyToDelete(propertyId)
    };
    const handleDeleteDialogueClose = () => {
        setShowDeleteDialogue(false);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US'); // formats the date as MM/DD/YYYY
    };

    return (
        <>
            {Object.keys(dataArray).length > 0 ? (
                <Grid container spacing={1} className="mt-2 d-flex justify-content-start align-items-center" width={"95%"}>
                    {Object.keys(dataArray).map((pcbId) => (
                        <Grid item md={4} xs={12} key={pcbId}>

                            <div
                                style={CardStyle}
                                key={dataArray[pcbId].pcbId}
                                className="col-md-4 mb-4 align-items-start justify-content-center p-0"
                            >
                                <div
                                    className=" d-flex align-items-center justify-content-between"
                                    style={{
                                        backgroundColor: "#C24E42",
                                        width: "100%",
                                        height: "48px",
                                        color: "white",
                                        padding: "0px 10px",
                                    }}
                                >
                                    <span style={{ ...TotalPropStyle, fontFamily: "Poppins" }}>
                                        {arrayName === "properties" ? "Property ID: " : "PCB ID: "}
                                        <span style={{ ...TotalPropNumStyle, fontFamily: "Poppins", }}>
                                            {arrayName === "properties" ? dataArray[pcbId].id : dataArray[pcbId].pcbId}
                                        </span>
                                    </span>{" "}
                                    <span>
                                        {/* <img style={{ marginRight: "20px" }} src={offIcon} alt="" /> */}
                                        <img
                                            src={deleteIcon}
                                            alt=""
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // handleDeletePCB(dataArray[pcbId].pcbId);
                                                handleDeleteDialogueOpen(arrayName === "properties" ? dataArray[pcbId].id : dataArray[pcbId].pcbId);
                                            }}
                                        />
                                    </span>

                                </div>

                                <div
                                    className="align-items-center d-grid"
                                    style={{ minHeight: "60px", height: "100%" }}
                                >

                                    <div
                                        className=" d-flex align-items-center justify-content-around"
                                        style={{ backgroundColor: "#EEE", gap: "0.5rem", padding: "1rem", borderBottomLeftRadius: "0.5rem", borderBottomRightRadius: "0.5rem" }}
                                    >
                                        <Typography sx={TextStyle}>
                                            {/* {dataArray[pcbId].createdAt} */}
                                            {arrayName === "properties"
                                                ? `Email: ${dataArray[pcbId].email}`
                                                : `Property ID: ${dataArray[pcbId].propertyId}`}
                                        </Typography>
                                        <Typography sx={dateStyle}>
                                            {formatDate(dataArray[pcbId]?.date)}
                                        </Typography>

                                        {/* <img src={QrIcon} alt="" /> */}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    {status === "both" ? (
                        <p></p>
                    ) : status === "properties" ? (
                        <p>No properties available....</p>
                    ) : status === "pcbs" ? (
                        <p>No pcbs available....</p>
                    ) : null}
                </>
            )}
            {showDeleteDialogue && (
                <DeleteDialogue
                    handleDeleteOpen={handleDeleteDialogueOpen}
                    handleDelete={handleDelete}
                    handleDeleteClose={handleDeleteDialogueClose}
                />
            )}
        </>

    );
}

export default StandByDeletedCard;



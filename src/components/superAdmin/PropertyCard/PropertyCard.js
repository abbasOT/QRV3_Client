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
  width: "398px",
  borderRadius: "13px",
  border: "#2A3649 solid 5px",
  backgroundColor: "#EEE",
  marginLeft: "20px",
  marginRight: "20px",
  cursor: "pointer",
  //   cursor: "pointer",
};

const downloadText = {
  color: "#19A752",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  textDecoration: "underline",
  color: "#2A3649",
  cursor: "pointer",
};

const inActiveStyle = {
  color: "#C24E42",
  fontFamily: "Poppins",
  fontWeight: "600",
};

const standByStyle = {
  ...inActiveStyle,
  color: "#727272",
};

const dateStyle = {
  color: "#FFF",
  fontFamily: "Poppins",
  fontSize: "10px",
  fontStyle: "normal",
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

function PropertyCard({
  dataArray,
  handleDeleteProperty,
  handleStandByProperty,
  isDisabled
}) {
  const [showPropertyModal, setPropertyModal] = useState(false);

  const downloadQR = (id) => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  console.log(dataArray);

  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState("");


  const handleDelete = () => {
    handleDeleteProperty(propertyToDelete)
    setShowDeleteDialogue(false);
  };

  const handleDeleteDialogueOpen = (propertyId) => {
    setShowDeleteDialogue(true);
    setPropertyToDelete(propertyId)
  };
  const handleDeleteDialogueClose = () => {
    setShowDeleteDialogue(false);
  };

  return (
    <>
      {Object.keys(dataArray).length > 0 ? (
        <Grid container spacing={1} className="mt-5 d-flex justify-content-start align-items-center" width={"90%"}>
          {Object.keys(dataArray).map((propertyId) => (
            <Grid item md={4} xs={12} margin={0}>

              <div
                style={CardStyle}
                // key={dataArray[propertyId]?.propertyId}
                className="col-md-4 mb-4  p-0"
              >
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    backgroundColor: "#2A3649",
                    width: "100%",
                    height: "35px",
                    color: "white",
                    padding: "0px 10px",
                  }}
                >
                  <Typography sx={{ ...TotalPropStyle, fontFamily: "Poppins" }}>
                    Property ID:{" "}
                    <Typography sx={{ ...TotalPropNumStyle, fontFamily: "Poppins" }}>
                      {dataArray[propertyId].propertyId}
                    </Typography>
                  </Typography>

                  {" "}
                  <span></span>{" "}
                  <Box sx={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    <img
                      style={{ marginRight: "20px" }}
                      src={offIcon}
                      alt=""
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                        if (!isDisabled) {
                          handleStandByProperty(dataArray[propertyId].propertyId);
                        }
                      }}
                    />
                    <img
                      src={deleteIcon}
                      alt=""
                      style={{ cursor: "pointer" }}

                      onClick={(e) => handleDeleteDialogueOpen(dataArray[propertyId].propertyId)}
                    />
                  </Box>
                </div>

              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No properties available.</p>
      )}

      {showDeleteDialogue && (
        <DeleteDialogue
          handleDeleteOpen={handleDeleteDialogueOpen}
          handleDelete={handleDelete}
          handleDeleteClose={handleDeleteDialogueClose}
        />
      )}
      <Modal
        size=""
        centered
        className="abc"
        show={showPropertyModal}
        style={{ width: "", height: "" }}
        onHide={() => setPropertyModal(false)}
      >
        <Modal.Body style={{ backgroundColor: "#EEE", padding: "0px" }}>
          <PropertyDetailModal />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PropertyCard;


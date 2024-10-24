import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import React, { useState } from "react";
import ResidentialDetailModal from "../PropertyDetailModal/PropertyDetailModal";
import PropertyDetailModal from "../PropertyDetailModal/PropertyDetailModal";
import { Modal } from "react-bootstrap";
import '../modal.css'
import NewResidentialDetailModal from "../PropertyDetailModal/NewResidendialDetailModal";
import { Typography, Grid } from "@mui/material";

const CardStyle = {
  width: "398px",
  height: "48px",
  borderRadius: "5px",
  background: "#2A3649",
  cursor: "pointer",
  marginLeft: "20px",
  marginRight: "20px",
};
const noIdCardStyle = {
  ...CardStyle,
  background: "#446B54", // Red background for cards without an ID
};

function PropIdCard({ label, dataArray, handleDeleteProperty, setCommercialProperties }) {
  const [showPropertyModal, setPropertyModal] = useState(false);
  const [PropertyData, setPropertyData] = useState({});

  const handleOpenModal = (propertyData) => {
    setPropertyData(propertyData);

    if (label === "Residential") {
      setPropertyModal(true);
    } else {
      setPropertyModal(true);
    }
  };

  function renderFirstHalf(id) {
    // Calculate the index to split the string in half
    const splitIndex = Math.ceil(id.length / 2);

    // Get the first half of the string
    const firstHalf = id.substring(0, splitIndex);

    // Return the JSX
    return <span>{firstHalf}</span>;
  }



  return (
    <>
      {Object.keys(dataArray).length > 0 ? (
        <Grid container spacing={1} className="mt-5 d-flex justify-content-start align-items-center" width={"95%"}>
          {Object.keys(dataArray).map((propertyId) => {
            const property = dataArray[propertyId];
            const cardStyle = property && property.propertyId ? CardStyle : noIdCardStyle;
            return (
              <Grid item md={4} xs={12} key={propertyId} >
                <div
                  style={cardStyle}
                  key={propertyId}
                  className="col-md-4 mb-4 align-items-center justify-content-center p-0"
                  onClick={() => handleOpenModal(property)}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{
                      height: "48px",
                      gap: "4rem",
                      padding: "0px 4rem 0rem 2rem",
                      color: "white",
                    }}
                  >
                    <Typography style={{ fontSize: "18px", fontFamily: "Poppins", fontWeight: 300 }}>Property ID:</Typography>
                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", fontWeight: 700 }}>
                      {property && property.propertyId ? property.propertyId : "Without ID"}
                    </Typography>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>

      ) : (
        <p>No properties available.</p>
      )}



      <Modal
        size=""
        centered
        // className="abc"
        show={showPropertyModal}
        style={{ height: "", border: "none" }}
        onHide={() => setPropertyModal(false)}
      >
        <Modal.Body style={{ backgroundColor: "#EEE", borderRadius: "1.2rem", padding: "1rem", overflow: "hidden", minWidth: "85%", width: "100%" }}>
          <NewResidentialDetailModal setPropertyModal={setPropertyModal} label={label} PropertyData={PropertyData} setPropertyData={setPropertyData} setCommercialProperties={setCommercialProperties} property={"commercial"} />
          {/* <PropertyDetailModal label={label} PropertyData={PropertyData} setPropertyData={setPropertyData} setCommercialProperties={setCommercialProperties} property={"commercial"}  />*/}
        </Modal.Body>
      </Modal>

    </>
  );
}

export default PropIdCard;



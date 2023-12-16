import React, { useState } from "react";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import QRCode from "qrcode.react";

import { Button, Card, Form, Modal } from "react-bootstrap";
import PropertyDetailModal from "../../../components/superAdmin/PropertyDetailModal/PropertyDetailModal";
const CardStyle = {
  width: "398px",
  height: "244px",
  borderRadius: "13px",
  border: "#2A3649 solid 5px",
  backgroundColor: "#EEE",
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
  color: "#727272",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  padding:"5px 5px 0px 0px",
  marginLeft:"auto"
};

function PropertyCard({
  dataArray,
  handleDeleteProperty,
  handleStandByProperty,
}) {
  const [showPropertyModal, setPropertyModal] = useState(false);

  const handleOpenModal = () => {
    setPropertyModal(true);
    console.log(showPropertyModal);
  };

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

  return (
    <>
      {Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((propertyId) => (
          <div
            style={CardStyle}
            key={dataArray[propertyId].propertyId}
            className="col-md-4 mb-4 align-items-start justify-content-center p-0"
            // onClick={() => handleOpenModal(dataArray[propertyId])}
          >
            <div
              className=" d-flex align-items-center justify-content-between"
              style={{
                backgroundColor: "#2A3649",
                width: "100%",
                height: "48px",
                color: "white",
                padding: "0px 10px",
              }}
            >
              <span>
                Property ID: <span>{dataArray[propertyId].propertyId}</span>
              </span>{" "}
              <span></span>{" "}
              <span>
                {dataArray[propertyId].status === "standby" ? null : (
                  <img
                    style={{ marginRight: "20px" }}
                    src={offIcon}
                    alt=""
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                      handleStandByProperty(dataArray[propertyId].propertyId);
                    }}
                  />
                )}
                <img
                  src={deleteIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                    handleDeleteProperty(dataArray[propertyId].propertyId);
                  }}
                />
              </span>
            </div>
            
            {dataArray[propertyId].status === "standby" ? (
                 <div className="d-flex">
                 <div style={dateStyle}>{dataArray[propertyId].createdAt}</div>
               </div>
   
                ) : null}
           
            <div
              className="align-items-center d-grid"
              style={{ height: "165px" }}
            >
              <div
                className=" d-flex align-items-center justify-content-around"
                style={{ backgroundColor: "#EEE" }}
              >
                <div
                  style={{
                    width: "100px",
                    textAlign: "left",
                    color: "#566D90",
                    fontFamily: "Poppins",
                  }}
                >
                  status:
                </div>
                <div
                  style={
                    dataArray[propertyId].status === "inactive"
                      ? inActiveStyle
                      : standByStyle
                  }
                >
                  {dataArray[propertyId].status}
                </div>
              </div>

              <div
                className=" d-flex align-items-center justify-content-around"
                style={{ backgroundColor: "#EEE" }}
              >
                <div
                  style={downloadText}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                    downloadQR(dataArray[propertyId].propertyId);
                  }}
                >
                  Download QR
                </div>
                <div>
                  <QRCode
                    id="123456"
                    value={`http://localhost:3000/property/${dataArray[propertyId].propertyId}`}
                    size={90}
                    level={"H"}
                    // includeMargin={true}
                  />
                  {/* <img src={QrIcon} alt="" /> */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
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

{
  /* {Object.keys(dataArray).map((propertyId) => (
          <li key={propertyId}>
            <strong>Property ID:</strong> {dataArray[propertyId].propertyId}
            <br />
            <strong>Status:</strong> {dataArray[propertyId].status}
          </li>
        ))} */
}

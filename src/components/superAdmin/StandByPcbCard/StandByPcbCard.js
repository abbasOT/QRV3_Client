import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import DeleteDialogue from "../DeleteDialogue/DeleteDialogue"
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import QRCode from "qrcode.react";

// const CardStyle = {
//   width: "398px",
//   height: "48px",
//   borderRadius: "5px",
//   border: "#2A3649 solid 1px",
//   backgroundColor: "#2A3649",
//   //   cursor: "pointer",
// };

const PcbIdStyle = { fontSize: "16px", fontFamily: "Poppins", fontWeight: "600" }

{/* <div
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
    value={`https://ot-technologies.com/property/${dataArray[propertyId].propertyId}`}
    size={90}
    level={"H"}
    // includeMargin={true}
  />
  
</div>
</div> */}


function StandByPcb({ dataArray, handleDeletePCB }) {

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


  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [pcbToDelete, setPcbToDelete] = useState("");


  const handleDelete = () => {
    handleDeletePCB(pcbToDelete)
    setShowDeleteDialogue(false);
  };

  const handleDeleteDialogueOpen = (pcbId) => {
    setPcbToDelete(pcbId)
    setShowDeleteDialogue(true);


  };
  const handleDeleteDialogueClose = () => {
    setShowDeleteDialogue(false);
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
                    backgroundColor: "#2A3649",
                    width: "100%",
                    height: "48px",
                    color: "white",
                    padding: "0px 10px",
                  }}
                >
                  <span style={{ ...TotalPropStyle, fontFamily: "Poppins" }}>
                    PCB ID:{" "}
                    <span style={{ ...TotalPropNumStyle, fontFamily: "Poppins", paddingLeft: "3rem" }}>
                      {dataArray[pcbId].pcbId}
                    </span>
                  </span>{" "}
                  {/* <div className="d-grid">

                     <span style={{ fontSize: "12px" }}>{dataArray[pcbId].isOnline ? 'Online' : 'Offline'}</span> 
                    <hr style={{ margin: "0px" }} />
                    <span style={{ fontSize: "8px" }}></span>
                  </div> */}
                  <span>
                    {/* <img style={{ marginRight: "20px" }} src={offIcon} alt="" /> */}
                    <img
                      src={deleteIcon}
                      alt=""
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleDeletePCB(dataArray[pcbId].pcbId);
                        handleDeleteDialogueOpen(dataArray[pcbId].pcbId);
                      }}
                    />
                  </span>

                </div>

                <div
                  className="align-items-center d-grid"
                  style={{ height: "165px" }}
                >

                  <div
                    className=" d-flex align-items-center justify-content-around"
                    style={{ backgroundColor: "#EEE", flexDirection: "column", gap: "0.5rem" }}
                  >
                    <Typography sx={dateStyle}>
                      {dataArray[pcbId].createdAt}
                    </Typography>
                    <div>
                      <QRCode
                        id="123456"
                        value={`https://ot-technologies.com/property/${dataArray[pcbId].pcbId}`}
                        size={90}
                        level={"H"}
                      // includeMargin={true}
                      />

                    </div>
                    <div
                      style={downloadText}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                        downloadQR(dataArray[pcbId].pcbId);
                      }}
                    >
                      Download QR
                    </div>

                    {/* <img src={QrIcon} alt="" /> */}
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No Stand By pcbs available.</p>
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

export default StandByPcb;

const CardStyle = {
  width: "398px",
  height: "244px",
  borderRadius: "13px",
  border: "#2A3649 solid 5px",
  backgroundColor: "#EEE",
  marginLeft: "20px",
  marginRight: "20px",
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
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: "400",
  padding: "5px 5px 0px 0px",
  marginLeft: "auto",
};

const TotalPropStyle = {
  fontFamily: "Raleway",
  fontSize: "18px",
  fontWeight: "600",
  color: "#fff",
};
const TotalPropNumStyle = {
  ...TotalPropStyle,
  fontWeight: "400",
  marginLeft: "5px",
};
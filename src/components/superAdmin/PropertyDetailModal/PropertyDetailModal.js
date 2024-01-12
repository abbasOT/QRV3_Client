import axios from "axios";
import React, { useState,useEffect } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";

import GreenDot from "../../../assests/superAdmin/green_dot.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import RedDot from "../../../assests/superAdmin/red_dot.svg";

import QRCode from "qrcode.react";

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
  border: "3px solid #2A3649",
  flexShrink: 0,
};

const ManagmentTextStyle = {
  color: "#727272",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  textAlign: "start",
  fontWeight: "600",
};

const ManagmentHeadingStyle = {
  ...ManagmentTextStyle,
  color: "#2A3649",
  fontSize: "16px",
};

export default function PropertyDetailModal({
  PropertyData,
  message,
  handleClick,
  label,
  updateStatus,
  setStatus,
  status,
}) {

  const box2Text = {
    color: "#19A752",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    cursor:"pointer"
  };
  const downloadText = {
    ...box2Text,
    textDecoration: "underline",
    color: "#2A3649",
    cursor:"pointer"
  };

  const [isListed, setIsListed] = useState(false);
  console.log(PropertyData);

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

  useEffect(() => {
    setStatus(PropertyData.pcbStatus)
  }, []);


  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === 'online' ? 'offline' : 'online'));
  };
  const dotImage = PropertyData.pcbId  ? GreenDot : RedDot;
  return (
    <div
      className="container"
      style={{ backgroundColor: "#EEE", padding: "0px" }}
    >
      <LoadingScreen open={isListed} />

      <div className="row">
        <div className="col text-end" style={dateStyle}>
          {PropertyData.createdAt}
        </div>
      </div>
      <div className="row mt-3 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>PCB ID:{""}</span>
        </div>

        <div className="col-4 p-1 text-center" style={boxStyle}>
          <span>
          <img src={dotImage} style={{ marginRight: "10px" }} alt="" />
          </span>
          <span style={boxText}>
            
             {PropertyData.pcbId || '-'}
          </span>
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
              <span style={boxLabelText}>Min User License :</span>
            </div>

            <div className="col-4 p-1 text-center" style={boxStyle}>
              <span style={boxText}>20</span>
            </div>
          </div>
        </>
      )}

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>Status:</span>
        </div>

        <div className="col-4 p-1 text-center" style={{}}>
          <span style={box2Text} onClick={toggleStatus}>{status}</span>
        </div>
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span
            style={downloadText}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
              downloadQR("dataArray[propertyId].propertyId");
            }}
          >
            Download QR
          </span>
        </div>

        <div className="col-4 p-1 text-center" style={{}}>
          <span style={box2Text}>
            <QRCode
              id="123456"
              value={`https://192.168.18.147:3000/property/${PropertyData.pcbId}`}
              size={90}
              level={"H"}
              // includeMargin={true}
            />
          </span>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-5">
        <div className="col-7 text-center">
          <button style={savebtn} onClick={() => handleClick("no", label)}>
            Save
          </button>
        </div>
      </div>
      <div style={lineContainerStyle}>
        <hr style={lineStyle} />
      </div>

      <div className="row mt- d-grid mb-5">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-9">
            <span style={ManagmentHeadingStyle}>Managment:</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Name:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>
              {PropertyData.name || PropertyData.UserName}
            </span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Last Name:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>
              {PropertyData.lastName || PropertyData.LastName}
            </span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Address :</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>{PropertyData.address}</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Email:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>{PropertyData.email}</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Phone Number:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>
              {PropertyData.phoneNumber || PropertyData.number}
            </span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>User Licenses:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>{""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

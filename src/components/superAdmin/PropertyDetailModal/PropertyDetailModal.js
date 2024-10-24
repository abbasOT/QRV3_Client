import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";

import GreenDot from "../../../assests/superAdmin/green_dot.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import RedDot from "../../../assests/superAdmin/red_dot.svg";

import QRCode from "qrcode.react";



export default function PropertyDetailModal({
  property,
  PropertyData,
  setPropertyData,
  label,
  setCommercialProperties,
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



  const handleSaveClick = async () => {
    console.log(PropertyData.id)
    try {
      const prop_id = PropertyData.id;

      const response = await axios.put(
        `https://ot-technologies.com/super/changeStatus/${prop_id}`,
        {
          status: status,
          minUserLicense: minUserLicenses,
        }
      );
      alert(`Status Changed Successfully to ${status}`);
      console.log("PUT request successful:", response.data);
      setPropertyData(response.data.propData)
      setCommercialProperties(response.data.properties)

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
  const dotImage = PropertyData.pcbId ? GreenDot : RedDot;


  console.log((licenseCount));
  console.log(PropertyData.propertyId, "the pcb id comming from card to this modal")

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
      <div className="row mt-3 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>PCB ID:{""}</span>
        </div>

        <div className="col-4 p-1 text-center" style={boxStyle}>
          <span>
            <img src={dotImage} style={{ marginRight: "10px" }} alt="" />
          </span>
          <span style={boxText}>{PropertyData.propertyId || "-"}</span>
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
              <input
                type="text"
                value={minUserLicenses}
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

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>Status:</span>
        </div>

        <div className="col-4 p-1 text-center" style={{}}>
          <span
            style={status === "active" ? box2Text : RedText}
            onClick={toggleStatus}
          >
            {status}
          </span>
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
              value={`https://ot-technologies.com/property/${PropertyData.pcbId}`}
              size={90}
              level={"H"}
            // includeMargin={true}
            />
          </span>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-5">
        <div className="col-7 text-center">
          <button style={savebtn} onClick={handleSaveClick}>
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
            {licenseCount || licenseCount === 0 ? <span style={ManagmentTextStyle}>{licenseCount}</span> : <>Loading...</>}

          </div>
        </div>
      </div>
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
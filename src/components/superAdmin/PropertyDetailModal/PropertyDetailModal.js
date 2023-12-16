import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";

import GreenDot from "../../../assests/superAdmin/green_dot.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";
import RedDot from "../../../assests/superAdmin/red_dot.svg";

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

const box2Text = {
  color: "#19A752",
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

const downloadText = {
  ...box2Text,
  textDecoration: "underline",
  color: "#2A3649",
};

const dateStyle = {
  color: "#727272",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  padding:"5px 20px 0px 0px"
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

const ManagmentTextStyle={
  color: "#727272",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  textAlign:"start",
  fontWeight: "600",
}

const ManagmentHeadingStyle={

 ...ManagmentTextStyle,
 color: "#2A3649",
 fontSize: "16px",
}

export default function PropertyDetailModal({ message, handleClick, label }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ShowPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();

  const [isListed, setIsListed] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const handleSubmit = (event, value) => {
    if (value == "yes") {
      alert(value);
    }
    setIsListed(true);
    event.preventDefault();
    // setEmail(formData.email)
    // Here you would perform validation on form data before sending it to the server

    axios
      .post(`https://sailiteasy.com/api/users/register`, formData)
      .then((response) => {
        // Handle success
        console.log("User registered:", response.data.message);
        // alert.show(response.data.message,{
        //   type: "success",
        //   timeout: 5000,
        // });
        // setshowSignUpModal(false);
        // setConfirmEmailModal(true);
        // setIsListed(false)
        // Perform any additional actions (redirect, state update, etc.) upon successful registration
      })
      .catch((error) => {
        if (error.response) {
          //       alert.show(error.response.data.message, {
          //     type: "error",
          //     timeout: 5000,
          //   });
          setIsListed(false);
        } else {
          // alert.show("Server Not Responding Try Again Later",{
          //   type: "error",
          //   timeout: 5000,
          // });
          setIsListed(false);
        }
      });
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#EEE", padding: "0px" }}
    >
      <LoadingScreen open={isListed} />

      <div className="row">
        <div className="col text-end" style={dateStyle}>
          04/21/2023
        </div>
      </div>
      <div className="row mt-3 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>PCB ID:</span>
        </div>

        <div className="col-4 p-1 text-center" style={boxStyle}>
          <span style={boxText}>
            <img src={GreenDot} style={{ marginRight: "10px" }} alt="" />
            GHBT3768
          </span>
        </div>
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-center ">
        <div className="col-5">
          <span style={boxLabelText}>Max PIN Codes ::</span>
        </div>

        <div className="col-4 p-1 text-center" style={boxStyle}>
          <span style={boxText}>10</span>
        </div>
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>Min User License::</span>
        </div>

        <div className="col-4 p-1 text-center" style={boxStyle}>
          <span style={boxText}>20</span>
        </div>
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={boxLabelText}>Status:</span>
        </div>

        <div className="col-4 p-1 text-center" style={{}}>
          <span style={box2Text}>Active</span>
        </div>
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-5">
          <span style={downloadText}>Download QR</span>
        </div>

        <div className="col-4 p-1 text-center" style={{}}>
          <span style={box2Text}><img src={QrIcon} alt="" /></span>
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
            <span style={ManagmentTextStyle}>Gabriela</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Last Name:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>Acosta</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Address :</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>7001 w 35th ave</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Email:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>test@gmail.com</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>Phone Number:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>305-111-2222</span>
          </div>
        </div>

        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <span style={ManagmentTextStyle}>User Licenses:</span>
          </div>

          <div className="col-4 p-1 " style={{}}>
            <span style={ManagmentTextStyle}>47</span>
          </div>
        </div>
      </div>
    </div>
  );
}

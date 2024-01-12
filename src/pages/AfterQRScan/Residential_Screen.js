import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../../assests/header_logo.png";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
import OKIcon from "../../assests/ok.png";
import callIcon from "../../assests/call.png";
import OrIcon from "../../assests/or.svg";

const InputDivStyle = {
  borderRadius: "20px 0 0 20px",
  // width: "226px",
  height: "39px",
  border: "none",
  backgroundColor: "#EBEBEB",
  paddingLeft: "10%",
  marginRight: "-15px",
  marginLeft: "-25px",
};

function Residential_Screen({ AdminData, propId ,brightness,pcbId }) {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");

  const handleCall = async (userId) => {
    if (propId === "" || userId === "") {
      alert("cannot make call");
      return;
    }
    try {
      const response = await axios.post(
        `https://192.168.18.147:8000/commercialAdmin/sendCallForResidents`,
        { propId }
      );

      // Handle the response if needed
      console.log(response.data);
      navigate(`/videoCall/${pcbId}`);
    } catch (error) {
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      } else {
        console.error("Error making POST request:", error);
        alert(error.response.data.error);
      }
      console.error("Error in handleCall:", error);
      // Handle the error if needed
    }
  };

  const handleOkIconClick = async () => {
    if (pin === "") {
      alert("Enter PinCode");
      return;
    }
    try {
      // Make a POST request with the PIN to /commercialAdmin/accessDoorWithPin
      const response = await axios.post(
        `https://192.168.18.147:8000/commercialAdmin/OpenDoorWithPinResidential/${propId}`,
        {
          pin: pin,
        }
      );

      // Handle the response if needed
      console.log(response.data);
      if (response.data.sensorCheck) {
        alert("sensorCheck true");
      }
    } catch (error) {
      // Handle errors
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      } else {
        console.error("Error making POST request:", error);
        alert(error.response.data.error);
      }
    }
  };

  const defaultBackgroundStyle = {
    // width: "fit-content",
    // borderRadius: "40px",
    background: "#2A3649",
    contain:"content"
  };
  console.log(AdminData.image);
  const dynamicBackgroundStyle =
    AdminData?.wallpaper || AdminData.image
      ? {
          ...defaultBackgroundStyle,
          backgroundImage: `url(${AdminData.wallpaper || AdminData.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : defaultBackgroundStyle;

      console.log(brightness)

  return (
    
    <div  style={dynamicBackgroundStyle}>
      <div
        className="d-grid justify-content-center pt-5"
        style={{
          backgroundColor: `rgba(42, 54, 73, ${brightness === 50 ? 0: brightness})`,
        }}
      >

      <div>
        <img src={LogoIcon} alt="" />
      </div>
      <div className="mt-2" style={{ color: "white" }}>
        <h5> Welcome to</h5>{" "}
        <h1>
          {AdminData.WelcomMessage ? AdminData.WelcomMessage : "Blue Lake"}
        </h1>
      </div>

      <div className="mt-3 mb-3" onClick={handleCall}>
        <img src={callIcon} alt="" />
      </div>
      <div className="mt-3 mb-3">
        <img src={OrIcon} alt="" />
      </div>

      <div
        className="mt-3 mb-3"
        style={{ color: "white", fontSize: "13px", fontFamily: "Inter" }}
      >
        <span style={{ fontWeight: "700" }}>Enter the PIN </span>
        <span style={{ fontWeight: "400" }}>
          if you know it and press{" "}
        </span>{" "}
        <span style={{ fontWeight: "700" }}> OK</span>{" "}
        <span style={{ fontWeight: "400" }}> to open the Gate. </span>
      </div>
      <div className=" mb-3">
        <img style={{ position: "relative" }} src={NumPadSmallIcon} alt="" />
        <input
          type="text"
          style={InputDivStyle}
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <img src={OKIcon} alt="" onClick={handleOkIconClick} />
      </div>
      </div>
    </div>
  );
}

export default Residential_Screen;

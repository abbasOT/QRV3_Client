import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LogoIcon from "../../assests/header_logo.png";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
// import OKIcon from "../../assests/ok.png";
import OKIcon from "../../assests/ok.svg";
import callIcon from "../../assests/call.png";
import OrIcon from "../../assests/or.svg";
import greenOk from "../../assests/visitorScreen/greenOK.svg"
import redOk from "../../assests/visitorScreen/redOK.svg"
import yellowOk from "../../assests/visitorScreen/yellowOK.svg"

import { getDatabase, ref, onValue, get, push } from "firebase/database";


const InputDivStyle = {
  borderRadius: "20px 0 0 20px",
  // width: "226px",
  height: "39px",
  border: "none",
  backgroundColor: "#EBEBEB",
  paddingLeft: "10%",
  marginRight: "-15px",
  marginLeft: "-25px",
  paddingLeft: "35px"
};

function Residential_Screen({ AdminData, propId, brightness, pcbData, pcbId, residentialPropertyId }) {

  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [okIconColor, setOkIconColor] = useState("0")

  console.log(pcbData, "the data i want for the pcb ")

  console.log(pcbData, residentialPropertyId, pcbId, "the pcb data that you are looking for ....")

  const handleCall = async () => {
    if (residentialPropertyId === "") {
      alert("Cannot make call");
      return;
    }

    const randomString = generateRandomAlphanumeric(7);

    try {
      // First create the token
      const tokenResponse = await createToken(randomString);
      console.log(tokenResponse.data.token);

      // Then make the POST request
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/sendCallForResidents`,
        { randomString, residentialPropertyId, pcbId }
      );
      console.log("commercialAdmin/sendCallForResidents: ", response);

      navigate(`/videoCall/${pcbId}/${randomString}`);
    } catch (error) {
      console.error("Error making POST request:", error);
      if (error.response?.data?.sensorCheck === false) {
        alert("Sensor error occurred.");
        navigate("/sensor_error");
      } else if (error.message.includes("Network Error")) {
        alert("Network error: Please check your internet connection or server status.");
      } else {
        alert("An error occurred.");
      }
    }
  };

  const createToken = async (randomString) => {
    try {
      const tokenResponse = await axios.post(
        "https://ot-technologies.com/commercialAdmin/createToken",
        { randomString }
      );
      return tokenResponse;
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  };


  const pcbID = pcbId
  const handleOkIconClick = async () => {
    if (pin === "") {
      alert("Enter PinCode");
      return;
    }
    console.log(pin, residentialPropertyId, pcbId,)
    try {
      // Make a POST request with the PIN to /commercialAdmin/accessDoorWithPin
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/OpenDoorWithPinResidential/${pcbID}`,
        {
          pin: pin, propertyId: residentialPropertyId, pcbId: pcbId
        }
      );

      // Handle the response if needed
      console.log(response.data, "the data comming from api");
      if (response.data.sensorCheck) {
        console.log(response.data.userId, "the user id of the user who accessed the door pin")
        const userId = response.data.userId
        const pinName = response.data.pinName
        handleNotificationMsg(userId, pinName)
        alert("Pin accessed successfully");
        setOkIconColor("1");

        // Set a timeout to revert the icon color back to "0" after 3 seconds
        setTimeout(() => {
          setOkIconColor("0");
        }, 3000);
      }
    } catch (error) {
      // Handle errors
      if (error.response.data.sensorCheck === false) {
        alert("You are not infront of the Intercom");
        navigate("/sensor_error");
      } else {
        console.error("Error making POST request:", error);
        alert("wrong pin");
        setOkIconColor("-1");

        // Set a timeout to revert the icon color back to "0" after 3 seconds
        setTimeout(() => {
          setOkIconColor("0");
        }, 3000);
      }
    }
  };





  const handleNotificationMsg = async (userId, pinName) => {
    if (!userId) {
      return;
    }
    try {
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/sendDoorPinNotifications/${userId}`,
        { pcbId, pinName }
      );
      console.log("the accessed door pin notification msg api response: ", response);
    } catch (error) {
      console.error("Error making POST request:", error);
    };
  }


  const defaultBackgroundStyle = {
    // width: "fit-content",
    // borderRadius: "40px",
    background: "#2A3649",
    // height: "100vh",
    width: "100%",
    height: "100vh",
  };
  console.log(pcbData?.image);
  const dynamicBackgroundStyle =
    pcbData?.wallpaper || pcbData?.image
      ? {
        backgroundImage: `url(${pcbData?.wallpaper || pcbData?.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }
      : defaultBackgroundStyle;

  // const dynamicBackgroundStyle = {
  //   ...defaultBackgroundStyle,
  //   ...(pcbData?.wallpaper && {
  //     backgroundImage: `url(${pcbData?.wallpaper})`,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",
  //   }),
  // };
  console.log(brightness)

  function generateRandomAlphanumeric(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  }

  const getBackgroundStyle = (okIconColor) => ({
    background: okIconColor === "1"
      ? "linear-gradient(90deg, #FFFFFF 0%, #19A752 97.57%)" // Green gradient
      : okIconColor === "-1"
        ? "linear-gradient(90deg, #FFFFFF 0%, #A31F3F 100%)" // Red gradient
        : "#EBEBEB" // Default background
  });

  return (

    <div style={dynamicBackgroundStyle}>
      <div
        className="d-grid justify-content-center pt-5"
        style={{
          // backgroundColor: `rgba(42, 54, 73, ${pcbData?.brightness === 50 ? 0 : pcbData?.brightness})`,
          // height: "100vh",
        }}
      >

        <div>
          <img src={LogoIcon} alt="" />
        </div>
        <div className="pt-2" style={{ color: "white" }}>
          <h5> Welcome to</h5>{" "}
          <h1>
            {pcbData?.WelcomeMessage ? pcbData?.WelcomeMessage
              : pcbData?.heading ? pcbData?.heading : "Blue Lake"}
          </h1>
        </div>

        <div className="pt-4" onClick={handleCall}>
          <img src={callIcon} width={"280px"} alt="" />
        </div>
        <div className="pt-4">
          <img src={OrIcon} style={{ minWidth: 295, maxWidth: 350, width: "100%" }} alt="" />
        </div>

        <div className="pt-3"

          style={{ color: "white", fontSize: "13px", fontFamily: "Inter" }}
        >
          <span style={{ fontWeight: "700" }}>Enter the PIN </span>
          <span style={{ fontWeight: "400" }}>
            if you know it and press{" "}
          </span>{" "}
          <span style={{ fontWeight: "700" }}> OK</span>{" "}
          <span style={{ fontWeight: "400" }}> to open the Gate. </span>
        </div>
        <div className="pt-4 pb-3">
          <img style={{ position: "relative", width: "11px", height: "15px", marginLeft: "10px" }} src={NumPadSmallIcon} alt="" />
          <input
            type="text"
            style={{
              ...InputDivStyle,
              ...getBackgroundStyle(okIconColor)
            }}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
          />
          <img
            src={
              okIconColor === "1"
                ? greenOk
                : okIconColor === "-1"
                  ? redOk
                  : yellowOk // Default to yellow when okIconColor is "0"
            }
            width={70}
            alt="" onClick={handleOkIconClick} />
        </div>
      </div>
    </div>
  );
}

export default Residential_Screen;

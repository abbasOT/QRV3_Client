import React, { useState } from "react";
import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import { Box, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import axios from "axios";

const inputStyle = {
  fontFamily: "Poppins",
  color: "#2A3649",
  fontWeight: 400,
  fontSize: "14px",
}
const inputFieldStyle = {
  ...inputStyle,
  border: "none",
  background: "none",
  color: "#FFFFFF",
  width: "300px",
  color: "black",
  outline: "none",
  textAlign: "center",
};

const textStyle = {
  fontFamily: 'var(--font-family-secondary)',
  color: 'var(--primary-color)',
  fontStyle: "italic",
  paddingTop: "2.5rem",
}


function GetProperty() {
  const navigate = useNavigate();
  const [PropertyId, setPropertyId] = useState();

  let com_prop_id = localStorage.getItem("userKey");



  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };



  const handleSubmit = async () => {
    try {
      // Save PropertyId to localStorage
      localStorage.setItem("PropertyId", PropertyId);


      // Make a POST request to the server
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/find_property/${com_prop_id}`,
        {
          PropertyId,
        }
      );

      // Handle the response or perform additional actions
      console.log(response.data);
      alert(response.data.message);
      handleNavigate();
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error making POST request:", error);
      // Handle the error if needed
    }
  };
  const handleNavigate = () => {
    // navigate(`/property_residents/${PropertyId}`);

    localStorage.setItem("commercialPropId", PropertyId);
    navigate(`/commercial-admin`);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row d-grid justify-content-center ">
        <div className="col-12">
          <img src={DoorMan_Img} alt="" />
        </div>
        <div className="col-12 mt-2 mb-5">
          <div className="text-center">
            <p style={textStyle}>elevating your entry experience...</p>
          </div>
        </div>
        <div className="col-12 mt-5">
          <input
            type="text"
            id="input-getProperty"
            placeholder="Enter Property ID"
            style={inputFieldStyle}
            autoComplete="off"
            value={PropertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
        </div>
        <div className="col-12 mt-3">
          <Button sx={{
            minWidth: 170, borderRadius: "2.2rem", padding: "0.2rem 1rem", '&:hover': {
              background: "#F08F00",
              '& .MuiSvgIcon-root': {
                color: '#FFF', // Change the icon color to white on hover
              },
            }
          }} onClick={handleSubmit}>
            <ArrowForwardIcon sx={{ width: 24, height: 26, color: 'var(--primary-color)' }} />
          </Button>
        </div>

      </div>
    </div>
  );
}

export default GetProperty;

import React, { useState } from "react";
import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import axios from "axios";

const inputFieldStyle = {
  border: "none",
  background: "none",
  color: "#FFFFFF",
  fontSize: "16px",
  width: "300px",
  marginLeft: "30px",
  color: "black",
  outline: "none",
  textAlign: "center",
};

function GetProperty() {
  const navigate = useNavigate();
  const [PropertyId, setPropertyId] = useState();

  let com_prop_id = localStorage.getItem("userKey");

  const handleEnterKeyPress = async (e) => {
    console.log("pressed");
    if (e.key === "Enter") {
      try {
        // Assuming PropertyId is a state variable
        console.log(PropertyId);

        // Save PropertyId to localStorage
        localStorage.setItem("PropertyId", PropertyId);

        // Make a POST request to the server
        const response = await axios.post(
          `https://localhost:8000/commercialAdmin/find_property/${com_prop_id}`,
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
    }
  };

  const handleNavigate = () => {
    navigate(`/property_residents/${PropertyId}`);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row d-grid justify-content-center ">
        <div className="col-12">
          <img src={DoorMan_Img} alt="" />
        </div>
        <div className="col-12 mt-3 mb-5">
          <div className="text-center">
            Effortless Security Access at Your <br /> Fingertips
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
      </div>
    </div>
  );
}

export default GetProperty;

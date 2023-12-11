import React, { useState } from "react";
import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
const btnStyle = {
  width: "290px",
  height: "45px",
  borderRadius: "10px",
  border: "#566D90 solid 2px",
  backgroundColor: "white",
  color: "#2A3649",
};
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

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(PropertyId);
      handleLoginNavigate();
    }
  };

  const handleLoginNavigate = () => {
    // Add your navigation logic here
    navigate("/property_residents");
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

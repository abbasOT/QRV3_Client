import React, { useState, useEffect } from "react";
import LogoIcon from "../../assests/header_logo.png";
import OrIcon from "../../assests/or.svg";
import OppsIcon from "../../assests/opps_icon.svg";
import SensorIcon from "../../assests/sensor_icon.png";
import sensoPhIcon from "../../assests/sensor_ph_icon.png";


function SensorError() {


  useEffect(()=>{
    document.body.style.minWidth = "350px";
  })
  const defaultBackgroundStyle = {
    // width: "430px",
    background: "#2A3649",
  };

  const TextStyle = {
    color: "#fff",
    fontSize: "19px",
    fontWeight: "400",
    fontFamily: "Poppins",
  };

  return (
    <div
      className="d-grid justify-content-center pt-5"
      style={defaultBackgroundStyle}
    >
      <div>
        <img src={LogoIcon} alt="" />
      </div>
      <div className="d-flex justify-content-center mt-5 mb-3">
        <img src={OppsIcon} alt="" />
        <h1 style={{ color: "#fff" }}>Oops!!!</h1>
      </div>

      <div
        className="d-flex justify-content-center mt-0 mb-5 m-4 p-2"
        style={{ backgroundColor: "#c24e42", borderRadius: "5px" }}
      >
        <h6 style={TextStyle}>
          It seems that you are not in front of the Intercom, please Re-Scan the
          QR again and make sure you are in front of it when scanning. Thank you
        </h6>
      </div>

      <div className=" mb-3">
        <img src={SensorIcon} alt="" />
      
        
      </div>
      <div className="mt mb-5">
      <img src={sensoPhIcon} alt="" />
      </div>
   
    </div>
  );
}

export default SensorError;

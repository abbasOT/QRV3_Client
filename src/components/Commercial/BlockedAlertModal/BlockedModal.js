
import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import AlertIcon from '../../../assests/block.png'


const greenbtn = {
  backgroundColor: "#19a65b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const btn = {
  backgroundColor: "",
  color: "",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const textStyle = { padding:"20px 20px 0px 20px",color:"#C24E42"}

export default function BlockedModal({}) {
  const [isListed, setIsListed] = useState(false);

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row">
        <div className="text-center pt-2">
        <img src={AlertIcon} alt="" />
        </div>
        
        <span className="text-center" style={textStyle}>Your account has been blocked, please <br/> <span style={{fontWeight:"700"}}>contact QR Doorman Support.</span> </span>
      </div>
      <div className="row d-flex justify-content-evenly mt-5">

      
      </div>

    
    </div>
  );
}

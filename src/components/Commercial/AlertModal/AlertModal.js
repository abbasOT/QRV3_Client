import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import AlertIcon from '../../../assests/alert_icon.svg'


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

export default function AlertModal({message,handleClick,label}) {
  const [isListed, setIsListed] = useState(false);

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row">
        <div>
        <img src={AlertIcon} alt="" />
        </div>
        
        <span className="text-center">{message}</span>
      </div>
      <div className="row d-flex justify-content-evenly mt-5">

        <div className="col-2">
          <button style={btn} onClick={()=> handleClick("yes",label)}>Yes </button>
        </div>
        <div className="col-2">
          <button style={greenbtn} onClick={()=> handleClick("no",label)}>ON </button>
        </div>
      </div>

    
    </div>
  );
}

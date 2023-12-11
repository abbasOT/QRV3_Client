import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import  CustomDatePicker from "../../CustomHook/DatePicker/DatePicker";
import DateToModal from '../../../components/Commercial/DateToModal/DateToModal'
import { Dropdown, Modal, Button } from "react-bootstrap";


const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",
};


const iconStyle = {
  marginLeft: "20px",
};

export default function FromDateModal({}) {
    const [showToModal, setShowToModal] = useState(false);
  const [isListed, setIsListed] = useState(false);


  const handleOpenModal = () => {
    setShowToModal(true);
    console.log(showToModal);
    
  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="d-grid justify-content-center text-center">

        <CustomDatePicker/>

        <div>
        <button
          style={btnStyle}
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleOpenModal}
        >
        Export PDF
        </button>
        </div>
       
      </div>



    </div>
  );
}

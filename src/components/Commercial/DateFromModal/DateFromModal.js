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

export default function FromDateModal({setShowFromModal , setShowToModal ,showToModal,setFromDate}) {
    
  const [isListed, setIsListed] = useState(false);


  const handleOpenModal = () => {
    
    setShowToModal(true);
    setShowFromModal(false)
    console.log(showToModal);
    
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);

  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="d-grid justify-content-center text-center">

      <CustomDatePicker handleDateChange={handleFromDateChange} />
        <div>
        <button
          style={btnStyle}
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleOpenModal}
        >
        To
        </button>
        </div>
       
      </div>

     

    </div>
  );
}

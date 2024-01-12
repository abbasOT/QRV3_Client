import React, { useState } from "react";
import axios from "axios";
import PinCodeModal from "../../../components/Commercial/PinCodeModal/PinCodeModal";
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeIcon from "../../../assests/pin_code_modal_icon.svg";

const CardStyle = {
  width: "340px",
  height: "50px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  cursor: "pointer",
};

const NameStyle = {
  fontFamily: "Poppins",
  fontWeight: "500",
  color: "#566D90",
};

function PinCodeCard({ dataArray, icon ,setPins}) {
  const [showPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();
  const [PinDetails, setPinDetails] = useState({
    PinCode: '',
    PinCodeName: '',
  });

  const handleOpenModal = (item) => {
    setPinCodeModal(true);
    console.log(showPinCodeModal);
    setPinDetails(item);
  };



  let com_prop_id = localStorage.getItem("userKey");
  
  const DeletePin = async (pinId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`${process.env.REACT_APP_URL1}/commercialAdmin/delete_pins/${com_prop_id}/${pinId}`);
  
      // Update the state or perform other actions after a successful delete
      setPins(response.data.remainingPins || []);
      setPinCodeModal(false)
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const UpdatePin = async (pinId) => {
  
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.put(`${process.env.REACT_APP_URL1}/commercialAdmin/update_pins/${com_prop_id}/${pinId}`,{
        PinDetails
      });
  
      // Update the state or perform other actions after a successful delete
      console.log(response.data)
      setPins(response.data.updatedPins || []);
      setPinCodeModal(false)
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };



  return (
    <>
        {dataArray &&  Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((PinId) => (
        <div
          style={CardStyle}
          key={dataArray[PinId].id}
          className="col-md-4 mb-4 d-flex align-items-center justify-content-center"
          onClick={() => handleOpenModal(dataArray[PinId])}
        >
          <img src={icon} style={{ marginRight: "20px" }} alt="" />
          <span style={NameStyle} className="card-title">
            {dataArray[PinId].PinCodeName}
          </span>
        </div>
     ))
     ) : (
       <p>No residents available</p>
     )}

      <Modal
        
        centered
        className="abc"
        show={showPinCodeModal}
        style={{ width: "", height: "",marginLeft:"",marginRight:"auto" }}
        onHide={() => setPinCodeModal(false)}
      >
        <Modal.Title
          className="w-100 text-center pt-2"
          style={{
            alignItems: "center",
            height: "62px",
            backgroundColor: "#2A3649",
            color: "white",
          }}
        >
          <img style={{ marginRight: "30px" }} src={PinCodeIcon} alt="" />
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Open Sans",
              fontSize: "20px",
            }}
          ></span>
          {PinDetails.PinCodeName}
        </Modal.Title>
        <Modal.Body>
          <PinCodeModal DeletePin={DeletePin} UpdatePin={UpdatePin} PinDetails={PinDetails} setPinDetails={setPinDetails} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PinCodeCard;

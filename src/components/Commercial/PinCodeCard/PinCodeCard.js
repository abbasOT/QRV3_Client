import React, { useState } from "react";
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

function PinCodeCard({ dataArray, icon }) {
  const [showPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();

  const handleOpenModal = (item) => {
    setPinCodeModal(true);
    console.log(showPinCodeModal);
    setUserName(item.name);
  };

  return (
    <>
      {dataArray.map((item) => (
        <div
          style={CardStyle}
          key={item.id}
          className="col-md-4 mb-4 d-flex align-items-center justify-content-center"
          onClick={() => handleOpenModal(item)}
        >
          <img src={icon} style={{ marginRight: "20px" }} alt="" />
          <span style={NameStyle} className="card-title">
            {item.name}
          </span>
        </div>
      ))}

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
          {username}
        </Modal.Title>
        <Modal.Body>
          <PinCodeModal />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PinCodeCard;

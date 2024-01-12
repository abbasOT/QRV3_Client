import axios from "axios";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person.png";
import NumPadIcon from "../../../assests/numpad.png";
import EditIcon from "../../../assests/edit_modal_icon.svg";
import DeleteIcon from "../../../assests/delete_icon.svg";
import AlertModal from "../AlertModal/AlertModal";
import { Dropdown, Modal, Button } from "react-bootstrap";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  fontSize: "16px",
  width: "300px",
 
  outline: "none",

};

const PinNameStyle ={
  ...inputFieldStyle,
  marginLeft: "30px",
}

const ABStyle ={
  color:"#19A752",
  fontWeight:"700",
  marginLeft: "30px",
  fontSize: "16px",
  marginTop:"6px"
}
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

export default function PinCodeModal({
  DeletePin,
  UpdatePin,
  PinDetails,
  setPinDetails,
}) {
  const [showDeleteAlterModal, setDeleteAlertModal] = useState(false);
const [pinId,setPinId] =useState()
  const [isListed, setIsListed] = useState(false);

  const handleOpenModal = (id) => {
    setDeleteAlertModal(true);
    setPinId(id)
  };

  const handleClick = (value, label) => {
    setDeleteAlertModal(false);

    if (label == "delete") {
      if (value === "yes") {
        alert("deleted");
        DeletePin(pinId);
        return;
      }
    }
  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row align-items-center">
        <div className="col-12">
          <Card className=" " style={{ borderStyle: "none" }}>
            <Card.Body className="p-0">
              <div className="mb-" style={{ padding: "5% 8%" }}>
                <div className="mb-3">
                  <Form>
                    {/* 1 */}
                    <div className="d-flex mt-">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="input-field"
                        placeholder="First Name"
                        style={PinNameStyle}
                        autoComplete="off"
                        value={PinDetails.PinCodeName}
                        onChange={(e) =>
                          setPinDetails({
                            ...PinDetails,
                            PinCodeName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={NumPadIcon} alt="User Icon" style={iconStyle} />
                      <span  style={ABStyle}>AB</span> 
                      <input
                        type="text"
                        id="input-field"
                        placeholder="Pin Code"
                        style={inputFieldStyle}
                        autoComplete="off"
                       
                        value={PinDetails.PinCode ? PinDetails.PinCode.substring(2) : ''}
                        onChange={(e) =>
                          setPinDetails({
                            ...PinDetails,
                            PinCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}

                    <div className="d-grid justify-content-center">
                      <button
                        style={btnStyle}
                        type="button"
                        className="btn btn-primary shadow-sm mt-3 mb-3"
                        onClick={() => UpdatePin(PinDetails.pinId)}
                      >
                        <img src={EditIcon} alt="" /> Edit
                      </button>

                      <button
                        style={btnStyle}
                        type="button"
                        className="btn btn-primary shadow-sm"
                        onClick={() => handleOpenModal(PinDetails.pinId)}
                      >
                        <img src={DeleteIcon} alt="" /> Delete
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal
        size=""
        centered
        className="abc"
        show={showDeleteAlterModal}
        style={{ width: "", height: "", border: " #E3982A solid 3px" }}
        onHide={() => setDeleteAlertModal(false)}
      >
        <Modal.Body>
          <AlertModal
            message={"Are you sure you want to delete it?"}
            label={"delete"}
            handleClick={handleClick}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

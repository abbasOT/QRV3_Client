import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import EmailIcon from "../../../assests/email_blue_icon.svg";
import { Button, Card, Form, Modal, } from "react-bootstrap";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import ReactivationIcon from '../../../assests/reactivation_icon.svg'
import DeleteIcon from '../../../assests/delete_icon.svg'
import AlertModal from "../AlertModal/AlertModal";


const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputTextStyle = {
  fontFamily: "Poppins",
  color: "#2A3649",
  fontWeight: "500",
  fontSize: "13px",
  color: "#566D90"
}

const inputFieldStyle = {
  ...inputTextStyle,
  border: "none",
  background: "none",
  fontSize: "16px",
  width: "300px",
  marginLeft: "30px",
  outline: "none",
};
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",

};
const redbtnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#2A3649 solid 1px",
  backgroundColor: "#19A752",
  color: "",
  fontWeight: "600",
  border: "none"
};

const iconStyle = {
  marginLeft: "20px",
};

export default function SuspendedUserModal({ Resident, setResidents }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuspendedAlertModal, setSuspendedAlertModal] = useState(false);
  const [userId, setUserId] = useState()
  const [showSuspendedModal, setSuspendedModal] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [showDeleteAlterModal, setDeleteAlertModal] = useState(false);
  const [showReactivateModal, setReactivateModal] = useState(false);
  const navigate = useNavigate();


  const handleSuspendResidend = (userId) => {


    setUserId(userId)
    setReactivateModal(true);
    // console.log(showSuspendedAlertModal);

  };

  const handleDeleteResident = (userId) => {
    console.log(userId)
    setUserId(userId)
    setDeleteAlertModal(true);
    console.log(showDeleteAlterModal);

  };

  const handleClick = (value, label) => {
    setDeleteAlertModal(false);
    setReactivateModal(false);
    if (label == "delete") {
      if (value === "yes") {
        alert("deleted")
        DeleteUser();
        return
      }
    } else if (label == "reactivate") {
      if (value === "yes") {
        alert("active again")
        Reactivate();
        return
      }
    }
    if (value === "yes") {
      handleOpenModal()
    } else {

    }

    console.log(value)
  }

  const handleOpenModal = () => {
    setSuspendedModal(true);
    console.log(showSuspendedModal);

  };

  let com_prop_id = localStorage.getItem("userKey");

  const DeleteUser = async () => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/commercialAdmin/delete_resident/${com_prop_id}/${userId}`);

      // Update the state or perform other actions after a successful delete
      setResidents(response.data.residents || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  };

  const Reactivate = async () => {
    const status = "active"
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.put(`https://ot-technologies.com/commercialAdmin/suspend_resident/${status}/${com_prop_id}/${userId}`);

      // Update the state or perform other actions after a successful delete
      console.log(response.data)
      setResidents(response.data.residents || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row align-items-center">
        <div className="col-6">
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
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={Resident.firstName} // Bind email state to the input value
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="input-field"
                        placeholder="Last Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={Resident.lastName} // Bind email state to the input value
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}
                    <div className="d-flex mt-3 ">
                      <img
                        src={Address_Icon}
                        alt="User Icon"
                        style={iconStyle}
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        id="input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={Resident.address} // Bind email state to the input value
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 3 */}

                    <div className="d-flex mt-3 ">
                      <img src={Phone_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        id="input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={Resident.number} // Bind email state to the input value
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 5 */}
                    <div className="d-flex mt-3 ">
                      <img src={EmailIcon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        placeholder="Email"
                        id="input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={Resident.email} // Bind email state to the input value
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <button
            style={redbtnStyle}
            type="button"
            className="btn btn-primary shadow-sm"
            onClick={() => handleSuspendResidend(Resident.userId)}

          >
            <img src={ReactivationIcon} style={{ marginRight: "15px" }} alt="" />   Reactive Resident
          </button>
          <button
            style={btnStyle}
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => handleDeleteResident(Resident.userId)}

          >
            <img src={DeleteIcon} style={{ marginRight: "15px" }} alt="" />   Delete Resident
          </button>
        </div>
      </div>


      <Modal
        size=""
        centered
        className="abc"
        show={showReactivateModal}
        style={{ width: "", height: "", border: " #E3982A solid 3px" }}
        onHide={() => setReactivateModal(false)}
      >

        <Modal.Body >
          <AlertModal message={"Are you sure you want to Reactivate it?"} label={"reactivate"} handleClick={handleClick} />
        </Modal.Body>
      </Modal>

      <Modal
        size=""
        centered
        className="abc"
        show={showDeleteAlterModal}
        style={{ width: "", height: "", border: " #E3982A solid 3px" }}
        onHide={() => setDeleteAlertModal(false)}
      >

        <Modal.Body >
          <AlertModal message={"Are you sure you want to delete it?"} label={"delete"} handleClick={handleClick} />
        </Modal.Body>
      </Modal>


    </div>
  );
}

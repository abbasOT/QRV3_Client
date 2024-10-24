import Header from "../../../components/superAdmin/Header/Header";
import EditUserIcon from "../../../assests/edit_user_icon.svg";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";
import { Modal } from "react-bootstrap";
import ChangePasswordModal from "../../../components/superAdmin/ChangePassModal/ChangePassModal";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../components/Commercial/AlertModal/AlertModal";
import React, { useState } from "react";
import axios from "axios";


function Profile() {
  const navigate = useNavigate();

  const [showChangePassModal, setChangePassModal] = useState(false);
  const [showAlertModal, setshowAlertModal] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [lastName, setLastName] = useState(localStorage.getItem("lname") || "");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("number") || ""
  );

  const handleOpenModal = () => {
    setChangePassModal(true);
    console.log(showChangePassModal);
  };

  const email = localStorage.getItem("superEmail");



  const handleAlertModal = () => {
    setshowAlertModal(true);
  };

  const handleClick = (value, label) => {
    setshowAlertModal(false);

    if (label == "delete") {
      if (value === "yes") {
        // alert("deleted");
        // DeleteUser();
        return;
      }
    }
    if (value === "yes") {
    }
  };



  return (
    <div>
      <Header />
      <div className="container">
        <div className="row d-grid justify-content-center mt-5">
          <div className="col-6 mt-5 mb-5">
            <div className="d-flex align-items-center">
              <img src={EditUserIcon} alt="" />
              <div className="d-grid" style={{ marginLeft: "30px" }}>
                <span className="text-start" style={normalText}>{email}</span>
              </div>
            </div>
          </div>

          <div className="col-6"></div>


          <div
            className="mt-5"
            style={{ color: "#566D90", cursor: "pointer", fontWeight: "600" }}
            onClick={handleOpenModal}
          >
            Change password
          </div>
          {/* <div
            className=" mt-2"
            style={{ color: "#C24E42", cursor: "pointer", fontWeight: "600" }}
            onClick={handleAlertModal}
          >
            Delete Account
          </div> */}
        </div>
      </div>

      <Modal
        centered
        className="abc"
        show={showChangePassModal}
        onHide={() => setChangePassModal(false)}
      >
        <Modal.Body>
          <ChangePasswordModal setChangePassModal={setChangePassModal} />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        className="abc"
        show={showAlertModal}
        onHide={() => setshowAlertModal(false)}
      >
        <Modal.Body>
          <AlertModal
            message={"Are you sure you want to delete ?"}
            label={"delete"}
            handleClick={handleClick}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;


const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  color: "#566D90",
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
};

const headingStyle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#566D90",
  fontFamily: "Poppins",
  textAlign: "left",
  whiteSpace: "nowrap",
};
const normalText = {
  fontSize: "15px",
  fontWeight: "400",
  color: "#566D90",
  fontFamily: "Poppins",
};
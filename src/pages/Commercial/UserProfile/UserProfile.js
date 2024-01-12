import Header from "../../../components/Commercial/Header/Header";
import EditUserIcon from "../../../assests/edit_user_icon.svg";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";
import { Modal } from "react-bootstrap";
import ChangePasswordModal from "../../../components/Commercial/ChangePasswordModal/ChangePass";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../components/Commercial/AlertModal/AlertModal";
import React, { useState } from "react";
import axios from "axios";

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
function UserProfile() {
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

  const email = localStorage.getItem("email");
  localStorage.getItem("name");
  localStorage.getItem("address");
  localStorage.getItem("lname");
  localStorage.getItem("number");
  localStorage.getItem("userKey");

  let com_user_id = localStorage.getItem("userKey");
  const handleUpdate = () => {
    // Check if required fields are not null
    if (!name || !lastName || !address || !phoneNumber) {
      // Handle the case where any required field is null
      console.error("Please fill out all required fields");
      return;
    }

    // Make PUT request using Axios
    axios
      .put(
        `https://localhost:8000/commercialAdmin/update_profile/${com_user_id}`,
        {
          name,
          lastName,
          address,
          phoneNumber,
        }
      )
      .then((response) => {
        // Handle success, if needed
        const user = response.data.user;
        console.log(response.data.user);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("address", user.address);
        localStorage.setItem("lname", user.lastName);
        localStorage.setItem("number", user.phoneNumber);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Error updating profile:", error);
      });
  };

  const handleAlertModal = () => {
    setshowAlertModal(true);
  };

  const handleClick = (value, label) => {
    setshowAlertModal(false);

    if (label == "delete") {
      if (value === "yes") {
        alert("deleted");
        DeleteUser();
        return;
      }
    }
    if (value === "yes") {
    }
  };

  const DeleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:8000/commercialAdmin/deleteUser/${com_user_id}`
      );
      console.log(response.data); // Handle the response as needed
      localStorage.clear();
      navigate("/login");
      // Perform any additional actions after deletion (e.g., redirect, show a success message)
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle the error (e.g., show an error message)
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
                <span style={headingStyle}>{name + " " + lastName}</span>
                <span style={normalText}>{email}</span>
              </div>
            </div>
          </div>

          <div className="col-6"></div>

          <form>
            {/* 1 */}
            <div className="d-flex">
              <img
                src={Name_Icon}
                alt="User Icon"
                style={{ color: "#566D90" }}
              />
              <input
                type="text"
                id="input-field"
                placeholder="Name"
                style={inputFieldStyle}
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>
            {/* 2 */}
            <div className="d-flex mt-3 ">
              <img
                src={Name_Icon}
                alt="User Icon"
                style={{ color: "#566D90" }}
              />
              <input
                type="text"
                placeholder="Last Name"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>
            {/* 3 */}

            <div className="d-flex mt-3 ">
              <img
                src={Address_Icon}
                alt="User Icon"
                style={{ color: "#566D90" }}
              />
              <input
                type="text"
                placeholder="Address"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>
            <div className="d-flex mt-3 ">
              <img
                src={Phone_Icon}
                alt="User Icon"
                style={{ color: "#566D90" }}
              />
              <input
                type="text"
                placeholder="Phone Number"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>

            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary mt-5 shadow"
              onClick={handleUpdate}
            >
              Done
            </button>

            <div
              className="mt-5"
              style={{ color: "#566D90", cursor: "pointer", fontWeight: "600" }}
              onClick={handleOpenModal}
            >
              Change password
            </div>
            <div
              className=" mt-2"
              style={{ color: "#C24E42", cursor: "pointer", fontWeight: "600" }}
              onClick={handleAlertModal}
            >
              Delete Account
            </div>
          </form>
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

export default UserProfile;

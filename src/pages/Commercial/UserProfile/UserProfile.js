import Header from "../../../components/Commercial/Header/Header";
import EditUserIcon from "../../../assests/edit_user_icon.svg";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";
import Email_Icon from "../../../assests/email_blue_icon.svg";
import { Modal } from "react-bootstrap";
import { Typography } from "@mui/material";
import ChangePasswordModal from "../../../components/Commercial/ChangePasswordModal/ChangePass";
import HouseBuilding from "../../../assests/superAdmin/house_building.svg"

import "../../../App.css";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../components/Commercial/AlertModal/AlertModal";
import React, { useState } from "react";
import axios from "axios";
import DeleteDialogue from "../../../components/superAdmin/DeleteDialogue/DeleteDialogue";

const hrStyle = {
  // border: 'none',
  width: "100%",
  opacity: "80%",
  margin: "0.7rem 0rem 0.7rem 0rem",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  color: "#566D90",
  fontSize: "14px",
  width: "300px",
  marginLeft: "30px",
  outline: "none",
};
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
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
  const [propertyName, setPropertyName] = useState(localStorage.getItem("commercialPropName") || "");
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("number") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setChangePassModal(true);
    console.log(showChangePassModal);
  };

  // Email validation function using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Validate email format
    if (!isValidEmail(inputEmail)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const propertyId = localStorage.getItem("commercialPropId");

  localStorage.getItem("name");
  localStorage.getItem("address");
  localStorage.getItem("lname");
  localStorage.getItem("number");
  localStorage.getItem("userKey");

  let com_prop_id = localStorage.getItem("userKey");
  const handleUpdate = () => {
    // Check if required fields are not null
    if (!name || !lastName || !address || !phoneNumber || !propertyName || !email) {
      // Handle the case where any required field is null
      console.error("Please fill out all required fields");
      return;
    }

    // Make PUT request using Axios
    axios
      .put(
        `https://ot-technologies.com/commercialAdmin/update_profile/${com_prop_id}`,
        {
          name,
          lastName,
          address,
          phoneNumber,
          propertyName,
          propertyId,
          email,
        }
      )
      .then((response) => {
        // Handle success, if needed
        const user = response.data.user;
        console.log(response.data.user);
        localStorage.setItem("name", user.name);
        localStorage.setItem("address", user.address);
        localStorage.setItem("lname", user.lastName);
        localStorage.setItem("number", user.phoneNumber);
        localStorage.setItem("commercialPropName", user.propertyName)
        localStorage.setItem("email", user.email)
        alert("profile updated successfully");
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Error updating profile:", error);
        if (error.response.data.login) {
          alert(error.response.data.message);
          navigate("/login");
          return;
        }
      });
  };


  const DeleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://ot-technologies.com/commercialAdmin/deleteUser/${com_prop_id}?propertyId=${propertyId}`,
        {
          data: { // Use 'data' property to send request body
            userPhoneNumber: phoneNumber,
            userEmail: email,
          },
        }
      );
      localStorage.clear();
      navigate("/login");
      // Perform any additional actions after deletion (e.g., redirect, show a success message)
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
        return;
      }
      // Handle the error (e.g., show an error message)
    }
  };



  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

  const handleDelete = () => {
    DeleteUser();
    setShowDeleteDialogue(false);
  };

  const handleDeleteDialogueOpen = () => {
    setShowDeleteDialogue(true);
  };
  const handleDeleteDialogueClose = () => {
    setShowDeleteDialogue(false);
  };



  return (
    <div>
      {/* <Header /> */}
      <div className="container">
        <div className="col-6 row d-grid justify-content-end mt-4">


          {/* <div className="col-6 mt-5 mb-5">
            <div className="d-flex align-items-center">
              <img src={EditUserIcon} alt="" />
              <div className="d-grid" style={{ marginLeft: "30px" }}>
                <span style={headingStyle}>{name + " " + lastName}</span>
                <span className="text-start" style={normalText}>{email}</span>
              </div>
            </div>
          </div> */}

          <Typography sx={{ textAlign: "center", mb: "2rem", mt: "0rem", fontWeight: 600, fontFamily: "Poppins", color: "#566D90" }}>Management Information</Typography>
          <form>
            {/* 1 */}
            <div className="d-flex">
              <img
                src={Name_Icon}
                alt="User Icon"
                style={{ color: "#566D90", width: 25 }}
              />
              <input
                type="text"
                id="input-field"
                className="residentialModalInputField"
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
                style={{ color: "#566D90", width: 25 }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="residentialModalInputField"
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
                src={Email_Icon}
                alt="User Icon"
                style={{ color: "#566D90", width: 23 }}
              />
              <input
                type="text"
                placeholder="Email"
                className="residentialModalInputField"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <hr style={hrStyle}></hr>
            <div className="d-flex mt-3 ">
              <img
                src={Phone_Icon}
                alt="User Icon"
                style={{ color: "#566D90", width: 25 }}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="residentialModalInputField"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>

            <Typography sx={{ textAlign: "center", mb: "2rem", mt: "1rem", fontWeight: 600, fontFamily: "Poppins", color: "#566D90", mt: "4rem" }}>Property Information</Typography>


            <div className="d-flex">
              <img src={HouseBuilding} alt="User Icon" style={{ width: 18 }} />
              <input
                type="text"
                placeholder="Property Name"
                className="residentialModalInputField"
                id="lastName"
                style={inputFieldStyle}
                autoComplete="off"
                maxLength={50}
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}

              />

            </div>

            <hr style={hrStyle}></hr>

            <div className="d-flex">

              <img src={Address_Icon} style={{ width: 25 }} alt="User Icon" />


              <input
                type="text"
                id="address"
                placeholder="Address"
                style={inputFieldStyle}
                className="residentialModalInputField"
                autoComplete="off"
                maxLength={50}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              onClick={handleDeleteDialogueOpen}
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


      {showDeleteDialogue && (
        <DeleteDialogue
          handleDeleteOpen={handleDeleteDialogueOpen}
          handleDelete={handleDelete}
          handleDeleteClose={handleDeleteDialogueClose}
        />
      )}


    </div>
  );
}

export default UserProfile;

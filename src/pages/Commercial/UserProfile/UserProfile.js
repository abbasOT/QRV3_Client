import Header from "../../../components/Commercial/Header/Header";
import EditUserIcon from "../../../assests/edit_user_icon.svg";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";

import { Dropdown, Modal, Button } from "react-bootstrap";
import ChangePasswordModal from "../../../components/Commercial/ChangePasswordModal/ChangePass";
import "../../../App.css";
import { Link, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  // color: "#FFFFFF",
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

const headingStyle = {};
const normalText = {};
function UserProfile() {
  const [showChangePassModal, setChangePassModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOpenModal = () => {
    setChangePassModal(true);
    console.log(showChangePassModal);
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
                <span style={headingStyle}>Gabriela Acosta</span>
                <span style={normalText}>test@gmail.com</span>
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
                value={email} // Bind email state to the input value
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
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
                value={password} // Bind email state to the input value
                onChange={(e) => setPassword(e.target.value)}
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
                value={password} // Bind email state to the input value
                onChange={(e) => setPassword(e.target.value)}
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
                value={password} // Bind email state to the input value
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>

            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary mt-5"
              // onClick={handleSubmit}
              
            >
              Done
            </button>

            <div
              className="mt-5"
              style={{ color: "#566D90" }}
              onClick={handleOpenModal}
            >
              Change password
            </div>
            <div className=" mt-2" style={{ color: "#C24E42" }}>
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
          <ChangePasswordModal  />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;

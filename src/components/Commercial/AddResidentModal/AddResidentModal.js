import axios from "axios";

import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import PassIcon from "../../../assests/password_blue_icon.svg";
import LoadingScreen from "../../../pages/Loader/Loader";
import EmailIcon from "../../../assests/email_blue_icon.svg";

import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";

import EditIcon from "../../../assests/edit_blue_icon.svg";

import MailIcon from "../../../assests/mail_blue_icon.svg";
import SuspendIcon from "../../../assests/suspend_icon.svg";
import ReactivationIcon from "../../../assests/reactivation_icon.svg";
import DeleteIcon from "../../../assests/delete_icon.svg";
import sendIcon from "../../../assests/send_icon.svg";

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
  marginLeft: "30px",
  outline: "none",
};
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#566D90 solid 1px",
  backgroundColor: "white",
  color: "#566D90",
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
  border: "none",
};

const iconStyle = {
  marginLeft: "20px",
};

export default function AddResidentModal({
  formData,
  setFormData,
  handleSendInvitation,
}) {
  const [isListed, setIsListed] = useState(false);

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row align-items-center">
        <div className="col-6">
          <Card className=" " style={{ borderStyle: "none" }}>
            <Card.Body className="p-0">
              <div className="mb-" style={{ padding: "5% 8%" }}>
                <div className="mb-3">
                  <Form onSubmit={""}>
                    {/* 1 */}
                    <div className="d-flex mt-">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="name-input-field"
                        placeholder="Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={formData.name} // Bind email state to the input value
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        } // Update email state on input change
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="lname-input-field"
                        placeholder="Last Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={formData.lname}
                        onChange={(e) =>
                          setFormData({ ...formData, lname: e.target.value })
                        } 
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}
                    <div className="d-flex mt-3 ">
                      <img src={MailIcon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        placeholder="Email"
                        id="email-input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={formData.email} 
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 3 */}

                    <div className="d-flex mt-3 ">
                      <img src={MailIcon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        placeholder="Repeat Email"
                        id="repeat-email-input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={formData.repeatEmail} // Bind email state to the input value
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            repeatEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 5 */}
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <button
            style={btnStyle}
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleSendInvitation}
          >
            Send Invitation{" "}
            <img style={{ marginLeft: "20px" }} src={sendIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

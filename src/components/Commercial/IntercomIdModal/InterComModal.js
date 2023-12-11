import axios from "axios";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import NumPadIcon from "../../../assests/pin_code_black_icon.svg";
import EditIcon from "../../../assests/edit_modal_icon.svg";
import DeleteIcon from "../../../assests/delete_icon.svg";

import IntercomIcon from "../../../assests/intercom_modal_icon.png";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  borderRadius:"5px",
  background: "#EEE",
  fontSize: "16px",
  width: "280px",
  marginLeft: "auto",
  marginRight:"auto",
  outline: "none",
  textAlign:"center",
  height:"33px"
};
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "20px",
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",
};

const iconStyle = {
  marginLeft: "20px",
};

export default function PinCodeModal({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ShowPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();

  const [isListed, setIsListed] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const handleSubmit = (event) => {
    setIsListed(true);
    event.preventDefault();
    // setEmail(formData.email)
    // Here you would perform validation on form data before sending it to the server

    axios
      .post(`https://sailiteasy.com/api/users/register`, formData)
      .then((response) => {
        // Handle success
        console.log("User registered:", response.data.message);
        // alert.show(response.data.message,{
        //   type: "success",
        //   timeout: 5000,
        // });
        // setshowSignUpModal(false);
        // setConfirmEmailModal(true);
        // setIsListed(false)
        // Perform any additional actions (redirect, state update, etc.) upon successful registration
      })
      .catch((error) => {
        if (error.response) {
          //       alert.show(error.response.data.message, {
          //     type: "error",
          //     timeout: 5000,
          //   });
          setIsListed(false);
        } else {
          // alert.show("Server Not Responding Try Again Later",{
          //   type: "error",
          //   timeout: 5000,
          // });
          setIsListed(false);
        }
      });
  };

  const handleOpenModal = () => {
    setPinCodeModal(true);
    console.log(ShowPinCodeModal);
  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      {/* <div className="row align-items-center">
        <div className="col-12">
          <Card className=" " style={{ borderStyle: "none" }}>
            <Card.Body className="p-0">
              <div className="mb-" style={{ padding: "5% 8%" }}>
              
              </div>
            </Card.Body>
          </Card>
        </div>
      </div> */}
      <div className="mb-3 mt-3">
        <div className="d-flex" >
          <img src={IntercomIcon} style={{marginRight:"auto",marginLeft:"auto"}} alt="" />
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            {/* 1 */}
            <div className="d-flex mt-3 pt-3 pb-3">
              <input
                type="text"
                id="input-field"
                placeholder="Enter Intercom ID"
                style={inputFieldStyle}
                autoComplete="off"
                value={email} // Bind email state to the input value
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
            </div>
            <hr style={hrStyle}></hr>
            {/*  */}

            <div className="d-grid justify-content-center">
              <button
                style={btnStyle}
                type="button"
                className="btn btn-primary shadow-sm mt-3 mb-3"
                onClick={handleOpenModal}
              >
                Done
              </button>
              <div className="text-center" style={{ color: "#DC5656" }}>Delete Intercom ID</div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form ,Modal,} from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import EmailIcon from "../../../assests/email_blue_icon.svg";
import UserDetailIcon from "../../../assests/user_detail_icon.svg";
import Address_Icon from "../../../assests/address_blue_icon.svg";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import Phone_Icon from "../../../assests/phone_blue_icon.svg";
import SuspendIcon from '../../../assests/suspend_icon.svg'
import DeleteIcon from '../../../assests/delete_icon.svg'
import SuspendedUserModal from "../SuspendedUserModal/SuspendedModal";

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
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight:"600",
  
};
const redbtnStyle ={
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#2A3649 solid 1px",
  backgroundColor: "#DC5656",
  color: "",
  fontWeight:"600",
  border:"none"
};

const iconStyle = {
  marginLeft: "20px",
};

export default function UserDetailModal({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuspendedModal, setSuspendedModal] = useState(false);
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
    setSuspendedModal(true);
    console.log(showSuspendedModal);
    
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
                  <Form onSubmit={handleSubmit}>
                    {/* 1 */}
                    <div className="d-flex mt-">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="input-field"
                        placeholder="First Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={email} // Bind email state to the input value
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
                        value={email} // Bind email state to the input value
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
                        value={password} // Bind email state to the input value
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
                        value={password} // Bind email state to the input value
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
                        value={password} // Bind email state to the input value
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
              onClick={ handleOpenModal}
              
            >
         <img src={SuspendIcon} alt="" />    Suspend Resident
            </button>
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleSubmit}
              
            >
         <img src={DeleteIcon} alt="" />   Delete Resident
            </button>
        </div>
      </div>


      <Modal
        size="lg"
        centered
        className="abc"
        show={showSuspendedModal}
        style={{ width: "", height: "" }}
        onHide={() => setSuspendedModal(false)}
      >
        <Modal.Title
          className="w-100 text-center pt-2"
          style={{
            alignItems: "center",
            height: "62px",
            backgroundColor: "#DC5656",
            color: "white",
          }}
        >
          <img style={{ marginRight: "30px" }} src={UserDetailIcon} alt="" />
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
          <SuspendedUserModal />
        </Modal.Body>
      </Modal>
    </div>
  );
}

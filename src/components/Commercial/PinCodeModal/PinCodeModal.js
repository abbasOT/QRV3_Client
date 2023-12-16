import axios from "axios";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import NumPadIcon from '../../../assests/pin_code_black_icon.svg'
import EditIcon from "../../../assests/edit_modal_icon.svg";
import DeleteIcon from "../../../assests/delete_icon.svg";
import AlertModal from '../AlertModal/AlertModal'
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

const iconStyle = {
  marginLeft: "20px",
};

export default function PinCodeModal({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showDeleteAlterModal, setDeleteAlertModal] = useState(false);

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
      <div className="row align-items-center">
        <div className="col-12">
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
                      <img src={NumPadIcon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="input-field"
                        placeholder="Pin Code"
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
                        <img src={EditIcon} alt="" /> Edit
                      </button>

                      <button
                        style={btnStyle}
                        type="button"
                        className="btn btn-primary shadow-sm"
                        onClick={handleOpenModal}
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
        style={{ width: "", height: "",border:" #E3982A solid 3px" }}
        onHide={() => setDeleteAlertModal(false)}
      >
       
        <Modal.Body >
          <AlertModal message={"Are you sure you want to delete it?"} />
        </Modal.Body>
      </Modal>


    </div>
  );
}

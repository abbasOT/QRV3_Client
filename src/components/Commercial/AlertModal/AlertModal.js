import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../../../pages/Loader/Loader";
import AlertIcon from '../../../assests/alert_icon.svg'


const greenbtn = {
  backgroundColor: "#19a65b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const btn = {
  backgroundColor: "",
  color: "",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

export default function AlertModal({message,handleClick,label}) {
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

  const handleSubmit = (event, value) => {
    if (value == "yes") {
      alert(value);
    }
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

  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row">
        <div>
        <img src={AlertIcon} alt="" />
        </div>
        
        <span className="text-center">{message}</span>
      </div>
      <div className="row d-flex justify-content-evenly mt-5">

        <div className="col-2">
          <button style={btn} onClick={()=> handleClick("yes",label)}>Yes </button>
        </div>
        <div className="col-2">
          <button style={greenbtn} onClick={()=> handleClick("no",label)}>ON </button>
        </div>
      </div>

      {/* <button
                    style={btnStyle}
                    type="button"
                    className="btn btn-primary shadow-sm"
                    onClick={()=> handleSubmit("yes")}
                  >
                    <img src={DeleteIcon} alt="" /> Yes
                  </button> */}
    </div>
  );
}

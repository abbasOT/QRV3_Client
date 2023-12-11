import axios from "axios";

import React, { useState } from "react";
import {  Button, Card, Form } from "react-bootstrap";
import PassIcon from '../../../assests/password_blue_icon.svg'

import LoadingScreen from '../../../pages/Loader/Loader';


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
  };

  const iconStyle ={
    marginLeft:"20px"
  }


export default function ChangePassword({  }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
  const [isListed, setIsListed] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNo: "",
  });

 

  const handleSubmit = (event) => {
    setIsListed(true)
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
        if(error.response){
    //       alert.show(error.response.data.message, {
    //     type: "error",
    //     timeout: 5000,
    //   });
      setIsListed(false)
      }else{
        // alert.show("Server Not Responding Try Again Later",{
        //   type: "error",
        //   timeout: 5000,
        // });
        setIsListed(false)
      }
     
      });
  };

  return (
    <div>
      <LoadingScreen open={isListed}/>
      <Card className=" " style={{ borderStyle: "none" }}>
        <Card.Body className="p-0">
          <div className="mb-3 mt-md-" style={{ padding: "5% 8%" }}>
            <div className="mb-3">
              <Form onSubmit={handleSubmit} >
              
             
            {/* 1 */}
            <div className="d-flex mt-5">
              <img
                src={PassIcon}
                alt="User Icon"
                style={iconStyle}
              />
              <input
                type="text"
                id="input-field"
                placeholder="Old Password"
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
                src={PassIcon}
                alt="User Icon"
                style={iconStyle}
              />
              <input
                type="text"
                placeholder="New Password"
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
                src={PassIcon}
                alt="User Icon"
                style={iconStyle}
              />
              <input
                type="text"
                placeholder="Confirm Password"
                id="input-field"
                style={inputFieldStyle}
                autoComplete="off"
                value={password} // Bind email state to the input value
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>
           <div style={{display:"flex",justifyContent:"center"}}>
           <button
              style={btnStyle}
              type="button"
              className="btn btn-primary mt-5"
              // onClick={handleSubmit}
            //   onClick={handleOpenModal}
            >
             Change Password
            </button>

           </div>
          
          
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

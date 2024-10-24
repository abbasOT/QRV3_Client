import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import PassIcon from '../../../assests/password_blue_icon.svg'
import { useNavigate } from "react-router-dom";
import LoadingScreen from '../../../pages/Loader/Loader';


const hrStyle = {
  // border: 'none',
  opacity: "80%",
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
  color: "#566D90",
};
const btnStyle = {
  width: "230px",
  fontWeight: 600,
  fontFamily: "Poppins",
  fontSize: "0.9rem",
  borderRadius: "10px",
  border: "#566D90 solid 1px",
  backgroundColor: "white",
  color: "#566D90",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"

};

const iconStyle = {
  marginLeft: "20px"
}


export default function ChangePassword({ setChangePassModal }) {

  const navigate = useNavigate();


  const [isListed, setIsListed] = useState(false);
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  let com_prop_id = localStorage.getItem("userKey");
  const propertyId = localStorage.getItem("commercialPropId");
  const handlePassChange = async () => {
    try {
      // Extract old, new, and confirm passwords from the formData state
      const { oldpassword, newpassword, confirmpassword } = formData;

      // Make sure new and confirm passwords match
      if (newpassword !== confirmpassword) {
        // Handle error (passwords don't match)
        console.error('New password and confirm password do not match');
        return;
      }

      // Make a request to change the password
      const response = await axios.put(`https://ot-technologies.com/commercialAdmin/changePassword/${com_prop_id}`, {
        oldpassword,
        newpassword,
        propertyId
      });

      // Handle the response (you can check response.data for messages)
      console.log(response.data);
      alert("Password changed successfully")
      setChangePassModal(false)

      // Optionally, reset the form or perform other actions on success
      setFormData({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
      });
    } catch (error) {
      // Handle errors (server error, invalid password, etc.)
      console.error('Error changing password:', error.response.data);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
        return;
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  return (
    <div>
      <LoadingScreen open={isListed} />
      <Card className=" " style={{ borderStyle: "none" }}>
        <Card.Body className="p-0">
          <div className="mb-3 mt-md-" style={{ padding: "5% 8%" }}>
            <div className="mb-3">
              <Form  >


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
                    className="residentialModalInputField"
                    placeholder="Old Password"
                    style={inputFieldStyle}
                    autoComplete="off"
                    value={formData.oldpassword}
                    onChange={(e) => handleInputChange('oldpassword', e.target.value)}
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
                    className="residentialModalInputField"
                    id="input-field"
                    style={inputFieldStyle}
                    autoComplete="off"
                    value={formData.newpassword}
                    onChange={(e) => handleInputChange('newpassword', e.target.value)}
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
                    className="residentialModalInputField"
                    id="input-field"
                    style={inputFieldStyle}
                    autoComplete="off"
                    value={formData.confirmpassword}
                    onChange={(e) => handleInputChange('confirmpassword', e.target.value)}
                  />
                </div>
                <hr style={hrStyle}></hr>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button

                    style={btnStyle}
                    type="button"
                    className="btn btn-primary mt-5 shadow"
                    onClick={handlePassChange}

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

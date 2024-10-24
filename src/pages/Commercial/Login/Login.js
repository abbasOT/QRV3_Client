import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import React, { useEffect, useState } from "react";
import EmailIcon from "../../../assests/email_id_icon.svg";
import PassIcom from "../../../assests/password_icon.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "../../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const btnStyle = {
  width: "390px",
  height: "45px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "white",
  color: "#2A3649",
};

const textStyle = {
  fontFamily: 'var(--font-family-secondary)',
  color: 'var(--primary-color)',
  fontStyle: "italic",
  paddingTop: "2.75rem",

}
const signupTextStyle = {
  fontFamily: "Raleway",
  paddingLeft: "1rem",
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: "12px",
}
const inputTextStyle = {
  fontFamily: "Poppins",
  color: "#2A3649",
  fontWeight: "400",
  fontSize: "13px",
}

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#FFFFFF solid 2px",
};

const inputFieldStyle = {
  ...inputTextStyle,
  border: "none",
  background: "none",
  color: "#FFFFFF",
  fontSize: "16px",
  width: "300px",
  marginLeft: "30px",
  outline: "none",
};

const loginTitleStyle = {
  fontFamily: "Raleway",
  fontWeight: "500",
  fontSize: "35px",
  lineHeight: "42px",
  textAlign: "center",
  marginBottom: "12%",
  color: "#FFFFFF",
};

const forgetStyle = {
  color: "#FFFFFF",
  fontSize: "16px",
  float: "right",
  marginLeft: "auto",
};
const passwordEyeBox = {
  position: 'absolute',
  color: "#FFF",
  top: '65%',
  right: '5%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  opacity: '50%',
  display: 'flex',
  alignItems: 'center',
}

function CommercialLogin() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .max(50, "Must be 50 characters or less"),
      password: Yup.string()
        .required("Required")
        .max(50, "Must be 50 characters or less"),
    }),
    onSubmit: async (values) => {
      try {
        // Make API request using Axios to login
        const response = await axios.post(
          "https://ot-technologies.com/commercialAdmin/login",
          values
        );
        const data = response.data;
        const user = response.data.user;
        console.log(user)
        // Handle the response as needed
        console.log("API Response:", data);
        localStorage.setItem("name", user.name)
        localStorage.setItem("email", user.email)
        localStorage.setItem("address", user.address)
        localStorage.setItem("lname", user.lastName)
        localStorage.setItem("number", user.phoneNumber)
        localStorage.setItem("userKey", data.userKey);
        localStorage.setItem("commercialPropId", user.propertyId);
        localStorage.setItem("commercialPropName", user.propertyName);
        localStorage.setItem("commercialPropEmail", user.propertyEmail);
        localStorage.setItem("status", data.user.status);
        alert("Login Successfull");
        if (data.user && data.user.propertyId) {
          console.log("if ", data.user.status);
          navigate(`/commercial-admin`);
        } else {
          console.log("else ", data.user.status);
          navigate("/get_property");
        }
      } catch (error) {
        // Handle API request errors
        alert(error.response.data.error);
        console.error("API Error:", error.response.data.error);
      }
    },
  });

  return (
    <div className="container-fluid ">
      <div className="row   ">
        <div className="col-6 ">
          <div className="d-flex align-items-center justify-content-center h-100">
            <div>
              <img src={DoorMan_Img} alt="" />
              <p style={textStyle}>elevating your entry experience...</p>
            </div>

          </div>
        </div>

        <div
          className="col-6"
          style={{ backgroundColor: "#2A3649", height: "100vh" }}
        >
          <div
            className=" align-items-center justify-content-center h-100"
            style={{ padding: "20%" }}
          >
            <div style={loginTitleStyle}>Welcome Back</div>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex">
                <img src={EmailIcon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="User"
                  style={inputFieldStyle}
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={requiredStyle}>{formik.errors.email}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>

              <div className="d-flex mt-5" style={{ position: "relative" }}>
                <img src={PassIcom} alt="User Icon" style={{}} />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="input-field"
                  style={inputFieldStyle}
                  autoComplete="off"
                  {...formik.getFieldProps("password")}
                  maxLength={50}
                />
                <Box
                  sx={passwordEyeBox}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </Box>
                {formik.touched.password && formik.errors.password ? (
                  <div style={requiredStyle}>{formik.errors.password}</div>
                ) : null}
              </div>

              <hr style={hrStyle} className="mb-5"></hr>

              {/* <div className="d-grid">
                <p className="mt-2" style={forgetStyle}>
                 <b>Forget Password?</b> 
                </p>
              </div> */}
              <button
                style={btnStyle}
                type="submit"
                className="btn btn-primary mt-5"
              >
                <b>Login</b>
              </button>

              <div className="mt-5" style={{ color: "white", fontFamily: "Raleway", fontSize: "0.8rem" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup-commercial"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span style={signupTextStyle}>Sign Up</span>
                </Link>
              </div>

              <div style={{ color: "white", fontFamily: "Raleway", fontSize: "0.8rem", marginTop: "2rem" }}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Forgotten password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommercialLogin;
const requiredStyle = { display: "flex", alignItems: "center", textAlign: "start", color: "red" }
{
  /* <div className="col-12">
<img src={DoorMan_Img} alt="" />
</div>
<div className="col-12 mt-3 mb-5">
<div className="text-center">
  Effortless Security Access at Your <br /> Fingertips
</div>
</div>
<div className="col-12 mt-5">
<button style={btnStyle} type="button" className="btn btn-primary">
  Get Started
</button>
</div> */
}

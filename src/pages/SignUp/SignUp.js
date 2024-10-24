import DoorMan_Img from "../../assests/doorman_landing_image.png";
import React, { useEffect, useState } from "react";
import Pass_Icon from "../../assests/password_icon.svg";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Address_Icon from "../../assests/address.svg";
import Name_Icon from "../../assests/email_id_icon.svg";
import Phone_Icon from "../../assests/phone_icon.svg";
import EmailIcon from "../../assests/email_icon.svg";
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
  fontSize: "16px",
};
const inputTextStyle = {
  fontFamily: "Raleway",
  color: "#FFFFFF",
  fontWeight: "400",
  fontSize: "13px",
}

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#FFFFFF solid 1px",
};

const inputFieldStyle = {
  ...inputTextStyle,
  border: "none",
  background: "none",
  color: "#FFFFFF",
  '::placeholder': {
    color: 'white' // Placeholder color
  },
  fontSize: "16px",
  width: "300px",
  marginLeft: "30px",
  outline: "none",
};

const forgetStyle = {
  color: "#FFFFFF",
  fontSize: "16px",
  float: "right",
  marginLeft: "auto",
};

function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(/^\d{11}$/, "Must be 11 digits"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        // Make API request using Axios
        const response = await axios.post(
          "https://ot-technologies.com/commercialAdmin/signup",
          values
        );

        // Handle the response as needed
        console.log("API Response:", response.data);
        alert("Sign Up Successfull");
        navigate("/login");
        // Add any additional logic or state updates after a successful form submission
      } catch (error) {
        // Handle API request errors
        console.error("API Error:", error.message);
        alert("Sorry, This Email is already registered.");

        // You can update state or show an error message to the user
      }
    },
  });

  const IconStyles = {
    width: "34px",
    height: "34px",
  };

  return (
    <div className="container-fluid ">
      <div className="row   ">
        <div className="col-6 ">
          <div className="d-grid align-items-center justify-content-center h-100">
            <div>
              <img src={DoorMan_Img} alt="" />
              <p className="mt-3" style={textStyle}>Elevating your Entry Experience</p>
            </div>
            {/* <p className="text-center" style={{ color: "#2A3649" }}>
           name: "",
      lastName: "",
      address: 
          </p> */}
          </div>
        </div>

        <div
          className="col-6"
          style={{ backgroundColor: "#2A3649", height: "100vh" }}
        >
          <div
            className="d-flex align-items-center justify-content-center h-100"
          // style={{ padding: "20%" }}
          >
            <form onSubmit={formik.handleSubmit} style={{ width: "70%" }}>
              {/* 1 */}
              <div className="d-flex">
                <img src={Name_Icon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="white-placeholder"
                  style={inputFieldStyle}
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={requiredStyle}>{formik.errors.name}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 2 */}
              <div className="d-flex mt-3 ">
                <img src={Name_Icon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="white-placeholder"
                  id="lastName"
                  style={inputFieldStyle}
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div style={requiredStyle}>{formik.errors.lastName}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 3 */}
              <div className="d-flex mt-3">
                <div style={IconStyles}>
                  <img src={Address_Icon} alt="User Icon" />
                </div>

                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  style={inputFieldStyle}
                  className="white-placeholder"
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div style={requiredStyle}>{formik.errors.address}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 4 */}
              {/* Phone Number */}
              <div className="d-flex mt-3">
                <div style={IconStyles}>
                  <img src={Phone_Icon} alt="User Icon" />
                </div>

                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone number"
                  style={inputFieldStyle}
                  autoComplete="off"
                  maxLength={11}
                  className="white-placeholder"
                  {...formik.getFieldProps("phoneNumber")}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div style={requiredStyle}>{formik.errors.phoneNumber}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 5 */}
              {/* Email */}
              <div className="d-flex mt-3">
                <div style={IconStyles}>
                  <img src={EmailIcon} alt="User Icon" />
                </div>

                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  style={inputFieldStyle}
                  className="white-placeholder"
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={requiredStyle}>{formik.errors.email}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 6 */}
              {/* Password */}
              <div className="d-flex mt-3">
                <div style={IconStyles}>
                  <img src={Pass_Icon} alt="User Icon" style={{}} />
                </div>

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  style={inputFieldStyle}
                  className="white-placeholder"
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={requiredStyle}>{formik.errors.password}</div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>
              {/* 7 */}
              {/* Confirm Password */}
              <div className="d-flex mt-3">
                <div style={IconStyles}>
                  <img src={Pass_Icon} alt="User Icon" style={{}} />
                </div>

                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  style={inputFieldStyle}
                  className="white-placeholder"
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                  <div style={requiredStyle}>
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <hr style={hrStyle}></hr>

              {/* Submit Button */}
              <button
                style={btnStyle}
                type="submit"
                className="btn btn-primary mt-5"
              >
                <b>Create Account</b>
              </button>

              {/* Additional Info */}
              <div className="mt-5" style={{ color: "white" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <b>Log in</b>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
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
const textStyle = {
  fontFamily: "Poppins",
  color: "#2A3649",
  fontWeight: "700",
  fontSize: "16px",
}
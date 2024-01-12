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

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#FFFFFF solid 1px",
};

const inputFieldStyle = {
  border: "none",
  background: "none",
  color: "#FFFFFF",
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
          "https://localhost:8000/commercialAdmin/signup",
          values
        );

        // Handle the response as needed
        console.log("API Response:", response.data);
        alert("sign success");
        navigate("/login");
        // Add any additional logic or state updates after a successful form submission
      } catch (error) {
        // Handle API request errors
        console.error("API Error:", error.message);
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
            <img src={DoorMan_Img} alt="" />

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
            className=" align-items-center justify-content-center h-100"
            style={{ padding: "20%" }}
          >
            <form onSubmit={formik.handleSubmit}>
              {/* 1 */}
              <div className="d-flex">
                <img src={Name_Icon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  style={inputFieldStyle}
                  autoComplete="off"
                  {...formik.getFieldProps("name")}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
              <hr style={hrStyle}></hr>
              {/* 2 */}
              <div className="d-flex mt-3 ">
                <img src={Name_Icon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  style={inputFieldStyle}
                  autoComplete="off"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
              {formik.touched.lastName && formik.errors.lastName ? (
                <div style={{ color: "red" }}>{formik.errors.lastName}</div>
              ) : null}
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
                  autoComplete="off"
                  {...formik.getFieldProps("address")}
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <div style={{ color: "red" }}>{formik.errors.address}</div>
              ) : null}
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
                  {...formik.getFieldProps("phoneNumber")}
                />
              </div>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div style={{ color: "red" }}>{formik.errors.phoneNumber}</div>
              ) : null}
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
                  autoComplete="off"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
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
                  autoComplete="off"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
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
                  autoComplete="off"
                  {...formik.getFieldProps("confirmPassword")}
                />
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
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

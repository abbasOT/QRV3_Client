import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import React, { useEffect, useState } from "react";
import EmailIcon from "../../../assests/email_id_icon.svg";
import PassIcom from "../../../assests/password_icon.svg";
import "../../../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";

const btnStyle = {
  width: "390px",
  height: "45px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "white",
  fontSize: "1.2rem",
  color: 'var(--primary-color)',
  fontFamily: 'var(--font-family-primary)',
  fontWeight: 500
};
const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#FFFFFF solid 2px",
};
const textStyle = {
  fontFamily: 'var(--font-family-secondary)',
  color: 'var(--primary-color)',
  fontStyle: "italic",
  paddingTop: "2.75rem",

}

const inputFieldStyle = {
  border: "none",
  background: "none",
  color: "#FFFFFF",
  fontSize: "16px",
  width: "300px",
  marginLeft: "30px",
  outline: "none",

};

const loginTitleStyle = {
  fontFamily: 'var(--font-family-secondary)',
  fontWeight: 500,
  fontSize: "35px",
  lineHeight: "42px",
  textAlign: "center",
  marginBottom: "12%", // You have margin-bottom twice, I kept the first occurrence
  color: "#FFFFFF",
};


const container = {
  minWidth: "1200px"
}

function SuperLogin() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {


    try {
      // Make a POST request to your login endpoint
      const response = await axios.post('https://ot-technologies.com/super/login', {
        email,
        password,
      });

      console.log(response)
      // Assuming your server responds with a success message
      navigate('/dashboard');
      if (response.data.message === 'Login successful') {
        console.log('Login successful:', response.data);
        // Redirect to the dashboard

      } else {

        console.log('Login failed:', response.data);
      }
    } catch (error) {
      // Handle errors
      alert(error.response.data.message)
      console.error("API Error:", error.response.data.message);
    }
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
        // Make a POST request to your login endpoint
        const response = await axios.post('https://ot-technologies.com/super/login', {
          values
        });


        // Assuming your server responds with a success message

        if (response.data.message === 'Login successful') {
          console.log('Login successful:', response.data.user.email);
          localStorage.setItem('superEmail', response.data.user.email);
          // Redirect to the dashboard

        } else {

          console.log('Login failed:', response.data);
        }
        console.log('Login Successful')
        navigate('/dashboard');
      } catch (error) {
        // Handle errors
        alert(error.response.data.message)
        console.error("API Error:", error.response.data.message);
      }
    },
  });


  return (
    <div className="container-fluid " style={container}>
      <div className="row   ">
        <div className="col-6 ">
          <div className="d-flex align-items-center justify-content-center h-100">
            <div>
              <img src={DoorMan_Img} alt="" />
              <p style={textStyle}>elevating your entry experience...</p>
            </div>
          </div>
        </div>

        <div className="col-6" style={{ backgroundColor: "#2A3649", height: "100vh" }}>
          <div
            className=" align-items-center justify-content-center h-100 mt-4 "
            style={{ padding: "20%" }}
          >
            <div className="mt-4" style={loginTitleStyle}>Welcome Back</div>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex">
                <img src={EmailIcon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Email ID"
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

              <div className="d-flex mt-5">
                <img src={PassIcom} alt="User Icon" style={{}} />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  style={inputFieldStyle}
                  autoComplete="off"
                  maxLength={50}
                  {...formik.getFieldProps("password")}
                />
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
                Login
              </button>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperLogin;

const requiredStyle = { display: "flex", alignItems: "center", textAlign: "start", color: "red" }


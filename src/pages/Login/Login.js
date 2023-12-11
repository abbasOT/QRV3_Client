import DoorMan_Img from "../../assests/doorman_landing_image.png";
import React, { useEffect, useState } from "react";
import EmailIcon from "../../assests/email_id_icon.svg";
import PassIcom from "../../assests/password_icon.svg";
import "../../App.css";
import { Link } from "react-router-dom";

const btnStyle = {
  width: "390px",
  height: "45px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "white",
  color: "#2A3649",
};
const inputIconStyle = {
  width: "30px",
  height: "30px",
  marginRight: "20px",
  verticalAlign: "middle",
};
const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#FFFFFF solid 2px",
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

const loginTitleStyle = {
  fontFamily: "'Raleway', sans-serif",
  fontWeight: "500",
  fontSize: "35px",
  lineHeight: "42px",
  textAlign: "center",
  marginBottom: "12%", // You have margin-bottom twice, I kept the first occurrence
  color: "#FFFFFF",
};
const inputStyle = {
  "::placeholder": {
    color: "#FFFFFF",
    fontFamily: "'Raleway', sans-serif",
  },
};

const forgetStyle = {
  color: "#FFFFFF",
  fontSize: "16px",
  float: "right",
  marginLeft:"auto"
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-fluid ">
      <div className="row   ">
        <div className="col-6 ">
          <div className="d-flex align-items-center justify-content-center h-100">
            <img src={DoorMan_Img} alt="" />
          </div>
        </div>

        <div className="col-6" style={{ backgroundColor: "#2A3649",height:"100vh" }}>
          <div
            className=" align-items-center justify-content-center h-100"
            style={{ padding: "20%" }}
          >
            <div style={loginTitleStyle}>Welcome Back</div>
            <form>
              <div className="d-flex">
                <img src={EmailIcon} alt="User Icon" style={{}} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Email ID"
                  style={inputFieldStyle}
                  autoComplete="off"
                  value={email} // Bind email state to the input value
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                />
              </div>
              <hr style={hrStyle}></hr>

              <div className="d-flex mt-5 ">
                <img src={PassIcom} alt="User Icon" style={{}} />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  style={inputFieldStyle}
                  autoComplete="off"
                  value={password} // Bind email state to the input value
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <hr style={hrStyle}></hr>x
                
                <div className="d-grid">
                <p className="mt-5" style={forgetStyle}>Forget Password?</p>
                </div>
             
              {/* <button type="submit" className="btn btn-primary">
                Login
              </button> */}

              <button
                style={btnStyle}
                type="button"
                className="btn btn-primary mt-5"
              >
                Login
              </button>
             
              <div className=" mt-5" style={{color:"white"}}>
                Don't have an account?{" "}
                <Link to="/signup" style={{textDecoration:"none" ,color:"white"}}>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

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

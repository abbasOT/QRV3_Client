import React from "react";
import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import { useNavigate } from "react-router-dom";



const textStyle = {
  fontFamily: 'var(--font-family-secondary)',
  color: 'var(--primary-color)',
  fontStyle: "italic",
  marginTop: "2.75rem",

}
const btnStyle = {
  color: 'var(--primary-color)',
  fontSize: "17px",
  fontFamily: 'var(--font-family-primary)',
  fontWeight: 700,
  width: "290px",
  height: "45px",
  borderRadius: "10px",
  border: "#566D90 solid 2px",
  backgroundColor: "white",
};



function LandingPage() {
  const navigate = useNavigate();

  const handleLoginNavigate = (() => {
    localStorage.setItem("hasSeenLandingPage", "hasSeenLandingPage")
    navigate("/login");
  });

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row d-grid justify-content-center ">
        <div className="col-12">
          <img src={DoorMan_Img} alt="" />
        </div>
        <div className="col-12 mt-3 mb-5">
          <div className="text-center">
            <p style={textStyle}>elevating your entry experience...</p>
          </div>
        </div>
        <div className="col-12 mt-4">
          <button style={btnStyle} onClick={handleLoginNavigate} type="button" className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

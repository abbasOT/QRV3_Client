import React from "react";
import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import { useNavigate } from "react-router-dom";

const btnStyle = {
  width: "290px",
  height: "45px",
  borderRadius: "10px",
  border: "#566D90 solid 2px",
  backgroundColor: "white",
  color: "#2A3649",
};



function LandingPage() {
  const navigate = useNavigate();

  const handleLoginNavigate=(()=>{
    navigate("/login");
  })

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row d-grid justify-content-center ">
        <div className="col-12">
          <img src={DoorMan_Img} alt="" />
        </div>
        <div className="col-12 mt-3 mb-5">
          <div className="text-center">
            Effortless Security Access at Your <br /> Fingertips
          </div>
        </div>
        <div className="col-12 mt-5">
          <button style={btnStyle} onClick={handleLoginNavigate} type="button" className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

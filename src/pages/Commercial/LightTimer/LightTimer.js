import React from "react";
import Header from "../../../components/Commercial/Header/Header";

const greenbtn = {
  backgroundColor: "#19a65b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const redbtn = {
  backgroundColor: "#DC5656",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const PmStyle = {
  border: "#EEE solid 2px",
  padding: "5px 15px",

  borderRadius: "10px",
  width: "65px",
  height: "45px",
};


const btnStyle = {
    width: "360px",
    height: "40px",
    borderRadius: "10px",
    border: "#566D90 solid 2px",
    backgroundColor: "white",
    color: "#2A3649",
    fontWeight:"600"
  };
 const divStyle ={
    width: "360px",
 }
const timeDivStyle = {
  width: "105px",
  height: "45px",
  padding: "5px 25px",
  border: "#EEE solid 2px",
  borderRadius: "10px",
  marginRight: "10px",
};
function LightTimer() {
  return (
    <div>
      <Header />
      <div className="container" style={{marginTop:"10%"}}>
        <div className="row d-grid justify-content-center">
          <div className="col d-flex pb-4 justify-content-">
            <div style={divStyle} className="d-flex justify-content-center">
            <div style={{ marginRight: "50px" }}>
              {" "}
              <button style={greenbtn}>ON </button>{" "}
            </div>
            <div
              style={timeDivStyle}
            >
              7:00
            </div>
            <div style={PmStyle}>pm</div>
            </div>
            
          </div>
          <hr />
          <div className="col d-flex pt-1 mb-5">
          <div style={divStyle} className="d-flex justify-content-center">
            <div style={{ marginRight: "50px" }}>
               <button style={redbtn}>OFF </button>{" "}
            </div>
            <div style={timeDivStyle}>7:00</div>
            <div style={PmStyle}>am</div>
            </div>
          </div>
          <div className="col-6 mt-5">
          <button style={btnStyle}  type="button" className="btn btn-primary">
          Set Timer
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightTimer;

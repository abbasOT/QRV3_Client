import React from "react";
import CommDetailIcon from "../../../assests/superAdmin/commercial_detail_icon.svg";
import ResDetailIcon from "../../../assests/superAdmin/residential_detail_icon.svg";
import PCBDetailIcon from "../../../assests/superAdmin/pcb_detail_icon.svg";

import Header from "../../../components/superAdmin/Header/Header";

const headingStyle = {
  color: "#727272",
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "24px",
};
const ValueStyle = {
  color: "#566D90",
  fontFamily: "Poppins",
  fontWeight: "700",
  fontSize: "48px",
};

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="container pt-5">
        <div
          className="row align-items-center justify-content-between"
          style={{
            backgroundColor: "#EEE",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
           height:"100px"
          }}
        >
          <div className="col-1" style={{paddingLeft:"0px",marginLeft:"-53px"}}>
            <img src={CommDetailIcon} alt="" />
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Inactive</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Active</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>10</div>
          </div>
        </div>

        <div
          className="row align-items-center justify-content-between mt-4"
          style={{
            backgroundColor: "#EEE",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            paddingLeft:"0px",
            height:"100px"
          }}
        >
          <div className="col-1" style={{paddingLeft:"0px" ,marginLeft:"-53px"}}>
            <img src={ResDetailIcon} alt="" />
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Inactive</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Active</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>10</div>
          </div>
        </div>

        <div
          className="row align-items-center justify-content-between mt-4"
        
        >
          <div className="col-6 d-flex "    style={{
            backgroundColor: "#EEE",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            paddingLeft:"0px",
            height:"100px"
          }}
        >
          <div className="col-1" style={{ marginLeft:"-53px"}}>
            <img src={PCBDetailIcon} alt="" />
          </div>
          <div className="col d-grid">
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}>10</div>
          </div>
          <div className="col-2 d-grid" style={{marginRight:"15"}}>
            <div style={headingStyle}>offline</div>
            <div style={ValueStyle}>10</div>
          </div>
          </div>
         
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

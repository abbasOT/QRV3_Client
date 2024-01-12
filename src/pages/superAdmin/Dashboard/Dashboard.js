import CommDetailIcon from "../../../assests/superAdmin/commercial_detail_icon.svg";
import ResDetailIcon from "../../../assests/superAdmin/residential_detail_icon.svg";
import PCBDetailIcon from "../../../assests/superAdmin/pcb_detail_icon.svg";
import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import axios from "axios";

const headingStyle = {
  color: "#727272",
  fontFamily: "Poppins",
  fontWeight: "600",
  fontSize: "24px",
};
const ValueStyle = {
  color: "#566D90",
  fontFamily: "sans-serif",
  fontWeight: "900",
  fontSize: "34px",
};

const container ={

  minWidth:"1200px",
}
function Dashboard() {

  const [CommercialTotalUsers, setCommercialTotalUsers] = useState([0]);
  const [ResidentialTotalUsers, setResidentialTotalUsers] = useState([0]);
  const [PropertyStandBy, setPropertyStandBy] = useState([0]);
 
  const [CommercialActive, setCommercialActive] = useState([0]);
  const [CommercialInactive, setCommercialInactive] = useState([0]);
  const [ResidentialInactive, setResidentialInactive] = useState([0]);
  const [ResidentialActive, setResidentialActive] = useState([0]);
  //
 const [totalStandByPCBs, settotalStandByPCBs] = useState([0]);
 const [totalOfflinePCBs, settotalOfflinePCBs] = useState([0]);
 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  

    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://localhost:8000/super/getdashboardData`
        );
      
        
        setPropertyStandBy(response.data.properties)
        setLoading(false)
        setCommercialTotalUsers(response.data.totalComUsers)
        setCommercialActive(response.data.comactiveCount)
        setCommercialInactive(response.data.cominactiveCount)
        setResidentialTotalUsers(response.data.totalResidentialUsers)
        setResidentialInactive(response.data.residentialActiveCount)
        setResidentialActive(response.data.residentialInactiveCount)
        settotalStandByPCBs(response.data.totalStandByPCBs)
        settotalOfflinePCBs(response.data.totalOfflinePCBs)
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };
  
    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);

  // const propertyStandByLength = Object.keys(PropertyStandBy).length;
  return (
    <div>
      <Header />
      <div className="container pt-5"  style={container}>

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
            <div style={ValueStyle}> <b>{PropertyStandBy}</b></div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Inactive</div>
            <div style={ValueStyle}>{CommercialInactive}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Active</div>
            <div style={ValueStyle}>{CommercialActive}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>{CommercialTotalUsers}</div>
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
            <div style={ValueStyle}>{PropertyStandBy}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Inactive</div>
            <div style={ValueStyle}>{ResidentialInactive}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Active</div>
            <div style={ValueStyle}>{ResidentialActive}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>{ResidentialTotalUsers}</div>
          </div>
        </div>

        <div
          className="row align-items-center justify-content-between mt-4"
        
        >
          <div className="col-6 d-flex justify-content-between"    style={{
            backgroundColor: "#EEE",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            paddingLeft:"0px",
            height:"100px"

          }}
        >
          <div className="col-2" style={{ marginLeft:"-53px"}}>
            <img src={PCBDetailIcon} alt="" />
          </div>
          <div className="col-3 d-grid" style={{marginRight:"60px",padding:"7px"}}>
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}>{totalStandByPCBs}</div>
          </div>
          <div className="col-2 d-grid" style={{marginRight:"10px",padding:"7px"}}>
            <div style={headingStyle}>offline</div>
            <div style={ValueStyle}>{totalOfflinePCBs}</div>
          </div>
          </div>
         
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

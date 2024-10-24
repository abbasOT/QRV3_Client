import CommDetailIcon from "../../../assests/superAdmin/commercial_detail_icon.svg";
// import ResDetailIcon from "../../../assests/superAdmin/residential_detail_icon.svg";
import ResDetailIcon from "../../../assests/superAdmin/residentialDetailNew.svg"
import AppUser from "../../../assests/superAdmin/appUserDashboard.svg"
import PCBDetailIcon from "../../../assests/superAdmin/pcb_detail_icon.svg";
import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import axios from "axios";
import { Box } from "@mui/material";
import useDashboardData from "../../../components/superAdmin/FetchDashboardData/FetchDashboardData";

const headingStyle = {
  color: "#727272",
  fontFamily: "Poppins",
  fontWeight: 600,
  whiteSpace: "nowrap"
};
const ValueStyle = {
  color: "#566D90",
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "40px",
};

const container = {

  minWidth: 1200,
}
function Dashboard() {


  // const [totalResidentialProperties, setTotalResidentialProperties] = useState([0]);
  // const [ResidentialTotalUsers, setResidentialTotalUsers] = useState([0]);
  // const [totalStandByProperties, settotalStandByProperties] = useState([0]);

  // const [CommercialActive, setCommercialActive] = useState([0]);
  // const [CommercialInactive, setCommercialInactive] = useState([0]);
  // const [totalCommercialResidents, setTotalCommercialResidents] = useState([0]);
  // const [totalCommercialSubscribedResidents, setTotalCommercialSubscribedResidents] = useState([0]);
  // const [totalCommercialUnsubscribedResidents, setTotalCommercialUnsubscribedResidents] = useState([0]);

  // const [ResidentialInactive, setResidentialInactive] = useState([0]);
  // //
  // const [totalStandByPCBs, settotalStandByPCBs] = useState([0]);


  // const [loading, setLoading] = useState(true);

  // useEffect(() => {


  //   const fetchProperties = async () => {
  //     try {
  //       // Make a GET request to get properties
  //       const response = await axios.get(
  //         `https://ot-technologies.com/super/getdashboardData`
  //       );


  //       // setPropertyStandBy(response.data.properties)
  //       setLoading(false)




  //       setTotalCommercialResidents(response.data.totalCommercialResidents)
  //       setTotalCommercialSubscribedResidents(response.data.subscribedResidentsCount)
  //       setTotalCommercialUnsubscribedResidents(response.data.unsubscribedResidentsCount)

  //       setCommercialActive(response.data.commercialCountWithId)
  //       setCommercialInactive(response.data.commercialCountWithoutId)


  //       setTotalResidentialProperties(response.data.totalResidentialProperties)
  //       setResidentialTotalUsers(response.data.totalPropertyResidents)
  //       setResidentialInactive(response.data.totalUnsubscribedPropertyResidents)
  //       // setResidentialActive(response.data.residentialActiveCount)

  //       settotalStandByPCBs(response.data.totalStandByPCBs)
  //       settotalStandByProperties(response.data.totalStandByProperties)

  //       // settotalOfflinePCBs(response.data.totalOfflinePCBs)
  //     } catch (error) {
  //       console.error("Error fetching properties:", error.message);
  //     }
  //   };

  //   // Call the function to fetch properties when the component mounts
  //   fetchProperties();
  // }, []);

  const {
    totalCommercialResidents,
    totalCommercialSubscribedResidents,
    totalCommercialUnsubscribedResidents,
    commercialActive,
    commercialInactive,
    totalResidentialProperties,
    residentialTotalUsers,
    residentialInactive,
    totalStandByPCBs,
    totalStandByProperties,
  } = useDashboardData();

  // const propertyStandByLength = Object.keys(PropertyStandBy).length;
  return (
    <div>
      <Header />
      <Box className="container pt-5" sx={container}>

        <div
          className="col-12 d-flex row align-items-center justify-content-between"
          style={{
            backgroundColor: "#EEE",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            height: "100px"
          }}
        >
          <div className="col-1" style={{ paddingLeft: "0px", marginLeft: "-53px" }}>
            <img src={CommDetailIcon} alt="" />
          </div>
          <div className="col-2 d-grid " >
            <div style={headingStyle}>Total Properties</div>
            <div style={ValueStyle}> <b>{commercialActive}</b></div>
          </div>
          <div className="col-2 d-grid" >
            <div style={headingStyle}>Property Without ID</div>
            <div style={ValueStyle}>{commercialInactive}</div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>{totalCommercialResidents}</div>
          </div>
          <div className="col-2 d-grid" >
            <div style={headingStyle}>Subscribed</div>
            <div style={ValueStyle}>{totalCommercialSubscribedResidents}</div>
          </div>
          <div className="col-2 d-grid" >
            <div style={headingStyle}>Canceled Subscription</div>
            <div style={ValueStyle}>{totalCommercialUnsubscribedResidents}</div>
          </div>
        </div>



        <div
          className="col-8 d-flex row align-items-center justify-content-between"
          style={{
            backgroundColor: "#EEE", marginTop: "3rem",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            height: "100px"
          }}
        >
          <div className="col-1" style={{ paddingLeft: "0px", marginLeft: "-53px" }}>
            <img src={ResDetailIcon} alt="" />
          </div>
          <div className="col-3 d-grid " >
            <div style={headingStyle}>Total Properties</div>
            <div style={ValueStyle}> <b>{totalResidentialProperties}</b></div>
          </div>
          <div className="col-2 d-grid">
            <div style={headingStyle}>Total Users</div>
            <div style={ValueStyle}>{residentialTotalUsers}</div>
          </div>
          <div className="col-4 d-grid" style={{ paddingRight: "4rem" }}>
            <div style={headingStyle}>Cancelled Subscription</div>
            <div style={ValueStyle}>{residentialInactive}</div>
          </div>

        </div>


        <div
          className="col-3 d-flex row align-items-center justify-content-between"
          style={{
            backgroundColor: "#EEE", marginTop: "3rem",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            height: "100px"
          }}
        >
          <div className="col-1" style={{ paddingLeft: "0px", marginLeft: "-53px" }}>
            <img src={PCBDetailIcon} alt="" />
          </div>
          <div className="col-10 d-grid ">
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}> <b>{totalStandByPCBs}</b></div>
          </div>
        </div>


        <div
          className="col-3 d-flex row align-items-center justify-content-between"
          style={{
            backgroundColor: "#EEE", marginTop: "3rem",
            borderRadius: "20px",
            boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.10)",
            height: "100px"
          }}
        >
          <div className="col-1" style={{ paddingLeft: "0px", marginLeft: "-53px" }}>
            <img src={AppUser} alt="" />
          </div>
          <div className="col-10 d-grid ">
            <div style={headingStyle}>Stand by</div>
            <div style={ValueStyle}> <b>{totalStandByProperties}</b></div>
          </div>
        </div>



      </Box>
    </div>
  );
}

export default Dashboard;

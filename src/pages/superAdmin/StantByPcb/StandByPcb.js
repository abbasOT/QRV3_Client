
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import StandByPcbCard from "../../../components/superAdmin/StandByPcbCard/StandByPcbCard";
import React, { useState, useEffect } from "react";
import axios from "axios";


const btnStyle = {
  width: "180px",
  height: "32px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  color: "#2A3649",
  fontWeight: "700",
};

const SearchInputStyle = {
  border: "none",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  width: "424px",
  height: "31px",
};
const bluebtnStyle = {
    width: "330px",
    height: "32px",
   fontFamily:"Poppins",
   textDecoration:"none",
    color: "#727272",
    fontWeight: "500",
    border: "none",
  };


const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};


const dataArray = [
  { propertyId: "IOKL#HY76&" },
  { propertyId:"IOKL#HY76&" },
  { propertyId:"IOKL#HY76&" },
  { propertyId:"IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" },
  { propertyId:"IOKL#HY76&" },
  { propertyId:"IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" },
  { propertyId: "IOKL#HY76&" }
];




function StandByPcb() {

  const [PCBs, setPCBs] = useState([]);

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `${process.env.REACT_APP_URL1}/super/getStandbyPCBs`
        );
        // Update the state with the fetched properties
        setPCBs(response.data.pcbs || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };
  
    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);

  const handleDeletePCB = async (pcbId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`${process.env.REACT_APP_URL1}/super/deleteStandbyPCB/${pcbId}`);
  
      // Update the state or perform other actions after a successful delete
      setPCBs(response.data.pcbs || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };


  return (
    <div>
      <Header />
      <div className="container">
        <div className="row mt-4 d-flex justify-content-between align-items-center pb-5">
          <div
            className="col-2 "
            style={{ textAlign: "left", color: "#566D90" }}
          >
             <Link
              to={"/pcb"}
              style={bluebtnStyle}
              type="button"
            //   className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
            >
              {"<"} Stand by PCBs
              <img src={"Icon"} style={{}} alt="" />
            </Link>
          </div>
          <div className="col-4 d-flex">
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      

        <div className="row mt-2">
          <div className="col-2 text-start">
            <span>Total PCBs: {Object.keys(PCBs).length}</span>
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <StandByPcbCard dataArray={PCBs}  handleDeletePCB={handleDeletePCB}/>
        </div>
      </div>
    </div>
  );
}

export default StandByPcb;

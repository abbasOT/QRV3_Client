import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import PropertyCard from "../../../components/superAdmin/PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import PcbCard from "../../../components/superAdmin/PCB Card/PcbCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2A3649",
  color: "",
  fontWeight: "500",
  border: "none",
};
const bluesmallbtnStyle = {
  width: "200px",
  height: "32px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2A3649",
  color: "",
  fontWeight: "500",
  border: "none",
};

const iconStyle = {
  position: "relative",
  marginRight: "-40px", 
};

const InputDivStyle = {
  borderRadius: "8px",
  width: "312px",
  height: "37px",
  border: "none",
  backgroundColor: "#D9D9D9",
  paddingLeft: "10%",
};


function PCB() {
  const [PCBs, setPCBs] = useState([]);
  const [pcbId, setPCBId] = useState("");


  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `${process.env.REACT_APP_URL1}/super/getPCBs`
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


  const handleSubmit = () => {
    // Your logic for handling form submission
    console.log("Form submitted:", pcbId);
    // Call your API endpoint here using axios or fetch
    // Example:
    axios
      .post(`${process.env.REACT_APP_URL1}/super/createPCB`, { pcbId })
      .then((response) => {
        console.log("API call successful:", response.data.pcbs);
        setPCBs(response.data.pcbs || []);
      })
      .catch((error) => {
        console.error("API call failed:", error.message);
      });
  };



  const handleDeletePCB = async (pcbId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`${process.env.REACT_APP_URL1}/super/deletePCB/${pcbId}`);
  
      // Update the state or perform other actions after a successful delete
      setPCBs(response.data.pcbs || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const handleUpdatePCB = async (pcbId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.put(`${process.env.REACT_APP_URL1}/super/updatePCB/${pcbId}`);
  
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
              to={"/stand_by_pcb"}
              style={bluebtnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
            >
             Stand by PCBs   {">"} <img src={"Icon"} style={{}} alt="" />
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
        <div className="row justify-content-center mt-5 pb-5">
          <div className="col-2">
            <span
              style={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
             PCB ID
            </span>
          </div>

          <div
            className="col-4"
            style={{ textAlign: "left", color: "#566D90" }}
          >
            <input
              type="text"
              style={InputDivStyle}
              placeholder="Enter PCB ID"
              value={pcbId}
              onChange={(e) => setPCBId(e.target.value)}
            />
          </div>

          <div
            className="col-3"
            style={{ textAlign: "left", color: "#566D90" }}
          >
            <button
              style={bluesmallbtnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              onClick={handleSubmit}
            >
            Add PCB ID
            </button>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-2 text-start">
            <span>Total PCBs:{Object.keys(PCBs).length}</span>
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <PcbCard dataArray={PCBs}  handleDeletePCB={handleDeletePCB} handleUpdatePCB={handleUpdatePCB} />
        </div>
      </div>
    </div>
  );
}

export default PCB;

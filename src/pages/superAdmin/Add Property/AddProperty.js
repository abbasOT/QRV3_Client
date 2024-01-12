import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import { Button, Card, Form, Modal } from "react-bootstrap";
import PropertyCard from "../../../components/superAdmin/PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
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
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
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
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};

const InputDivStyle = {
  borderRadius: "8px",
  width: "312px",
  height: "37px",
  border: "none",
  backgroundColor: "#D9D9D9",
  paddingLeft: "10%",
};
const TotalPropStyle ={
  fontFamily: "Raleway",
  fontSize: "16px",
  fontWeight: "400",
  color:"#535353"
}
const TotalPropNumStyle ={
...TotalPropStyle,
fontWeight: "600",
}

const container ={
  minWidth:"1200px"
}

function AddProperty() {
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `${process.env.REACT_APP_URL1}/super/getProperties`
        );
        // Update the state with the fetched properties
        setProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    fetchProperties();
  }, []);

  const handleSubmit = () => {
    // Your logic for handling form submission
    if(propertyId ===""){
      alert("please enter propertyId")
      return
    }
    console.log("Form submitted:", propertyId);
    // Call your API endpoint here using axios or fetch
    // Example:
    axios
      .post(`${process.env.REACT_APP_URL1}/super/createProperty`, { propertyId })
      .then((response) => {
        console.log("API call successful:", response.data.properties);
        setProperties(response.data.properties || []);
      })
      .catch((error) => {
        console.error("API call failed:", error.message);
        alert( error.response.data.error)
      });
  };


 const handleDeleteProperty = async (propertyId) => {
  try {
    // Make a DELETE request to super/deleteProperty with the propertyId
    const response = await axios.delete(`${process.env.REACT_APP_URL1}/super/deleteProperty/${propertyId}`);

    // Update the state or perform other actions after a successful delete
    setProperties(response.data.properties || []);
  } catch (error) {
    console.error('Error deleting property:', error.message);
  }
};

const handleStandByProperty = async (propertyId) => {
  try {
    // Make a DELETE request to super/deleteProperty with the propertyId
    const response = await axios.put(`${process.env.REACT_APP_URL1}/super/updateProperty/${propertyId}`);

    // Update the state or perform other actions after a successful delete
    setProperties(response.data.properties || []);
  } catch (error) {
    console.error('Error deleting property:', error.message);
  }
};


const handleSearchInputChange = (e) => {
  setSearchInput(e.target.value);
};


const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    // Perform search logic here, for example, filter residents based on searchInput
    const filteredResidents = Object.keys(properties).filter((residentId) =>
    properties[residentId].propertyId
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );

    const filteredResidentsArray = filteredResidents.map(
      (residentId) => properties[residentId]
    );

    // Update the state with the filtered residents
    setProperties(filteredResidentsArray);

    console.log(
      filteredResidentsArray,
      "Filtered Residents:",
      filteredResidents
    );
  }
};

  console.log(properties);

  return (
    <div>
      <Header />
      <div className="container" style={container}>
        <div className="row mt-4 d-flex justify-content-between align-items-center pb-5">
          <div
            className="col-2 "
            style={{ textAlign: "left", color: "#566D90" }}
          >
            <Link
              to={"/stand_by_properties"}
              style={bluebtnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
            >
              Stand by Properties {">"} <img src={"Icon"} style={{}} alt="" />
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
              placeholder="Search Property ID"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
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
                color:"#566D90"
              }}
            >
              Property ID{" "}
            </span>
          </div>

          <div
            className="col-4"
            style={{ textAlign: "left", color: "#566D90" }}
          >
            <input
              type="text"
              style={InputDivStyle}
              placeholder="Property ID"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
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
              Create New Property
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-2 text-start">
            <span style={TotalPropStyle}>Total Properties: <span style={TotalPropNumStyle} >{Object.keys(properties).length}</span> </span>
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <PropertyCard icon={""} dataArray={properties}  handleDeleteProperty={handleDeleteProperty} handleStandByProperty={handleStandByProperty}/>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;

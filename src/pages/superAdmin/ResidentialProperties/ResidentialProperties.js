
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropIdCard from "../../../components/superAdmin/Prop ID Card/PropIdCard";



const SearchInputStyle = {
  border: "none",
  borderRadius: "30px",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  width: "424px",
  height: "31px",
};




const iconStyle = {
  position: "relative",
  marginRight: "-40px",
};

const TotalPropNumStyle = {
  fontFamily: "Raleway",
  fontSize: "18px",
  fontWeight: "600",
  color: "#535353"
}
const TotalPropStyle = {
  ...TotalPropNumStyle,
  fontWeight: "400",
  marginLeft: "5px"
}
const container = {
  // minWidth: "1200px"
  width: "1500px", minWidth: "1200px",

}


function ResidentialProperties() {


  const [ResidentialProperties, setResidentialProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("")

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://ot-technologies.com/super/getResidentialProperties`
        );
        // Update the state with the fetched properties
        setResidentialProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);



  const handleDeleteProperty = async (res_prop_id) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deleteResidentialProperty/${res_prop_id}`);

      // Update the state or perform other actions after a successful delete
      setResidentialProperties(response.data.properties || []);
      alert("property deleted successfully")
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
      const filteredResidents = Object.keys(ResidentialProperties).filter((residentId) =>
        ResidentialProperties[residentId].id
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => ResidentialProperties[residentId]
      );

      // Update the state with the filtered residents
      setResidentialProperties(filteredResidentsArray);

      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };


  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>

        <div className="container" style={container}>
          <div className="row mt-4 d-flex justify-content-center align-items-center pb-5">

            <div className="col-4 d-flex mt-5">
              {" "}
              <img src={searchIcon} style={iconStyle} alt="" />{" "}
              <Form.Control
                style={SearchInputStyle}
                id="SearchInput"
                size="lg"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search Property ID"
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-2 text-start">
              <span style={TotalPropStyle}>Total Properties: <span style={TotalPropNumStyle} >{Object.keys(ResidentialProperties).length}</span> </span>
            </div>
          </div>
          <hr className="" />
          <div className="row mt-5 ">
            <PropIdCard label={"Residential"} icon={""} setStatus={setStatus} dataArray={ResidentialProperties} handleDeleteProperty={handleDeleteProperty} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResidentialProperties;

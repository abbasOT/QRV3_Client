import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
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
 fontFamily:"Poppins",
 textDecoration:"none",
  color: "#727272",
  fontWeight: "500",
  border: "none",
};

const TotalPropStyle ={
    fontFamily:"Raleway",
  
     color: "#535353",
     fontWeight: "400",
}


const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};


function StandByProperties() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `${process.env.REACT_APP_URL1}/super/getStandbyProperties`
        );
        // Update the state with the fetched properties
        setProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };
  
    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);

  const handleDeleteStandByProperty = async (propertyId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`${process.env.REACT_APP_URL1}/super/deleteStandbyProperties/${propertyId}`);
  
      // Update the state or perform other actions after a successful delete
      setProperties(response.data.properties || []);
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
              to={"/add_property"}
              style={bluebtnStyle}
              type="button"
            //   className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
            >
              {"<"} Stand by Properties
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
              placeholder="Search Resident"
            />
          </div>
        </div>

        <div className="row ">
          <div className="col-2 text-start">
            <span style={TotalPropStyle}>Total Properties: {Object.keys(properties).length}</span>
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <PropertyCard icon={""} dataArray={properties} handleDeleteProperty={handleDeleteStandByProperty}/>
        </div>
      </div>
    </div>
  );
}

export default StandByProperties;

import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import { Box } from "@mui/material";
import PropertyCard from "../../../components/superAdmin/PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import axios from "axios";
import firebase from 'firebase/app';
import 'firebase/database';
import { getDatabase, ref, onValue, get, push, remove } from "firebase/database";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { app } from "../../../firebase"
import { Divider } from "@mui/material";
import PropertyCardStandBy from "../../../components/superAdmin/PropertyCardStandBy/PropertyCardStandBy";
import StandByDeletedCard from "../../../components/superAdmin/StandByDeletedCard/StandByDeletedCard";

function StandByProperties() {

  const [properties, setProperties] = useState([]);
  const [deletedProperties, setDeletedProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState('totalProperties');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `/superadminit38XGIc27Q8HDXoZwe1OzI900u1/StandByProperties`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        console.log(data)
        setProperties(data)
      }
      else {
        setProperties([])
      }
    });
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const deletedPropertiesRef = ref(database, `/deletedProperty`);

    onValue(deletedPropertiesRef, (snapshot) => {
      const data = snapshot.val();
      const properties = [];

      if (data) {
        Object.keys(data).forEach((propertyId) => {
          const propertyData = data[propertyId];

          let ownerData = null;

          // Check for "Property Owner" node with an additional child ID
          if (propertyData["Property Owner"]) {
            const ownerKeys = Object.keys(propertyData["Property Owner"]);

            if (ownerKeys.length > 0) {
              // Access the inner ID inside the "Property Owner" node
              const innerId = ownerKeys[0];
              const innerData = propertyData["Property Owner"][innerId];

              ownerData = {
                id: propertyId,
                email: innerData.email || null,
                date: innerData.date || null
              };
            }
          }
          // Handle "commercialAdmin" node directly
          else if (propertyData["commercialAdmin"]) {
            ownerData = {
              id: propertyId,
              email: propertyData["commercialAdmin"].email || null,
              date: propertyData["commercialAdmin"].date || null
            };
          }

          if (ownerData) {
            properties.push(ownerData);
          }
        });

        setDeletedProperties(properties);
        console.log(properties, "The deleted properties are...");
      } else {
        setDeletedProperties([]);
      }
    });
  }, []);






  const handleDeleteStandByProperty = async (propertyId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deleteStandbyProperties/${propertyId}`);

      // Update the state or perform other actions after a successful delete
      // setProperties(response.data.properties || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };


  const handleDeleteDeletedProperty = async (propertyId) => {
    const database = getDatabase();
    const propertyRef = ref(database, `/deletedProperty/${propertyId}`);

    try {
      // Delete the property node from Firebase
      await remove(propertyRef);

      console.log(`Property with ID ${propertyId} deleted successfully`);

      // Optionally, update the state or perform other actions after a successful delete
      // setProperties((prevProperties) => prevProperties.filter(prop => prop.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };


  const [originalProperties, setOriginalProperties] = useState(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const [originalDeletedProperties, setOriginalDeletedProperties] = useState(deletedProperties);
  const [filteredDeletedProperties, setFilteredDeletedProperties] = useState(deletedProperties);

  // const handleSearchInputChange = (e) => {
  //   const inputValue = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
  //   setSearchInput(inputValue);

  //   if (inputValue === "") {
  //     // Reset to the original properties if input is empty
  //     setFilteredProperties(originalProperties);
  //   } else {
  //     const newFilteredProperties = Object.keys(originalProperties).reduce((acc, propertyId) => {
  //       // Check if the propertyId includes the search input
  //       if (propertyId.toLowerCase().includes(inputValue)) {
  //         acc[propertyId] = originalProperties[propertyId];
  //       }
  //       return acc;
  //     }, {});

  //     setFilteredProperties(newFilteredProperties); // Update the state with filtered properties
  //   }
  // };

  // // Whenever properties are updated, make sure to update both states
  // useEffect(() => {
  //   setOriginalProperties(properties);
  //   setFilteredProperties(properties);
  // }, [properties]);






  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Case-insensitive search
    setSearchInput(inputValue);

    if (activeTab === 'totalProperties') {
      // Filtering for Total PCBs
      if (inputValue === "") {
        setFilteredProperties(originalProperties); // Reset to original if input is empty
      } else {
        const newFilteredProperties = Object.keys(originalProperties).reduce((acc, propertyId) => {
          // Check if the propertyId includes the search input
          if (propertyId.toLowerCase().includes(inputValue)) {
            acc[propertyId] = originalProperties[propertyId];
          }
          return acc;
        }, {});
        setFilteredProperties(newFilteredProperties); // Update state with filtered PCBs
      }
    } else if (activeTab === 'deleted') {
      // Filtering for Deleted PCBs
      if (inputValue === "") {
        setFilteredDeletedProperties(originalDeletedProperties); // Reset to original if input is empty
      } else {
        const newFilteredDeletedProperties = originalDeletedProperties.filter((pcb) =>
          pcb.id.toLowerCase().includes(inputValue)
        );
        setFilteredDeletedProperties(newFilteredDeletedProperties); // Update state with filtered deleted PCBs
      }
    }
  };

  // Update states whenever the PCBs or deleted PCBs data changes
  useEffect(() => {
    setOriginalProperties(properties);
    setFilteredProperties(properties);

    setOriginalDeletedProperties(deletedProperties);
    setFilteredDeletedProperties(deletedProperties);
  }, [properties, deletedProperties]);



  const totalProperties = Object.keys(properties)?.length + deletedProperties?.length

  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>

        <div style={container}>
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
                <KeyboardArrowLeftIcon sx={{ width: 18, mt: "-0.1rem", marginRight: "0.5rem", marginLeft: "-0.5rem" }} />
                Stand by Properties

              </Link>
            </div>
          </div>

          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 3 }}>
            <div className="alingItems-center d-flex">
              {" "}
              <img src={searchIcon} style={iconStyle} alt="" />{" "}
              <Form.Control
                style={SearchInputStyle}
                id="SearchInput"
                // size="lg"
                type="text"
                placeholder="Search Property ID"
                value={searchInput}
                onChange={handleSearchInputChange}

              />
            </div>
          </Box>

          {/* 
        <div className="row ">
          <div className="col-2 text-start">
            <span style={TotalPropStyle}>Total Properties: {Object.keys(properties).length}</span>
          </div>
        </div> */}

          {/* <div className="row mt-5">
            <div className="col-2 text-start">
              <span style={TotalPropStyle}>Total Properties: <span style={TotalPropNumStyle} >{Object.keys(properties).length}</span> </span>
            </div>
          </div> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1.7rem", width: "100%" }}>

            <Box sx={{ display: "flex", gap: "0.5rem", flexDirection: "column", alignItems: "left" }}>
              <div onClick={() => handleTabClick('totalProperties')} style={{ cursor: 'pointer' }}>
                <span style={TotalPropStyle}>
                  Total Properties: <span style={TotalPropNumStyle}>{totalProperties || 0}</span>
                </span>
              </div>
              <div onClick={() => handleTabClick('deleted')} style={{ cursor: 'pointer' }}>
                <span style={{ ...TotalPropStyle, color: "#C24E42" }}>
                  Deleted: <span style={{ ...TotalPropNumStyle, fontWeight: 700, color: "#C24E42", marginLeft: "3rem" }}>{deletedProperties?.length || 0}</span>
                </span>
              </div>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: "column", position: "relative" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                {activeTab === 'totalProperties' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", right: -10, top: -20 }} />}
                {activeTab === 'deleted' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", right: -10, top: 12 }} />}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />


          <div className="row mt-5 d-flex justify-content-center align-items-center" >
            {activeTab === 'totalProperties' &&
              <>
                <PropertyCardStandBy icon={""} dataArray={filteredProperties} handleDeleteProperty={handleDeleteStandByProperty} />
                <StandByDeletedCard status={"both"} arrayName={"properties"} dataArray={deletedProperties} handleDeleteDeletedProperty={handleDeleteDeletedProperty} />
              </>
            }
            {activeTab === 'deleted' &&
              <StandByDeletedCard status={"properties"} arrayName={"properties"} dataArray={filteredDeletedProperties} handleDeleteDeletedProperty={handleDeleteDeletedProperty} />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default StandByProperties;




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
  fontFamily: "Poppins",
  textDecoration: "none",
  color: "#727272",
  fontWeight: "500",
  border: "none",
};




const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};

const container = {
  // minWidth: "1200px"
  padding: "1rem 2rem",
  width: "1620px", minWidth: "1200px",

}

const TotalPropStyle = {
  fontFamily: "Poppins",
  color: "#8E8E8E",
  fontSize: "0.8rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: 400,
}

const TotalPropNumStyle = {
  ...TotalPropStyle,
  fontSize: "0.9rem",
  fontWeight: 700,
}


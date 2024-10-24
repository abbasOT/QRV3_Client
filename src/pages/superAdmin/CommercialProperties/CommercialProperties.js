import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import PropIdCard from "../../../components/superAdmin/Prop ID Card/PropIdCard";
import axios from "axios";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import { app } from "../../../firebase"
import { Divider, Box } from "@mui/material";

const SearchInputStyle = {
  border: "none",
  borderRadius: "30px",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  minWidth: "424px",
  height: "31px",
};

// const TotalPropStyle ={
//     fontFamily:"Raleway",

//      color: "#535353",
//      fontWeight: "400",
// }


const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};



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
  fontWeight: 700,
  fontSize: "1rem"
}
const container = {
  margin: "1rem 2rem",
  width: "1500px", minWidth: "1200px",
}


function CommercialProperties() {

  const [CommercialProperties, setCommercialProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState('totalProperties');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `commercial`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        console.log(data)
        const filteredProperties = filterProperties("commercial", data);
        setCommercialProperties(filteredProperties)

      }
    });
  }, []);

  function filterProperties(prefix, properties) {

    return Object.entries(properties || {})
      .filter(([key, value]) => key.startsWith(prefix) && value.status !== "deleted")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }

  // useEffect(() => {
  //   // Function to fetch properties
  //   const fetchProperties = async () => {
  //     try {
  //       // Make a GET request to get properties
  //       const response = await axios.get(
  //         `https://ot-technologies.com/super/getCommercialProperties`
  //       );
  //       // Update the state with the fetched properties
  //       setCommercialProperties(response.data.properties || []);
  //     } catch (error) {
  //       console.error("Error fetching properties:", error.message);
  //     }
  //   };

  //   // Call the function to fetch properties when the component mounts
  //   fetchProperties();
  // }, []);



  const handleDeleteProperty = async (com_prop_id) => {
    console.log(com_prop_id)
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deleteCommercialProperty/${com_prop_id}`);

      // Update the state or perform other actions after a successful delete
      setCommercialProperties(response.data.properties || []);
      alert("property deleted successfully")
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };


  const filteredData = () => {
    // Convert commercialProperties to an array of property objects
    let filtered = Object.values(CommercialProperties);

    if (activeTab === "withoutId") {
      filtered = filtered.filter((property) => !property.propertyId);
    }

    // Apply search filter if searchInput is not empty
    if (searchInput) {
      filtered = filtered.filter((property) =>
        property.propertyId && property.propertyId.toLowerCase().includes(searchInput)
      );
    }

    return filtered;
  };



  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    setSearchInput(inputValue);

  }

  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <div style={container}>
          <div className="row mt-4 d-flex justify-content-center align-items-center pb-5">

            <div className="col-3 d-flex mt-5">
              {" "}
              <img src={searchIcon} style={iconStyle} alt="" />{" "}
              <Form.Control
                style={SearchInputStyle}
                id="SearchInput"
                // size="lg"
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search Property ID"

              />
            </div>
          </div>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1.7rem", width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: "column", position: "relative" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                {activeTab === 'totalProperties' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", left: -5, top: -20 }} />}
                {activeTab === 'withoutId' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", left: -5, top: 12 }} />}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "0.5rem", flexDirection: "column", alignItems: "left" }}>
              <div onClick={() => handleTabClick('totalProperties')} style={{ cursor: 'pointer' }}>
                <span style={TotalPropStyle}>
                  Total Properties: <span style={TotalPropNumStyle}>{Object.keys(CommercialProperties).length}</span>
                </span>
              </div>
              <div onClick={() => handleTabClick('withoutId')} style={{ cursor: 'pointer' }}>
                <span style={TotalPropStyle}>
                  Without ID: <span style={{ ...TotalPropNumStyle, color: "#446B54", marginLeft: "2rem" }}>{
                    Object.values(CommercialProperties).filter(
                      (property) => !property.propertyId
                    ).length
                  }</span>
                </span>
              </div>
            </Box>
          </Box>

          <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />

          <div className="row mt-5 d-flex justify-content-center align-items-center" >
            <PropIdCard icon={""} setCommercialProperties={setCommercialProperties}
              // dataArray={CommercialProperties}
              dataArray={filteredData()}
              handleDeleteProperty={handleDeleteProperty} />
          </div>


        </div>


      </div>
    </>
  );
}

export default CommercialProperties;

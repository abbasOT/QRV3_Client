import React, { useState, useEffect } from "react";
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import { Button, Card, Form, Modal } from "react-bootstrap";
import PropertyCard from "../../../components/superAdmin/PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import { Divider, Box, Grid } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const SearchInputStyle = {
  border: "none",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  // width: "424px",
  // height: "31px",
};
const bluebtnStyle = {
  minWidth: "340px",
  // maxWidth: "450px",

  width: "100%",
  height: "32px",
  gap: "0.2rem",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2A3649",
  color: "",
  fontWeight: "500",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const bluesmallbtnStyle = {
  minWidth: "200px",
  height: "32px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#2A3649",
  color: "",
  fontWeight: "500",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.2)"
};

const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};

const InputDivStyle = {
  borderRadius: "8px",
  width: "100%",
  height: "37px",
  border: "none",
  backgroundColor: "#D9D9D9",
  marginLeft: "-15%",
};
const TotalPropStyle = {
  fontFamily: "Raleway",
  fontSize: "0.8rem",
  fontWeight: 400,
  color: "#8E8E8E"
}
const TotalPropNumStyle = {
  ...TotalPropStyle,
  fontWeight: 700,
  paddingLeft: "0.7rem",
  fontSize: "1rem"
}

const container = {
  // minWidth:"1200px"

  width: "1620px", minWidth: "1200px",
  padding: "1rem 2rem"
}

function AddProperty() {
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);
  const [properties2, setProperties2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `/superadminit38XGIc27Q8HDXoZwe1OzI900u1/Properties`);
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

  // useEffect(() => {
  //   // Function to fetch properties
  //   const fetchProperties = async () => {
  //     try {
  //       // Make a GET request to get properties
  //       const response = await axios.get(
  //         `https://ot-technologies.com/super/getProperties`
  //       );
  //       // Update the state with the fetched properties
  //       setProperties(response.data.properties || []);
  //       setProperties2(response.data.properties || [])
  //     } catch (error) {
  //       console.error("Error fetching properties:", error.message);
  //     }
  //   };

  //   fetchProperties();
  // }, []);

  const handleSubmit = () => {
    // Your logic for handling form submission
    if (propertyId === "") {
      alert("please enter propertyId")
      return
    }
    console.log("Form submitted:", propertyId);
    // Call your API endpoint here using axios or fetch
    // Example:
    axios
      .post(`https://ot-technologies.com/super/createProperty`, { propertyId })
      .then((response) => {
        console.log("API call successful:", response.data.properties);
        // setProperties(response.data.properties || []);
        setPropertyId("")
      })
      .catch((error) => {
        console.error("API call failed:", error.message);
        alert(error.response.data.error)
      });
  };


  const handleDeleteProperty = async (propertyId) => {
    if (!propertyId) {
      alert("propertyId is not valid")
      return
    }



    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deleteProperty/${propertyId}`);

      // Update the state or perform other actions after a successful delete
      // setProperties(response.data.properties);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }

  };

  const handleStandByProperty = async (propertyId) => {
    if (!propertyId) {
      alert("propertyId is not valid")
      return
    }
    setIsDisabled(true); // Disable the button
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.put(`https://ot-technologies.com/super/updateProperty/${propertyId}`);

      // Update the state or perform other actions after a successful delete
      // setProperties(response.data.properties || []);

      alert("property moved to stand by successfully")

    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
    finally {
      setIsDisabled(false); // Re-enable the button after the API call completes
    }
  };

  const [originalProperties, setOriginalProperties] = useState(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    setSearchInput(inputValue);

    if (inputValue === "") {
      // Reset to the original properties if input is empty
      setFilteredProperties(originalProperties);
    } else {
      const newFilteredProperties = Object.keys(originalProperties).reduce((acc, propertyId) => {
        // Check if the propertyId includes the search input
        if (propertyId?.toLowerCase().includes(inputValue)) {
          acc[propertyId] = originalProperties[propertyId];
        }
        return acc;
      }, {});

      setFilteredProperties(newFilteredProperties); // Update the state with filtered properties
    }
  };

  useEffect(() => {
    setOriginalProperties(properties);
    setFilteredProperties(properties);
  }, [properties]);

  console.log(properties);

  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <div style={container}>
          <div className="row mt-4 d-flex justify-content-between align-items-center pb-5" style={{ paddingLeft: "1rem" }}>
            <Box
              className="col-3 d-flex"
              sx={{ color: "#566D90", }}
            >
              <Link
                to={"/stand_by_properties"}
                style={bluebtnStyle}
                type="button"
                className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
              >
                Stand by Properties   <KeyboardArrowRightIcon sx={{ width: 18, mt: 0.3 }} />
              </Link>
            </Box>
            <div className="col-4 d-flex">
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
          </div>
          <div className="d-flex col-11 justify-content-center mt-5 pb-5">
            <div className="col-3" style={{
              marginTop: "auto",
              marginBottom: "auto",
            }}>
              <span
                style={{
                  fontFamily: "Raleway",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#566D90",
                }}
              >
                Property ID{" "}
              </span>
            </div>

            <div
              className="col-3"
              style={{ color: "#566D90", display: "flex", justifyContent: "center" }}
            >
              <input
                type="text"

                style={InputDivStyle}
                maxLength={10}
                value={propertyId}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[\/\s\[\]]/g, '');
                  setPropertyId(sanitizedValue);

                }}
              />
            </div>

            <Box
              className="col-3"
              sx={{ color: "#566D90", display: "flex", justifyContent: { xl: "center", sm: "center" } }}
            >
              <button
                style={bluesmallbtnStyle}
                type="button"
                className="btn btn-primary "
                onClick={handleSubmit}
              >
                Create New Property
              </button>
            </Box>
          </div>

          <div className="row mt-5">
            <div className="col-2 text-start">
              <span style={TotalPropStyle}>Total Properties: <span style={TotalPropNumStyle} >{Object.keys(properties).length}</span> </span>
            </div>
          </div>
          <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />

          <div className="row mt-5 d-flex justify-content-center align-items-center" >
            <PropertyCard icon={""} dataArray={filteredProperties} handleDeleteProperty={handleDeleteProperty} handleStandByProperty={handleStandByProperty} isDisabled={isDisabled} />
          </div>

        </div>
      </div >
    </>
  );
}

export default AddProperty;

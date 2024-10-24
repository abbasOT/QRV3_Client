import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import PropertyCard from "../../../components/superAdmin/PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import PcbCard from "../../../components/superAdmin/PCB Card/PcbCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { app } from "../../../firebase"
import { Divider, Box } from "@mui/material";



function PCB() {
  const [PCBs, setPCBs] = useState([]);
  const [PCBs2, setPCBs2] = useState([]);
  const [pcbId, setPCBId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `superadminit38XGIc27Q8HDXoZwe1OzI900u1/PCBs`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        console.log(data)
        setPCBs(data)
      }
      else {
        setPCBs([])
      }
    });
  }, [pcbId]);

  // useEffect(() => {
  //   // Function to fetch properties
  //   const fetchProperties = async () => {
  //     try {
  //       // Make a GET request to get properties
  //       const response = await axios.get(
  //         `https://ot-technologies.com/super/getPCBs`
  //       );
  //       // Update the state with the fetched properties
  //       setPCBs(response.data.pcbs || []);
  //       setPCBs2(response.data.pcbs || []);
  //     } catch (error) {
  //       console.error("Error fetching properties:", error.message);
  //     }
  //   };

  //   // Call the function to fetch properties when the component mounts
  //   fetchProperties();
  // }, []);

  const handleSubmit = async () => {
    if (pcbId === "") {
      alert("please enter pcbId");
      return;
    }
    console.log("Form submitted:", pcbId);
    try {
      // Call your API endpoint here using axios or fetch
      const response = await axios.post(`https://ot-technologies.com/super/createPCB`, { pcbId });
      console.log("API call successful:", response.data.pcbs);
      // setPCBs(response.data.pcbs);
      setPCBId("")
    } catch (error) {
      console.log("API call failed:", error);
      // Extract the error message
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "An unexpected error occurred";

      // Show the error message in an alert
      alert(errorMessage);
    }
  };



  const handleDeletePCB = async (pcbId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deletePCB/${pcbId}`);

      // Update the state or perform other actions after a successful delete
      // setPCBs(response.data.pcbs || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const handleUpdatePCB = async (pcbId) => {
    if (!pcbId) {
      alert("pcbId is not valid");
      return;
    }
    setIsDisabled(true); // Disable the button

    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.put(`https://ot-technologies.com/super/updatePCB/${pcbId}`);

      // Update the state or perform other actions after a successful delete
      // setPCBs(response.data.pcbs || []);
      alert("pcb moved to stand by successfully")
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
    finally {
      setIsDisabled(false); // Re-enable the button after the API call completes
    }
  };

  const [originalPcbs, setOriginalPcbs] = useState(PCBs);
  const [filteredPcbs, setFilteredPcbs] = useState(PCBs);

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    setSearchInput(inputValue);

    if (inputValue === "") {
      // Reset to the original properties if input is empty
      setFilteredPcbs(originalPcbs);
    } else {
      const newFilteredPcbs = Object.keys(originalPcbs).reduce((acc, pcbId) => {
        // Check if the propertyId includes the search input
        if (pcbId.toLowerCase().includes(inputValue)) {
          acc[pcbId] = originalPcbs[pcbId];
        }
        return acc;
      }, {});

      setFilteredPcbs(newFilteredPcbs); // Update the state with filtered properties
    }
  };

  // Whenever properties are updated, make sure to update both states
  useEffect(() => {
    setOriginalPcbs(PCBs);
    setFilteredPcbs(PCBs);
  }, [PCBs]);




  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>

        <div style={container}>
          <div className="row mt-4 d-flex justify-content-between align-items-center pb-5" style={{ paddingLeft: "1rem" }}>
            <div
              className="col-3 d-flex"
              style={{ color: "#566D90" }}
            >
              <Link
                to={"/stand_by_pcb"}
                style={bluebtnStyle}
                type="button"
                className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
              >
                Stand by PCBs    <KeyboardArrowRightIcon sx={{ width: 18, mt: 0.3 }} />
              </Link>
            </div>
            <div className="col-4 d-flex">
              {" "}
              <img src={searchIcon} style={iconStyle} alt="" />{" "}
              <Form.Control
                style={SearchInputStyle}
                id="SearchInput"
                // size="lg"
                type="text"
                onChange={handleSearchInputChange}
                placeholder="Search PCB"

              />
            </div>
          </div>
          <div className="d-flex col-11 justify-content-center mt-5 pb-5">
            <div className="col-3">
              <span
                style={{
                  fontFamily: "Raleway",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#566D90",
                }}
              >
                PCB ID
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
                value={pcbId}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[\/\s\[\]]/g, '');
                  setPCBId(sanitizedValue);
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
                Add PCB ID
              </button>
            </Box>
          </div>

          <div className="row mt-3">
            <div className="col-2 text-start">
              <span style={TotalPropStyle}>Total PCBs: <span style={TotalPropNumStyle} >{Object.keys(PCBs).length}</span> </span>
            </div>
          </div>
          <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />

          <div className="row mt-5 d-flex justify-content-center align-items-center" >
            <PcbCard dataArray={filteredPcbs} handleDeletePCB={handleDeletePCB} handleUpdatePCB={handleUpdatePCB} isDisabled={isDisabled} />
          </div>

        </div>
      </div>
    </>
  );
}

export default PCB;


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
  width: "200px",
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
  marginRight: "-40px",
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
  paddingLeft: "0.95rem",
  fontSize: "1rem"
}

const container = {
  // minWidth: "1200px"
  padding: "1rem 2rem",
  width: "1620px", minWidth: "1200px",

}
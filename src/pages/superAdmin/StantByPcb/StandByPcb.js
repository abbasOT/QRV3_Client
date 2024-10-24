
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import StandByPcbCard from "../../../components/superAdmin/StandByPcbCard/StandByPcbCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, onValue, get, push, remove } from "firebase/database";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { app } from "../../../firebase"
import { Divider } from "@mui/material";
import StandByDeletedCard from "../../../components/superAdmin/StandByDeletedCard/StandByDeletedCard";


function StandByPcb() {

  const [PCBs, setPCBs] = useState([]);
  const [PCBs2, setPCBs2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [pcbId, setPCBId] = useState("");
  const [deletedPcbs, setDeletedPcbs] = useState([]);
  const [activeTab, setActiveTab] = useState('totalPcbs');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const userDevicesRef = ref(database, `superadminit38XGIc27Q8HDXoZwe1OzI900u1/PCBs`);
  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `superadminit38XGIc27Q8HDXoZwe1OzI900u1/StandByPCBs`);
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
  }, []);





  useEffect(() => {
    const database = getDatabase();
    const deletedPropertiesRef = ref(database, `/deletedPCB`);

    onValue(deletedPropertiesRef, (snapshot) => {
      const data = snapshot.val();
      const pcbs = [];

      if (data) {
        Object.keys(data).forEach((pcbId) => {
          const pcbData = data[pcbId];

          // Extract pcbId, propertyId, and createdAt
          const propertyId = pcbData?.propertyId || null;
          const date = pcbData?.createdAt || null;

          // Push the object with pcbId, propertyId, and createdAt into the array
          pcbs.push({
            pcbId, // The parent node (pcbId itself)
            propertyId, // The propertyId inside the pcbId node
            date, // The createdAt inside the pcbId node
          });
        });

        // Set the state with the extracted data
        setDeletedPcbs(pcbs);
        console.log(pcbs, "The deleted pcbs are...");
      } else {
        setDeletedPcbs([]);
      }
    });
  }, []);





  const handleDeletePCB = async (pcbId) => {
    try {
      // Make a DELETE request to super/deleteProperty with the propertyId
      const response = await axios.delete(`https://ot-technologies.com/super/deleteStandbyPCB/${pcbId}`);

      // Update the state or perform other actions after a successful delete
      // setPCBs(response.data.pcbs || []);
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const handleDeleteDeletedPcb = async (pcbId) => {
    const database = getDatabase();
    const pcbRef = ref(database, `/deletedPCB/${pcbId}`);
    const pcbRef2 = ref(database, `/PCB/${pcbId}`);

    try {
      // Delete the /deletedPCB node from Firebase
      await remove(pcbRef);
      console.log(`Pcb with ID ${pcbId} deleted from /deletedPCB successfully`);

      // Delete the /PCB node (if exists)
      await remove(pcbRef2);
      console.log(`Pcb with ID ${pcbId} deleted from /PCB successfully`);

      // Optionally, update the state or perform other actions after a successful delete
      // setProperties((prevProperties) => prevProperties.filter(prop => prop.id !== pcbId));
    } catch (error) {
      console.error('Error deleting pcb:', error.message);
    }
  };



  // State for filtered PCBs and deleted PCBs
  const [originalPcbs, setOriginalPcbs] = useState(PCBs);
  const [filteredPcbs, setFilteredPcbs] = useState(PCBs);

  const [originalDeletedPcbs, setOriginalDeletedPcbs] = useState(deletedPcbs);
  const [filteredDeletedPcbs, setFilteredDeletedPcbs] = useState(deletedPcbs);

  // Handle search input change for both active and deleted PCBs
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Case-insensitive search
    setSearchInput(inputValue);

    if (activeTab === 'totalPcbs') {
      // Filtering for Total PCBs
      if (inputValue === "") {
        setFilteredPcbs(originalPcbs); // Reset to original if input is empty
      } else {
        const newFilteredPcbs = Object.keys(originalPcbs).reduce((acc, pcbId) => {
          if (pcbId.toLowerCase().includes(inputValue)) {
            acc[pcbId] = originalPcbs[pcbId];
          }
          return acc;
        }, {});
        setFilteredPcbs(newFilteredPcbs); // Update state with filtered PCBs
      }
    } else if (activeTab === 'deleted') {
      // Filtering for Deleted PCBs
      if (inputValue === "") {
        setFilteredDeletedPcbs(originalDeletedPcbs); // Reset to original if input is empty
      } else {
        const newFilteredDeletedPcbs = originalDeletedPcbs.filter((pcb) =>
          pcb.pcbId.toLowerCase().includes(inputValue)
        );
        setFilteredDeletedPcbs(newFilteredDeletedPcbs); // Update state with filtered deleted PCBs
      }
    }
  };

  // Update states whenever the PCBs or deleted PCBs data changes
  useEffect(() => {
    setOriginalPcbs(PCBs);
    setFilteredPcbs(PCBs);

    setOriginalDeletedPcbs(deletedPcbs);
    setFilteredDeletedPcbs(deletedPcbs);
  }, [PCBs, deletedPcbs]);


  const totalPcbs = Object.keys(PCBs)?.length + deletedPcbs?.length


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
                to={"/pcb"}
                style={bluebtnStyle}
                type="button"
              //   className="btn btn-primary shadow-sm"
              // onClick={handleSubmit}
              >
                <KeyboardArrowLeftIcon sx={{ width: 18, mt: "-0.1rem", marginRight: "0.5rem", marginLeft: "-0.5rem" }} />
                Stand by PCBs

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
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}

              />
            </div>
          </Box>

          {/* <div className="row mt-5">
            <div className="col-2 text-start">
              <span style={TotalPropStyle}>Total PCBs: <span style={TotalPropNumStyle} >{Object.keys(PCBs).length}</span> </span>
            </div>
          </div> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1.7rem", width: "100%" }}>

            <Box sx={{ display: "flex", gap: "0.5rem", flexDirection: "column", alignItems: "left" }}>
              <div onClick={() => handleTabClick('totalPcbs')} style={{ cursor: 'pointer' }}>
                <span style={TotalPropStyle}>
                  Total PCBs: <span style={TotalPropNumStyle}>{totalPcbs || 0}</span>
                </span>
              </div>
              <div onClick={() => handleTabClick('deleted')} style={{ cursor: 'pointer' }}>
                <span style={{ ...TotalPropStyle, color: "#C24E42" }}>
                  Deleted: <span style={{ ...TotalPropNumStyle, fontWeight: 700, color: "#C24E42", marginLeft: "1rem" }}>{deletedPcbs?.length || 0}</span>
                </span>
              </div>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: "column", position: "relative" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                {activeTab === 'totalPcbs' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", right: -10, top: -20 }} />}
                {activeTab === 'deleted' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", right: -10, top: 12 }} />}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />


          <div className="row mt-5 d-flex justify-content-center align-items-center" >

            {activeTab === 'totalPcbs' &&
              <>
                <StandByPcbCard dataArray={filteredPcbs} handleDeletePCB={handleDeletePCB} />
                <StandByDeletedCard status={"both"} arrayName={"pcbs"} dataArray={deletedPcbs} handleDeleteDeletedProperty={handleDeleteDeletedPcb} />
              </>
            }
            {activeTab === 'deleted' &&
              <StandByDeletedCard status={"pcbs"} arrayName={"pcbs"} dataArray={filteredDeletedPcbs} handleDeleteDeletedProperty={handleDeleteDeletedPcb} />
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default StandByPcb;



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
  minWidth: "424px",
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
  width: "1620px", minWidth: "1200px",

  padding: "1rem 2rem"
}


const TotalPropStyle = {
  fontFamily: "Raleway",
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
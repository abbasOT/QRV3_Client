import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import PropIdCard from "../../../components/superAdmin/Prop ID Card/PropIdCard";
import axios from "axios";

const SearchInputStyle = {
  border: "none",
  borderRadius:"30px",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  width: "424px",
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


const TotalPropNumStyle ={
  fontFamily: "Raleway",
  fontSize: "18px",
  fontWeight: "600",
  color:"#535353"
}
const  TotalPropStyle ={
...TotalPropNumStyle,
  fontWeight: "400",
marginLeft:"5px"
}
const container ={
  minWidth:"1200px"
}


function CommercialProperties() {

  const [CommercialProperties, setCommercialProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status,setStatus] =useState("")

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `${process.env.REACT_APP_URL1}/super/getCommercialProperties`
        );
        // Update the state with the fetched properties
        setCommercialProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);


  
 const handleDeleteProperty = async (com_prop_id) => {
  try {
    // Make a DELETE request to super/deleteProperty with the propertyId
    const response = await axios.delete(`${process.env.REACT_APP_URL1}/super/deleteCommercialProperty/${com_prop_id}`);

    // Update the state or perform other actions after a successful delete
    setCommercialProperties(response.data.properties || []);
  } catch (error) {
    console.error('Error deleting property:', error.message);
  }
};

console.log(status)
const updateStatus = (value) => {
  
  if(value ==="online"){
    console.log(value)
  }
};


const handleSearchInputChange = (e) => {
  setSearchInput(e.target.value);
};


const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    // Perform search logic here, for example, filter residents based on searchInput
    const filteredResidents = Object.keys(CommercialProperties).filter((residentId) =>
    CommercialProperties[residentId].id
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );

    const filteredResidentsArray = filteredResidents.map(
      (residentId) => CommercialProperties[residentId]
    );

    // Update the state with the filtered residents
    setCommercialProperties(filteredResidentsArray);

    console.log(
      filteredResidentsArray,
      "Filtered Residents:",
      filteredResidents
    );
  }
};

  return (
    <div>
      <Header />
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
          <span style={TotalPropStyle}>Total Properties: <span style={TotalPropNumStyle} >{Object.keys(CommercialProperties).length}</span> </span>
            {/* <span style={TotalPropStyle}>Total Properties: 3</span> */}
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <PropIdCard icon={""} status={status} setStatus={setStatus} dataArray={CommercialProperties} handleDeleteProperty={handleDeleteProperty} updateStatus={updateStatus}/>
        </div>
      </div>

      
    </div>
  );
}

export default CommercialProperties;

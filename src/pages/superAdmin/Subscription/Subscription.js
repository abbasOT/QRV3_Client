import Header from "../../../components/superAdmin/Header/Header";
import { Link } from "react-router-dom";
import SubscriptionCard from "../../../components/superAdmin/SubscriptionDetailCard/SubscriptionCard";
import SubscriptionTable from "../../../components/superAdmin/SubscriptionTable/SubscriptionTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
const row1Style = {
  borderRadius: "28px",
  border: "1px solid rgba(42, 54, 73, 0.21)",
};

const textStyle = {
  color: "#2A3649",
  fontFamily: "Raleway",
  fontSize: "17px",
  fontWeight: 600,
};
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
const container ={
  minWidth:"1200px"
}

function Suscription() {
  const [CommercialInactive, setCommercialInactive] = useState([0]);
  const [ResidentialInactive, setResidentialInactive] = useState([0]);
  const [CommercialTotalUsers, setCommercialTotalUsers] = useState([0]);
  const [ResidentialTotalUsers, setResidentialTotalUsers] = useState([0]);
  const [NonSubCount, setNonSubCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://localhost:8000/super/getsubscriptionData`
        );
        setUsers(response.data.users);
        setCommercialTotalUsers(response.data.comActive);
        setCommercialInactive(response.data.cominactiveCount);
        setResidentialTotalUsers(response.data.resActive);
        setResidentialInactive(response.data.residentialActiveCount);
        setNonSubCount(
          response.data.residentialActiveCount + response.data.cominactiveCount
        );
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform search logic here, for example, filter residents based on searchInput
      const filteredResidents = Object.keys(users).filter((residentId) =>
        users[residentId].email.toLowerCase().includes(searchInput.toLowerCase())
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => users[residentId]
      );

      // Update the state with the filtered residents
      setUsers(filteredResidentsArray);

      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="container" style={container}>
        <div
          style={row1Style}
          className="row mt-4 d-flex justify-content-between align-items-center pt-5 pb-5 mb-5 p-5"
        >
          <SubscriptionCard
            label={"Community Admins"}
            value={CommercialTotalUsers}
          />
          <SubscriptionCard
            label={"Residential Admins"}
            value={ResidentialTotalUsers}
          />
          <SubscriptionCard
            label={"Non subscriber"}
            value={CommercialInactive}
          />
        </div>

        <div className="row  mt-4 ">
          <div className="col-1 text-end" style={textStyle}>
            Details
          </div>
        </div>
        <div
          style={row1Style}
          className="row d-flex justify-content-around align-items-center pt-5 pb-5 mb-5 p-5"
        >
          <div className="col-4 d-flex mb-5"style={{marginLeft:"auto"}}>
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search by Email"
              onKeyPress={handleKeyPress}
            />
          </div>

          <SubscriptionTable data={users} />
        </div>
      </div>
    </div>
  );
}

export default Suscription;

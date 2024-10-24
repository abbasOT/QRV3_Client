import Header from "../../../components/superAdmin/Header/Header";
import { Link } from "react-router-dom";
import SubscriptionCard from "../../../components/superAdmin/SubscriptionDetailCard/SubscriptionCard";
import SubscriptionTable from "../../../components/superAdmin/SubscriptionTable/SubscriptionTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";

function Suscription() {
  const [CommercialInactive, setCommercialInactive] = useState([0]);
  const [ResidentialInactive, setResidentialInactive] = useState([0]);
  const [CommercialTotalUsers, setCommercialTotalUsers] = useState([0]);
  const [ResidentialTotalUsers, setResidentialTotalUsers] = useState([0]);
  const [NonSubCount, setNonSubCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [comUsers, setComUsers] = useState([]);
  const [resUsers, setResUsers] = useState([]);
  const [totalComUsers, setTotalComUsers] = useState(0);
  const [totalResUsers, setTotalResUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);

  console.log(users);
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      // Make a GET request to get properties ot-technologies.com 192.168.18.21
      const response = await axios.get(
        `https://ot-technologies.com/super/getsubscriptionData`
      );
      setUsers2(response.data.users)
      setUsers(response.data.users);
      setComUsers(response.data.comUsers);
      setResUsers(response.data.resUsers);
      setCommercialTotalUsers(response.data.comActive);
      setCommercialInactive(response.data.cominactiveCount);
      setResidentialTotalUsers(response.data.resActive);
      setResidentialInactive(response.data.residentialActiveCount);
      setTotalComUsers(response.data.totalComUsers);
      setTotalResUsers(response.data.totalResidentialUsers);
      setNonSubCount(
        response.data.nonSubcribers
      );
      console.log(
        response.data.residentialInactiveCount,
        response.data.cominactiveCount
      );
    } catch (error) {
      console.error("Error fetching properties:", error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const filteredResidents = Object.keys(users).filter((residentId) =>
        users[residentId].email
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => users[residentId]
      );

      // Update the state with the filtered residents
      setUsers(filteredResidentsArray);
      setComUsers(filteredResidentsArray);
      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // If the input value is empty, reset the users state to its original value
    if (inputValue.trim() === "") {
      setUsers(users2);

    }
  };

  const handleDeleteUser = async (userId, adminId, info, user) => {
    console.log(user)
    let property = "";
    if (info === "C") {
      property = "commercial";
    } else if (info === "R") {
      property = "residential";
    } else {
      property = "waiting"
    }

    try {
      // Assuming you're making a DELETE request 192.168.18.21
      await axios.delete(
        `https://ot-technologies.com/super/deleteSubUser/${userId}`,
        {
          data: { property, adminId },
        }
      );

      // Assuming fetchProperties is an asynchronous function
      await fetchProperties();
      console.log("User deleted successfully");
    } catch (error) {
      // Handle error
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container" style={container}>
        <div
          style={row1Style}
          className="row mt-4 d-flex justify-content-between align-items-center pt-5 pb-3 mb-5 p-5"
        >
          <SubscriptionCard label={"Community Users"} Users={comUsers} />
          <SubscriptionCard label={"Residential Users"} Users={resUsers} />
          <SubscriptionCard
            label={"Non subscriber"}
            // Users={NonSubCount}
            count={NonSubCount}
          />
        </div>

        <div className="row  mt-4 ">
          <div className="col-1 text-end" style={textStyle}>
            Details
          </div>
        </div>
        <div
          style={row2Style}
          className="row d-flex justify-content-around align-items-center pt-3 pb-5 px-5"
        >
          <div className="col-4 d-flex mb-5" style={{ marginLeft: "auto" }}>
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

          <SubscriptionTable
            handleDeleteUser={handleDeleteUser}
            data={users}
            comUsers={comUsers}
            resUsers={resUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default Suscription;



const row1Style = {
  borderRadius: "28px",
  border: "1px solid rgba(42, 54, 73, 0.21)",

};

const row2Style = {
  borderRadius: "28px",
  border: "1px solid rgba(42, 54, 73, 0.21)",
  maxHeight: "800px",
  overflowY: "auto"
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
const container = {
  minWidth: "1200px",
};

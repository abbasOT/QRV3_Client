import Header from "../../../components/Commercial/Header/Header";
import AddResidentIocn from "../../../assests/add_resident_icon.svg";
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import "../../../App.css";
import ResidentCard from "../../../components/Commercial/ResidentCard/ResidentCard";
import PersonIcon from "../../../assests/person_icon.svg";
import AddResidentIcon from "../../../assests/add_residen_icon.svg";
import React, { useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";
import AddResidentModal from "../../../components/Commercial/AddResidentModal/AddResidentModal";
import { useParams } from "react-router-dom";

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
};

const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};

function Residents() {
  const [showAddUserModal, setAddUserModal] = useState(false);
  const [username, setUserName] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [Residents, setResidents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    repeatEmail: "",
    status: "active",
  });

  console.log(formData);
  const { id } = useParams();

  const handleOpenModal = () => {
    setAddUserModal(true);
    console.log(showAddUserModal);
  };
  let com_prop_id = localStorage.getItem("userKey");
  const handleSendInvitation = async () => {
    try {
      // Assuming formData contains the resident details
      const { name, lname, email, status } = formData;
      if (!name || !lname || !email || !status) {
        alert("Please fill in all required fields");
        return;
      }

      // Make a POST request to the backend endpoint
      const response = await axios.post(
        `http://localhost:8000/commercialAdmin/add_residents/${com_prop_id}`,
        {
          name,
          lname,
          email,
          status,
        }
      );

      console.log("API Response:", response.data);

      setResidents(response.data.residents);
      setAddUserModal(false);
      setFormData({
        ...formData,
        name: "",
        lname: "",
        email: "",
        repeatEmail: "",
      });
      // Handle the response or update state as needed
    } catch (error) {
      console.error("Error sending invitation:", error.message);
      // Handle errors or show an error message to the user
    }
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Make a GET request to fetch residents with the specified comPropId
        const response = await axios.get(
          `http://localhost:8000/commercialAdmin/get_residents/${com_prop_id}`
        );

        // Assuming the response contains a property 'residents' with an array of resident data
        setResidents(response.data.residents);
      } catch (error) {
        console.error("Error fetching residents:", error);
        // Handle error if needed
      }
    };

    fetchResidents();
  }, [com_prop_id]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };



const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    // Perform search logic here, for example, filter residents based on searchInput
    const filteredResidents = Object.keys(Residents).filter((residentId) =>
    Residents[residentId].name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const filteredResidentsArray = filteredResidents.map((residentId) => Residents[residentId]);

    // Update the state with the filtered residents
    setResidents(filteredResidentsArray);

 
    console.log( filteredResidentsArray,"Filtered Residents:", filteredResidents);
  }
};

  // console.log(id);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row mt-4 d-flex justify-content-between">
          <div
            className="col-2 "
            style={{ textAlign: "left", color: "#566D90" }}
          >
            {" "}
            <span>
              Total Residents{" "}
              <span style={{ fontWeight: "700" }}>
                {" "}
                {Object.keys(Residents).length}
              </span>{" "}
            </span>
          </div>
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              onClick={() => handleOpenModal()}
              className="btn btn-primary shadow-sm"
            >
              <img
                src={AddResidentIocn}
                style={{ marginRight: "5px" }}
                alt=""
              />{" "}
              Add Resident
            </button>
          </div>
        </div>
        <div className="row">
          <div
            className="col-3"
            style={{ textAlign: "left", color: "#566D90" }}
          >
            {" "}
            <span>
              Suspended Resident{" "}
              <span style={{ fontWeight: "700", color: "#DC5656" }}> 2</span>{" "}
            </span>
          </div>
          <div className="col-6 d-flex">
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              placeholder="Search Resident"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <hr className="mt-5" />
        <div className="row mt-5 justify-content-around">
          <ResidentCard icon={PersonIcon} dataArray={Residents} setResidents={setResidents} />
        </div>
      </div>

      <Modal
        size="lg"
        centered
        className="abc"
        show={showAddUserModal}
        style={{ width: "", height: "" }}
        onHide={() => setAddUserModal(false)}
      >
        <Modal.Title
          className="w-100 text-center pt-2"
          style={{
            alignItems: "center",
            height: "62px",
            backgroundColor: "#2A3649",
            color: "white",
          }}
        >
          <img style={{ marginRight: "30px" }} src={AddResidentIcon} alt="" />
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Open Sans",
              fontSize: "20px",
            }}
          ></span>
          {username}
        </Modal.Title>
        <Modal.Body>
          <AddResidentModal
            formData={formData}
            setFormData={setFormData}
            handleSendInvitation={handleSendInvitation}
            setResidents={setResidents}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Residents;

import Header from "../../../components/Commercial/Header/Header";
import AddResidentIocn from "../../../assests/add_resident_icon.svg";
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import "../../../App.css";
import ResidentCard from "../../../components/Commercial/ResidentCard/ResidentCard";
import PersonIcon from "../../../assests/person_icon.svg";
import AddResidentIcon from "../../../assests/add_residen_icon.svg";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import AddResidentModal from "../../../components/Commercial/AddResidentModal/AddResidentModal";
import { useParams } from "react-router-dom";
import BlockedModal from "../../../components/Commercial/BlockedAlertModal/BlockedModal";
import './resident.css'
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import { app } from "../../../firebase"

function Residents() {
  const navigate = useNavigate();

  const [showAddUserModal, setAddUserModal] = useState(false);
  const [showBlockModal, setBlockModal] = useState(false);
  const [username, setUserName] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [Residents, setResidents] = useState([]);
  const [status, setStatus] = useState("");
  const [Residents2, setResidents2] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    repeatEmail: "",
    status: "active",
  });


  const { id } = useParams();
  // `https://ot-technologies.com/commercialAdmin/get_residents/${com_prop_id}`
  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `commercial/users/${com_prop_id}/users`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        console.log(data)
        setResidents(data)

      }
    });
  }, []);

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
        `https://ot-technologies.com/commercialAdmin/add_residents/${com_prop_id}`,
        {
          name,
          lname,
          email,
          status,
        }
      );

      console.log("API Response:", response.data);

      // setResidents(response.data.residents);
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
      console.error("Error sending invitation:", error);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
      alert(error.response.data.error);
      // Handle errors or show an error message to the user
    }
  };

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Make a GET request to fetch residents with the specified comPropId
        const response = await axios.get(
          `https://ot-technologies.com/commercialAdmin/get_residents/${com_prop_id}`
        );

        setStatus(response.data.status)
        setResidents(response.data.residents);
        setResidents2(response.data.residents)
      } catch (error) {
        console.error("Error fetching residents:", error);
        if (error.response.data.login) {
          // alert(error.response.data.message);
          setBlockModal(true)
          // navigate("/login");
        }

      }
    };

    fetchResidents();
  }, [com_prop_id]);

  // const handleSearchInputChange = (e) => {
  //   setSearchInput(e.target.value);
  // };
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // If the input value is empty, reset the users state to its original value
    if (inputValue.trim() === "") {
      setResidents(Residents2);

    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform search logic here, for example, filter residents based on searchInput
      const filteredResidents = Object.keys(Residents).filter((residentId) =>
        Residents[residentId].firstName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => Residents[residentId]
      );

      // Update the state with the filtered residents
      setResidents(filteredResidentsArray);

      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };

  const suspendedResidentsCount = Residents
    ? Object.values(Residents).filter(resident => resident.status === 'suspended').length
    : 0;



  useEffect(() => {
    console.log(status)
    if (status === "inactive") {
      setBlockModal(true);
      // alert("Please wait")
    }

  }, [status]);
  const handleCloseModal = () => {
    setBlockModal(false);
    navigate('/login');
  };

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
                <span style={{ fontWeight: "700" }}>
                  {Residents && Residents.length > 0 ? (
                    <>0</>
                  ) : (
                    <>{Residents ? Object.keys(Residents).length : 0}</>
                  )}
                </span>
              </span>
            </span>
          </div>
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              onClick={() => handleOpenModal()}
              className="btn btn-primary "
            >
              <img
                src={AddResidentIocn}
                style={{ marginRight: "15px" }}
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
              <span style={{ fontWeight: "700", color: "#DC5656" }}>
                {suspendedResidentsCount}
              </span>{" "}
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
        <div className="row mt-5 ">
          <ResidentCard
            icon={PersonIcon}
            dataArray={Residents}
            setResidents={setResidents}
          />
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



      <Modal
        size=""
        centered
        className="abc"
        show={showBlockModal}
        dialogClassName="border-radius"
        // style={{ borderRadius: '45px' }}
        onHide={handleCloseModal}
      >

        <Modal.Body>
          <BlockedModal />
        </Modal.Body>
      </Modal>


    </div>
  );
}

export default Residents;



const btnStyle = {
  width: "180px",
  height: "36px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  color: "#2A3649",
  fontWeight: "700",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.2)"
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
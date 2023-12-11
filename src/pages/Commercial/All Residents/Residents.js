
import Header from "../../../components/Commercial/Header/Header";
import AddResidentIocn from "../../../assests/add_resident_icon.svg";
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import "../../../App.css";
import ResidentCard from '../../../components/Commercial/ResidentCard/ResidentCard'
import PersonIcon from '../../../assests/person_icon.svg';
import React, { useState } from "react";
import UserDetailModal from "../../../components/Commercial/UserDetailModal/UserDetail";
import { Dropdown, Modal, Button } from "react-bootstrap";
import UserDetailIcon from "../../../assests/user_detail_icon.svg";

import AddResidentModal from "../../../components/Commercial/AddResidentModal/AddResidentModal";

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
  paddingLeft:"50px"

};

const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};






function Residents() {

  const [showAddUserModal, setAddUserModal] = useState(false);
  const [username, setUserName] = useState();

  const dataArray = [
    { name: "Gabriela Acosta", id: 1 },
    { name: "John Doe", id: 2 },
    { name: "Alice Johnson", id: 3 },
    { name: "Bob Smith", id: 4 },
    { name: "Eva Williams", id: 5 },
    { name: "Michael Brown", id: 6 },
    { name: "Sophia Davis", id: 7 },
    { name: "Daniel Miller", id: 8 },
    { name: "Olivia Martinez", id: 9 },
    { name: "James Taylor", id: 10 },
    { name: "Emma Harris", id: 11 },
    { name: "William Jackson", id: 12 },
  ];

  const handleOpenModal = () => {
    setAddUserModal(true);
    console.log(showAddUserModal);
    
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
              Total Residents <span style={{ fontWeight: "700" }}> 12</span>{" "}
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
            />
          </div>
        </div>
        <hr className="mt-5" />
        <div className="row mt-5 justify-content-around">
        <ResidentCard icon={PersonIcon}  dataArray={dataArray}/>
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
          <img style={{ marginRight: "30px" }} src={UserDetailIcon} alt="" />
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
          <AddResidentModal />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Residents;

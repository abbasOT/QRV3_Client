
import Header from '../../../components/Commercial/Header/Header'
import searchIcon from "../../../assests/search_icon.svg";
import AddResidentIocn from "../../../assests/add_resident_icon.svg";
import Form from "react-bootstrap/Form";
import PinCodeCard from '../../../components/Commercial/PinCodeCard/PinCodeCard'
import PinCodeIcon from '../../../assests/pin_code.svg'
import React, { useState } from "react";
import AddPinCodeModal from '../../../components/Commercial/AddPinCodeModal/AddPinModal';
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeModalIcon from "../../../assests/pin_code_modal_icon.svg";

const iconStyle = {
    position: "relative",
    marginRight: "-40px", 
  };
  
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

  const dataArray = [
    { name: "FedEx", id: 1 },
    { name: "FedEx", id: 2 },
    { name: "FedEx", id: 3 },
    { name: "FedEx", id: 4 },
    { name: "FedEx", id: 5 },
    { name: "FedEx", id: 6 },
    { name: "FedEx", id: 7 },
    { name: "FedEx", id: 8 },
    { name: "FedEx", id: 9 },
    { name: "FedEx", id: 10 },
    { name: "FedEx", id: 11 },
    { name: "FedEx", id: 12 },
  ];



function PinCode() {

  const [showPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();

  const handleOpenModal = (item) => {
    setPinCodeModal(true);
    console.log(showPinCodeModal);
    setUserName(item.name);
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
            Total PIN Code <span style={{ fontWeight: "700" }}> 12</span>{" "}
            </span>
          </div>
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              onClick={handleOpenModal}
            >
              <img
                src={AddResidentIocn}
                style={{ marginRight: "5px" }}
                alt=""
              />{" "}
              Add PIN Code
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
         
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
        <PinCodeCard icon={PinCodeIcon}  dataArray={dataArray}/>
        </div>
      </div>

      <Modal
        
        centered
        className="abc"
        show={showPinCodeModal}
        style={{ width: "", height: "",marginLeft:"",marginRight:"auto" }}
        onHide={() => setPinCodeModal(false)}
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
          <img style={{ marginRight: "30px" }} src={PinCodeModalIcon} alt="" />
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
          <AddPinCodeModal />
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default PinCode
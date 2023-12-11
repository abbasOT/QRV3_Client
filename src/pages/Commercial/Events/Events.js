import React, { useEffect, useState } from "react";
import Header from '../../../components/Commercial/Header/Header'
import searchIcon from "../../../assests/search_icon.svg";
import AddResidentIocn from "../../../assests/pdf_icon.svg";
import Form from "react-bootstrap/Form";
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeIcon from '../../../assests/pin_code.svg'
import EventCard from '../../../components/Commercial/EventsCard/EventCard';

import DateFromModal from '../../../components/Commercial/DateFromModal/DateFromModal'
import DateToModal from '../../../components/Commercial/DateToModal/DateToModal'

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
    { event: "Alex Jr. opened the door", id: 1, date: "2023-04-01" },
    { event: "Alex Jr. opened the door", id: 2, date: "2023-04-02" },
    { event: "Alex Jr.'s Visitor opened the door", id: 3, date: "2023-04-03" },
    { event: "Alex Jr.'s Visitor opened the door", id: 4, date: "2023-04-04" },
   
  ];



function Events() {
  const [ShowFromModal, setShowFromModal] = useState(false);
  const [ShowToModal, setShowToModal] = useState(false);


  const handleOpenModal = () => {
    setShowFromModal(true);
    console.log(ShowFromModal);
  };


  return (
    <div>
         <Header /> 

         <div className="container">
        <div className="row mt-4 d-flex justify-content-end">
         
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              onClick={handleOpenModal}
            >
            
              Export
              <img
                src={AddResidentIocn}
                style={{ marginLeft: "10px" }}
                alt=""
              />{" "}

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

        <div className="row mt-5 d-flex justify-content-end" >
            <div className="col-1" style={{color:"#566D90",fontWeight:"600"}}>Pag 1</div>
        </div>
        <hr  />
        <div className="row mt-5 justify-content-around">
       <EventCard dataArray={dataArray}  />
        </div>
      </div>


      <Modal
        centered
        className="abc"
        show={ShowFromModal}
        onHide={() => setShowFromModal(false)}
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
        
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Poppins",
              fontSize: "20px",
            }}
          > From</span>
        </Modal.Title>
        <Modal.Body>
          <DateFromModal setShowFromModal={setShowFromModal}  setShowToModal={setShowToModal} showToModal={ShowToModal} />
        </Modal.Body>
      </Modal>


      <Modal
        centered
        className="abc"
        show={ShowToModal}
        onHide={() => setShowToModal(false)}
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
        
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Poppins",
              fontSize: "20px",
            }}
          > To</span>
        </Modal.Title>
        <Modal.Body>
          <DateToModal setShowFromModal={setShowFromModal}  />
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Events
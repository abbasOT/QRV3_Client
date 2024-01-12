import axios from "axios";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import { Modal } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import IntercomIcon from "../../../assests/intercom_modal_icon.png";
import AlertModal from "../../../components/Commercial/AlertModal/AlertModal";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  borderRadius: "5px",
  background: "#EEE",
  fontSize: "16px",
  width: "280px",
  marginLeft: "auto",
  marginRight: "auto",
  outline: "none",
  textAlign: "center",
  height: "33px",
};
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "20px",
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",
};

export default function IntercomModal({setInterIdModal ,setCommercialData}) {
  const [IntercomId, setIntercomId] = useState("");
  const [showAlertModal, setshowAlertModal] = useState(false);
  const [isListed, setIsListed] = useState(false);
  // const navigate =useNavigate()
  let com_prop_id = localStorage.getItem("userKey");

  const handleSubmit = async () => {
    if (IntercomId === "") {
      alert("Please Enter IntercomId");
      return;
    }
    try {
      const response = await axios.put(
        `https://localhost:8000/commercialAdmin/AddInterComId/${com_prop_id}`,
        { IntercomId }
      );
      alert(response.data.message)
      setCommercialData(response.data.commercialData)
      setInterIdModal(false)

    } catch (error) {
      // Handle errors
      if(error.response.data.pcbId)
      {
        alert( `PCB with id: ${error.response.data.pcbId} already exists`)
        return
      }
      alert(error.response.data.error)
      console.error("Error:", error);
    }
  };


  const DeleteIntercomID = async () => {
    try {
      const response = await axios.delete(`https://localhost:8000/commercialAdmin/delete_InterComId/${com_prop_id}`);
      console.log(response.data); // Handle the response as needed
      setInterIdModal(false)
      setCommercialData(response.data.commercialData)
      // Perform any additional actions after deletion (e.g., redirect, show a success message)
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error (e.g., show an error message)
    }
  };


  const handleAlertModal = () => {
    if (IntercomId === "") {
      alert("Please Enter IntercomId");
      return;
    }
    setshowAlertModal(true);
  };
  const handleClick = (value, label) => {
    setshowAlertModal(false);

    if (label == "delete") {
      if (value === "yes") {
        alert("deleted");
        DeleteIntercomID();
        return;
      }
    }
    if (value === "yes") {
    }
  };

  return (
    <div className="container">
      <LoadingScreen open={isListed} />

      <div className="mb-3 mt-3">
        <div className="d-flex">
          <img
            src={IntercomIcon}
            style={{ marginRight: "auto", marginLeft: "auto" }}
            alt=""
          />
        </div>
        <div>
          <Form>
            {/* 1 */}
            <div className="d-flex mt-3 pt-3 pb-3">
              <input
                type="text"
                id="input-field"
                placeholder="Enter Intercom ID"
                style={inputFieldStyle}
                autoComplete="off"
                value={IntercomId}
                onChange={(e) => setIntercomId(e.target.value)}
              />
            </div>
            <hr style={hrStyle}></hr>
            {/*  */}

            <div className="d-grid justify-content-center">
              <button
                style={btnStyle}
                type="button"
                className="btn btn-primary shadow-sm mt-3 mb-3"
                onClick={handleSubmit}
              >
                Done
              </button>
              <div
                className="text-center"
                style={{ color: "#DC5656", cursor: "pointer" }}
                onClick={handleAlertModal}
              >
                Delete Intercom ID
              </div>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        centered
        className="abc"
        show={showAlertModal}
        onHide={() => setshowAlertModal(false)}
      >
        <Modal.Body>
          <AlertModal
            message={"Are you sure you want to delete ?"}
            label={"delete"}
            handleClick={handleClick}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

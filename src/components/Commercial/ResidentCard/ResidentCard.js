import React, { useState } from "react";
import UserDetailModal from "../../../components/Commercial/UserDetailModal/UserDetail";
import { Dropdown, Modal, Button } from "react-bootstrap";
import UserDetailIcon from "../../../assests/user_detail_icon.svg";
import person_white_icon from '../../../assests/person_filled_icon.svg'

const CardStyle = {
  width: "340px",
  height: "50px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  cursor: "pointer",
};

const SuspendedCardStyle = {
 ...CardStyle,
  backgroundColor: "#DC5656",
  color:"white"
 
};

const NameStyle = {
  fontFamily: "Poppins",
  fontWeight: "500",
  color: "#566D90",
};

const SuspendedNameStyle = {
...NameStyle,
  color: "#fff",
};



function ResidentCard({ dataArray, icon ,setResidents}) {
  const [showUserDetailModal, setUserDetailModal] = useState(false);

  const [Resident,setResident] =useState("")

  const handleOpenModal = (item) => {
    setUserDetailModal(true);
    console.log(showUserDetailModal);
    
    setResident(item)
    console.log(item)
  };

console.log(Resident.name)
  return (
    <>
   

      {Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((residentId) => (
          <div
          style={dataArray[residentId].status === "suspended" ? SuspendedCardStyle : CardStyle}
          key={residentId}
          className="col-md-4 mb-4 d-flex align-items-center justify-content-center"
          onClick={() => handleOpenModal(dataArray[residentId])}
        >
          <img src={dataArray[residentId].status === "suspended" ? person_white_icon : icon } style={{ marginRight: "20px" }} alt="" />
          <span style={dataArray[residentId].status === "suspended" ? SuspendedNameStyle : NameStyle} className="card-title">
          {dataArray[residentId].name}
          </span>
        </div>
        ))
      ) : (
        <p>No residents available</p>
      )}

      <Modal
        size="lg"
        centered
        className="abc"
        show={showUserDetailModal}
        style={{ width: "", height: "" }}
        onHide={() => setUserDetailModal(false)}
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
          {Resident.name}
        </Modal.Title>
        <Modal.Body>
          <UserDetailModal Resident={Resident} setResidents={setResidents} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResidentCard;

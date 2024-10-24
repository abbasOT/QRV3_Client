import React, { useState } from "react";
import UserDetailModal from "../../../components/Commercial/UserDetailModal/UserDetail";
import { Dropdown, Modal, Button } from "react-bootstrap";
import UserDetailIcon from "../../../assests/user_detail_icon.svg";
import person_white_icon from '../../../assests/person_filled_icon.svg'
import ReactivateModal from "../../../components/Commercial/SuspendedUserModal/SuspendedModal";

let CardStyle = {
  width: "340px",
  height: "50px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  cursor: "pointer",
  marginLeft:"45px",
  marginRight:"45px"
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
  const [showUserSuspendedModal, setUserSuspendedModal] = useState(false);

  const [Resident,setResident] =useState("")

  const handleOpenModal = (item) => {

    console.log(item)
    setResident(item)

   if(item.status === "suspended"){

    setUserSuspendedModal(true)
    return
   }
   
    setUserDetailModal(true);
   
  };

  // function MouseOver(event) {
  //   event.target.style.background = '#2A3649';
  //   event.target.style.color = 'white';
  
  // }
  // function MouseOut(event){
  //   event.target.style.background="#EEE";
  //   event.target.style.color = '#2A3649';
  // }

  return (
    <>
   

       {dataArray &&  Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((residentId) => (
          <div
          // onMouseOver={MouseOver} onMouseOut={MouseOut}
          style={dataArray[residentId].status === "suspended" ? SuspendedCardStyle : CardStyle}
          key={residentId}
          className="col-md-4 mb-4 d-flex align-items-center justify-content-center"
          onClick={() => handleOpenModal(dataArray[residentId])}
        >
          <img src={dataArray[residentId].status === "suspended" ? person_white_icon : icon } style={{ marginRight: "20px" }} alt="" />
          <span style={dataArray[residentId].status === "suspended" ? SuspendedNameStyle : NameStyle} className="card-title">
          {  dataArray[residentId].firstName} {dataArray[residentId].lastName}
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

      <Modal
        size="lg"
        centered
        className="abc"
        show={showUserSuspendedModal}
        style={{ width: "", height: "" }}
        onHide={() => setUserSuspendedModal(false)}
      >
        <Modal.Title
          className="w-100 text-center pt-2"
          style={{
            alignItems: "center",
            height: "62px",
            backgroundColor: "#DC5656",
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
          <ReactivateModal Resident={Resident} setResidents={setResidents} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResidentCard;

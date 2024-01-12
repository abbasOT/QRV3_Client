import React from "react";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";

const CardStyle = {
  width: "195px",
  height: "86px",
//   borderRadius: "12px",
//   border: "#2A3649 solid 2px",
  backgroundColor: "#fff",
  //   cursor: "pointer",
};

const innerDiv1Style ={
    borderRadius: " 12px 12px 0px 0px ",
  border: "#2A3649 solid 2px",
  width:"100%",
  height:"50%",
  backgroundColor:"#2A3649",
  color:"#fff",
  fontFamily: 'Raleway',
  fontSize: '18px',
  fontWeight: "600",
}

const tableRowStyle = {
    
    color: '#566D90',
    fontFamily: 'Raleway',
    fontSize: '19px',
    fontWeight: 600,
   
  };

const innerDiv2Style ={
    borderRadius: " 0px 0px 12px 12px",
  border: "#2A3649 solid 2px",
  width:"100%",
  height:"50%",
  fontFamily: 'Raleway',
  fontSize: '20px',
  fontWeight: 600,
  color:"#2A3649"

}

const NameStyle = {
  fontFamily: "Poppins",
  fontWeight: "500",
  color: "#566D90",
};

function SubscriptionCard({ label ,value }) {
  return (
    <>
      <div
        style={CardStyle}
      
        className="col-md-4  p-0"
        //   onClick={() => handleOpenModal(item)}
      >
        <div className="d-flex align-items-center justify-content-center" style={innerDiv1Style}>{label}</div>
        <div className="d-flex align-items-center justify-content-center" style={innerDiv2Style}>{value}</div>
      </div>
    </>
  );
}

export default SubscriptionCard;

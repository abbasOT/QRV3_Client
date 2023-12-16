import React from "react";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import QrIcon from "../../../assests/superAdmin/qr_icon.svg";

const CardStyle = {
  width: "398px",
  height: "48px",
  borderRadius: "5px",
  border: "#2A3649 solid 1px",
  backgroundColor: "#2A3649",
  //   cursor: "pointer",
};

const NameStyle = {
  fontFamily: "Poppins",
  fontWeight: "500",
  color: "#566D90",
};

function PropIdCard({ dataArray }) {
  return (
    <>
      {dataArray.map((item) => (
        <div
          style={CardStyle}
          key={item.id}
          className="col-md-4 mb-4 align-items-center justify-content-center p-0"
          //   onClick={() => handleOpenModal(item)}
        >
          <div
            className=" d-flex align-items-center justify-content-between"
            style={{
              height: "48px",
              padding: "0px 10px",
              color: "white",
            }}
          >
            <span>
              Property ID: <span>{item.propertyId}</span>{" "}
            </span>{" "}
            <span></span>{" "}
            <span>
              <img src={deleteIcon} width="21px" height="25px" alt="" />
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default PropIdCard;

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

const PcbIdStyle = {fontSize:"16px",fontFamily:"Poppins",fontWeight:"600"} 

function StandByPcb({ dataArray, handleDeletePCB }) {
  return (
    <>
      {Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((pcbId) => (
          <div
            style={CardStyle}
            key={dataArray[pcbId].pcbId}
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
                PCB ID: <span style={PcbIdStyle}>{dataArray[pcbId].pcbId.toUpperCase()}</span>
              </span>{" "}
              <div className="d-grid">
              <span style={{fontSize:"12px"}}>{dataArray[pcbId].isOnline ? 'Online' : 'Offline'}</span>
                <hr style={{margin:"0px"}}/>
                <span style={{fontSize:"8px"}}>{dataArray[pcbId].createdAt}</span>
              </div>
              <span>
                {/* <img style={{ marginRight: "20px" }} src={offIcon} alt="" /> */}
                <img
                  src={deleteIcon}
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                    handleDeletePCB(dataArray[pcbId].pcbId);
                  }}
                />
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </>
  );
}

export default StandByPcb;

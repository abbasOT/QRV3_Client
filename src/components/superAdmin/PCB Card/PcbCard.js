import React from "react";
import offIcon from "../../../assests/superAdmin/off_icon.svg";
import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";

const CardStyle = {
  width: "398px",
  height: "48px",
  borderRadius: "5px",
  border: "#2A3649 solid 1px",
  backgroundColor: "#2A3649",
  //   cursor: "pointer",
};

function PcbCard({ dataArray, handleDeletePCB, handleUpdatePCB }) {
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
                PCB ID:  <b>{dataArray[pcbId].pcbId.toUpperCase()}</b>{" "}
              </span>{" "}
              <span></span>{" "}
              <span>
                <img
                  style={{ marginRight: "20px" }}
                  src={offIcon}
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                    handleUpdatePCB(dataArray[pcbId].pcbId);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt=""
                  style={{ cursor: "pointer" }}
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
        <p>No pcbs available.</p>
      )}
    </>
  );
}

export default PcbCard;

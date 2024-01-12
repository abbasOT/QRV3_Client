import deleteIcon from "../../../assests/superAdmin/delete_icon.svg";
import React, { useState } from "react";
import ResidentialDetailModal from "../PropertyDetailModal/PropertyDetailModal";
import PropertyDetailModal from "../PropertyDetailModal/PropertyDetailModal";
import { Modal } from "react-bootstrap";

const CardStyle = {
  width: "398px",
  height: "48px",
  borderRadius: "5px",
  border: "#2A3649 solid 1px",
  backgroundColor: "#2A3649",
  cursor: "pointer",
};

function PropIdCard({ label,setStatus, dataArray, handleDeleteProperty ,updateStatus,status}) {
  const [showPropertyModal, setPropertyModal] = useState(false);
  const [PropertyData, setPropertyData] = useState();

  const handleOpenModal = (propertyData) => {
    setPropertyData(propertyData);

    console.log(showPropertyModal);

    if (label === "Residential") {
      setPropertyModal(true);
    } else {
      setPropertyModal(true);
    }
  };

  function renderFirstHalf(id) {
    // Calculate the index to split the string in half
    const splitIndex = Math.ceil(id.length / 2);
  
    // Get the first half of the string
    const firstHalf = id.substring(0, splitIndex);
  
    // Return the JSX
    return <span>{firstHalf}</span>;
  }

  return (
    <>
      {Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((propertyId) => (
          <div
            style={CardStyle}
            key={dataArray[propertyId].propertyId}
            className="col-md-4 mb-4 align-items-center justify-content-center p-0"
            onClick={() => handleOpenModal(dataArray[propertyId])}
          >
            <div
              className=" d-flex align-items-center justify-content-between"
              style={{
                height: "48px",
                padding: "0px 10px",
                color: "white",
              }}
            >
              <span >
              <span style={{fontSize:"18px",fontFamily:"Poppins",fontWeight:"600",}}>Property ID:</span>   <span>{renderFirstHalf(dataArray[propertyId].id)}</span>
              </span>{" "}
              <span></span>{" "}
              <span>
                <img
                  src={deleteIcon}
                  width="21px"
                  height="25px"
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from triggering the parent div's onClick
                    handleDeleteProperty(dataArray[propertyId].propertyId);
                  }}
                />
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}

     

      <Modal
        size=""
        centered
        className="abc"
        show={showPropertyModal}
        style={{ width: "", height: "" }}
        onHide={() => setPropertyModal(false)}
      >
        <Modal.Body style={{ backgroundColor: "#EEE", padding: "0px" }}>
          <PropertyDetailModal label={label} PropertyData={PropertyData} updateStatus={updateStatus}  setStatus={setStatus}/>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default PropIdCard;

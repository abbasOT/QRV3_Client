import React from 'react'
import Ticon from '../../../assests/event_icon1.svg'
import Oicon from '../../../assests/pin_code.svg'
import Cicon from '../../../assests/event_icon3.svg'
import Picon from '../../../assests/event_icon4.svg'
import keyIcon from "../../../assests/commercialAdmin/keyButtonEventIcon.svg"


const NameStyle = {
  fontFamily: "Poppins",
  fontWeight: "700",
  color: "#566D90",
  marginRight: "70px"

}
const dateStyle = {
  ...NameStyle,
  fontWeight: "500",
}

const CardStyle = {
  // width: "340px",
  height: "50px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",


};

const iconStyle = { marginRight: "20px", marginLeft: "70px", width: "20px" }

function EventCard({ dataArray }) {

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Get date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Get time components
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the date
    const formattedDate = `${month}/${day}/${year}`;

    // Format the time
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Get AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Concatenate date and time with AM/PM
    const formattedTimestamp = `${formattedDate}-${formattedTime} ${ampm}`;

    return formattedTimestamp;
  }




  return (
    <>
      {dataArray && Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).sort((a, b) => dataArray[b].timestamp - dataArray[a].timestamp).map((PinId) => (
          <div style={CardStyle} key={dataArray[PinId].id} className="col-md-12 mb-4 d-flex align-items-center justify-content-between">
            <span style={NameStyle} className="card-title">
              {dataArray[PinId].eventType === 'T' && <img src={Ticon} style={{ ...iconStyle, width: 14 }} alt="" />}
              {dataArray[PinId].eventType === 'P' && <img src={Picon} style={iconStyle} alt="" />}
              {dataArray[PinId].eventType === 'servicePinCode' && <img src={Oicon} style={{ ...iconStyle, width: 16 }} alt="" />}
              {dataArray[PinId].eventType === 'videoCall' && <img src={Cicon} style={iconStyle} alt="" />}
              {dataArray[PinId].eventType === 'key' && <img src={keyIcon} style={iconStyle} alt="" />}
              {dataArray[PinId].message}</span>
            <div className='d-flex align-items-center justify-content-between'>
              <span style={NameStyle} className="card-title">{dataArray[PinId].gateName || ""}</span>
              <span style={dateStyle} className="card-title">{formatTimestamp(dataArray[PinId].timestamp)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No Residential Events Available</p>
      )}
    </>
  )
}

export default EventCard;
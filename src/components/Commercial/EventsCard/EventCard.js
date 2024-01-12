import React from 'react'


const NameStyle ={
    fontFamily:"Poppins",
    fontWeight:"500",
    color: "#566D90",
  }

  const CardStyle = {
    // width: "340px",
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#EEE",
   
  
  };

function EventCard({dataArray}) {

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
       {dataArray &&  Object.keys(dataArray).length > 0 ? (
        Object.keys(dataArray).map((PinId) => (
          <div style={CardStyle}  key={dataArray[PinId].id} className="col-md-12 mb-4 d-flex align-items-center justify-content-between">
          {/* <img src={icon} style={{marginRight:"20px"}} alt="" /> */}
        <span style={NameStyle} className="card-title">{dataArray[PinId].message}</span>
        <span style={NameStyle} className="card-title">{formatTimestamp(dataArray[PinId].timestamp)}</span>
      </div>
     ))
     ) : (
       <p>No residents available</p>
     )}

  </>
  )
}

export default EventCard;
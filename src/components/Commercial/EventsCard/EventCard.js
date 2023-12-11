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

    
  return (
    <>
    {dataArray.map((item) => (
      <div style={CardStyle} key={item.id} className="col-md-12 mb-4 d-flex align-items-center justify-content-between">
          {/* <img src={icon} style={{marginRight:"20px"}} alt="" /> */}
        <span style={NameStyle} className="card-title">{item.event}</span>
        <span style={NameStyle} className="card-title">{item.date}</span>
      </div>
    ))}
  </>
  )
}

export default EventCard;
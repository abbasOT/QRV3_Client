import React from 'react'
import PhoneIcon from '../../../assests/phone_icon.svg'
import PersonFilledIcon from '../../../assests/person_filled_icon.svg'
  

function UsersCard({usersData}) {
  return (
    <div>
      {usersData.length > 0 ? (
        usersData.map((user, index) => (
          <div
            key={index}
            // onClick={() => handleSubmit("111")}
            style={{
              display: "flex",
              alignItems: "center",
           
              padding:"5px 10px",
              cursor: "pointer",
            }}
          >
            <div
            className="d-flex align-items-center"
              style={{
                backgroundColor: "#ECECEC",
                
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                marginRight: "1%",
                width: "-webkit-fill-available",
                height:"40px",
              
            
              }}
            >
              <span
                style={{
                  color: "#727272",
                  marginLeft: "5%",
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "max-content",
                  float: "left",
                }}
              >
             
                  <img style={{marginRight:"20px"}} src={PersonFilledIcon} alt="" />
                {user.name + " " + user.lastName}
              </span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{
                backgroundColor: "#19A752",
                padding: "20px",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
                width:"60px",
                height:"40px",
              }}
            >
                <img src={PhoneIcon} alt="" />
              {/* <BsTelephoneFill onClick={() => handleSubmit(user.userId)}  style={{ color: "#ECECEC" }} size={24} /> */}
            </div>
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  )
}

export default UsersCard
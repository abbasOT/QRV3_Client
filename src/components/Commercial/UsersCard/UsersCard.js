import React from 'react'
import PhoneIcon from '../../../assests/phone_icon.svg'
import PersonFilledIcon from '../../../assests/person_filled_icon.svg'
import './user.css'

const userOuterDiv = {
  border: "#FFF solid 1px",
  // margin: "5px",
  marginRight: "auto",
  marginLeft: "auto",
  padding: "5px",
  borderRadius: "15px",
  width: "97%",
  maxHeight: "424px",
  overflowY: "auto",
  height: "275px",
};

function UsersCard({usersData , handleCall }) {
  const alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
  const alphabetArray = alphabet.split(' ');
  
  const groupedUsers = alphabetArray
    .map((letter) => ({
      letter,
      users: Object.values(usersData).filter(
        (user) => user.name && user.name.charAt(0).toUpperCase() === letter
      ),
    }))
    .filter((group) => group.users.length > 0);

  return (
   <div style={userOuterDiv}>
      {groupedUsers.map((group) => (
        <div key={group.letter}>
          <div  className="circle-letter">{group.letter}</div>
          {group.users.map((user) => (
            <div
              key={user.userId}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{
                  backgroundColor: '#ECECEC',
                  borderTopLeftRadius: '15px',
                  borderBottomLeftRadius: '15px',
                  marginRight: '1%',
                  width: '-webkit-fill-available',
                  height: '40px',
                }}
              >
                <span
                  style={{
                    color: '#727272',
                    marginLeft: '5%',
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    width: 'max-content',
                    float: 'left',
                  }}
                >
                  <img style={{ marginRight: '20px' }} src={PersonFilledIcon} alt="" />
                  {user.name + ' ' + user.lname}
                </span>
              </div>
              <div
                className="d-flex align-items-center"
                style={{
                  backgroundColor: '#19A752',
                  padding: '20px',
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  width: '60px',
                  height: '40px',
                }}
              >
                <img src={PhoneIcon} alt="" onClick={() => handleCall(user.userId)} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default UsersCard
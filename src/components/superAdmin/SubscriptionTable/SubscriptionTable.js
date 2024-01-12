import React from 'react'
import { Table } from 'react-bootstrap';
import  DeleteIocn from '../../../assests/superAdmin/red_delete_icon.svg'




const tableHeaderItemStyle = {
    backgroundColor: '#2A3649',
    color: '#fff',
    fontFamily: 'Raleway',
    fontSize: '22px',
    fontWeight: 600,
   
  };

  const tableRowStyle = {
    
    color: '#566D90',
    fontFamily: 'Raleway',
    fontSize: '19px',
    fontWeight: 600,
   
  };


  const NameStyle = {
    ...tableHeaderItemStyle,
    borderTopLeftRadius: '12px',
  };

  const PropIdStyle = {
    ...tableHeaderItemStyle,
    borderTopRightRadius: '12px',
  };


function SubscriptionTable({data}) {

  console.log(data)
  return (
    <>  <Table  hover striped  className="custom-table" >
    <thead  >
      <tr>
        <th style={NameStyle}>Name</th>
        <th style={tableHeaderItemStyle}>Email</th>
        <th style={tableHeaderItemStyle}>Info</th>
        <th style={tableHeaderItemStyle}>Property Id</th>
        <th style={PropIdStyle}></th>
      </tr>
    </thead>
    <tbody>
    {data.length === 0 ? (
  <tr>
    <td colSpan="5" style={tableRowStyle}>
      No data available
    </td>
  </tr>
) : (
  data.map((user) => (
    <tr key={user.id} style={tableRowStyle}>
      <td style={tableRowStyle}>{user.name ? user.name : user.UserName} {user.lastName ? user.lastName : user.LastName}</td>
      <td style={tableRowStyle}>{user.email}</td>
      <td style={tableRowStyle}>  {!user.propertyId ? 'N\\S' : user.id && user.id.charAt(0).toUpperCase() === 'C' ? 'C' : 'R'}</td>
      <td style={tableRowStyle}>{user.propertyId}</td>
      <td><img src={DeleteIocn} alt="" /></td>
    </tr>
  ))
)}

</tbody>
  </Table></>
  )
}

export default SubscriptionTable


// {Object.keys(data).map((numericKey) => (
//   <React.Fragment key={numericKey}>
//     {Object.keys(data[numericKey]).map((userKey) => {
//       const user = data[numericKey][userKey];
//       return (
//         <tr key={user.id} style={tableRowStyle}>
//           <td style={tableRowStyle}>{user.firstName} {user.lastName}</td>
//           <td style={tableRowStyle}>{user.email}</td>
//           <td style={tableRowStyle}>{user.info}</td>
//           <td style={tableRowStyle}>{user.propertyId}</td>
//           <td><img src={DeleteIocn} alt="" /></td>
//         </tr>
//       );
//     })}
//   </React.Fragment>
// ))}
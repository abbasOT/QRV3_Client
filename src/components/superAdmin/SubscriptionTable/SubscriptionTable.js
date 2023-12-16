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
  return (
    <>  <Table  hover striped responsive className="custom-table">
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
    {data.map((item, index) => (
          <tr key={index} style={tableRowStyle}>
          <td style={tableRowStyle} >{item.name}</td>
          <td  style={tableRowStyle}>{item.email}</td>
          <td style={tableRowStyle}>{item.info}</td>
          <td style={tableRowStyle} >{item.propertyId}</td>
          <td ><img src={DeleteIocn} alt="" /></td>
       
        </tr>
        ))}
  
      {/* Add more rows as needed */}
    </tbody>
  </Table></>
  )
}

export default SubscriptionTable
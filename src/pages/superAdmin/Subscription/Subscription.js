import React from "react";
import Header from "../../../components/superAdmin/Header/Header";
import { Link } from "react-router-dom";
import SubscriptionCard from "../../../components/superAdmin/SubscriptionDetailCard/SubscriptionCard";
import SubscriptionTable from "../../../components/superAdmin/SubscriptionTable/SubscriptionTable";


const row1Style = {
  borderRadius: "28px",
  border: "1px solid rgba(42, 54, 73, 0.21)",
};

const textStyle ={
  color: '#2A3649',
  fontFamily: 'Raleway',
  fontSize: '17px',
  fontWeight: 600,
}

const data = [
  { name: 'John Doe', email: 'john@example.com', info: 'R', propertyId: 'DF65!OL?UJ'},
  { name: 'John Doe', email: 'john@example.com', info: 'N/S', propertyId: 'DF65!OL?UJ'},
  { name: 'John Doe', email: 'john@example.com', info: 'C', propertyId: 'DF65!OL?UJ'},
];

function Suscription() {
  return (
    <div>
      <Header />
      <div className="container">
        <div
          style={row1Style}
          className="row mt-4 d-flex justify-content-around align-items-center pt-5 pb-5 mb-5"
        >
          <SubscriptionCard label={"Community Users"} value={"15"} />
          <SubscriptionCard label={"Residential Users"} value={"10"} />
          <SubscriptionCard label={"Non subscriber"} value={"04"} />
        </div>

<div className="row  mt-4 ">
  <div className="col-1 text-end" style={textStyle}>
    Details
  </div>
</div>
        <div
          style={row1Style}
          className="row d-flex justify-content-around align-items-center pt-5 pb-5 mb-5"
        >
         <SubscriptionTable data={data} />
        </div>


      </div>
    </div>
  );
}

export default Suscription;

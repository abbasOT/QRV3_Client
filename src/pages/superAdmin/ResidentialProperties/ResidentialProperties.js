import React from "react";
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import PropIdCard from "../../../components/superAdmin/Prop ID Card/PropIdCard";



const SearchInputStyle = {
  border: "none",
  borderRadius:"14px",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
  width: "424px",
  height: "31px",
};


const TotalPropStyle ={
    fontFamily:"Raleway",
  
     color: "#535353",
     fontWeight: "400",
}


const iconStyle = {
  position: "relative",
  marginRight: "-40px", // Adjust the spacing between the icon and the text
};


const dataArray = [
    { propertyId: "IOKL#HY76&" },
    { propertyId:"IOKL#HY76&" },
    { propertyId:"IOKL#HY76&" },
    { propertyId:"IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" },
    { propertyId:"IOKL#HY76&" },
    { propertyId:"IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" },
    { propertyId: "IOKL#HY76&" }
];

function ResidentialProperties() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row mt-4 d-flex justify-content-center align-items-center pb-5">
         
          <div className="col-4 d-flex mt-5">
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              placeholder="Search Property ID"
            />
          </div>
        </div>

        <div className="row ">
          <div className="col-2 text-start">
            <span style={TotalPropStyle}>Total Properties: 3</span>
          </div>
        </div>
        <hr className="" />
        <div className="row mt-5 justify-content-around">
          <PropIdCard icon={""} dataArray={dataArray} />
        </div>
      </div>
    </div>
  );
}

export default ResidentialProperties;

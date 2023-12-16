import React from "react";
import LogoIcon from "../../../assests/header_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import OKIcon from '../../../assests/ok.png'
import NumPadSmallIcon from '../../../assests/numpad_smal_icon.svg'
import {
 
  TextField,
  IconButton,
} from "@mui/material";

import kIcon from '../../../assests/k_icon.svg'

import UsersCard from '../../../components/Commercial/UsersCard/UsersCard'

const usersData = [
  
  { name: 'Jane', lastName: 'Doe', userId: 'jane456' },
  { name: 'Alice', lastName: 'Smith', userId: 'alice789' },
  { name: 'Bob', lastName: 'Johnson', userId: 'bob101' },
  { name: 'Eva', lastName: 'Davis', userId: 'eva202' },
  { name: 'Charlie', lastName: 'Brown', userId: 'charlie303' },
  { name: 'Grace', lastName: 'Lee', userId: 'grace404' },
  
];
const Data = [

  { name: 'Grace', lastName: 'Lee', userId: 'grace404' },
];


const SearchInputStyle = {
  border: "none",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "15px",
  borderRadius: "25px",
  width: "377px",
  height: "38px",
};

const userOuterDiv ={
  border:"#FFF solid 1px",
  margin:"5px",
  padding:"5px",
  borderRadius:"15px",
  width:"377px",
  maxHeight:"424px",
  overflowY: "auto",
}


const InputDivStyle = {
  borderRadius: "20px 0 0 20px",
  width: "226px",
  height: "39px",
  border: "none",
  backgroundColor: "#EBEBEB",
  paddingLeft: "10%",
  marginRight:"-15px",
  marginLeft:"-25px"
};

function VisitorScreenCard() {
  return (
    <div
      className="d-grid justify-content-center pt-5"
      style={{
        width: "430px",
        borderRadius: "40px",
        background: "#2A3649",
      }}
    >
      <div>
        <img src={LogoIcon} alt="" />
      </div>
      <div className="mt-2" style={{ color: "white" }}>
        Welcome to <br /> Blue Lake
      </div>
<div>
<TextField
        sx={{
          backgroundColor: "#ECECEC",
          width: "377px",
          // height:"38px",
          borderRadius: 25,
          margin: "10px",
        }}
        id="textfield"
        placeholder="Search Name"
        // value={searchQuery}
        // onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
          // inputProps: {
          //   style: { color: "white" },
          // },
        }}
      />
</div>
    

    <div style={userOuterDiv} >
       < UsersCard usersData={usersData} />
       <img src={kIcon} alt="" />
       < UsersCard usersData={Data} />
    </div>

    <div className="mt-3 mb-3" style={{color:"white",fontSize:"13px",fontFamily:"Inter"}}>
      <span style={{fontWeight:"700"}}>Enter the PIN  </span><span style={{fontWeight:"400"}}>if you know it and press </span> <span style={{fontWeight:"700"}}> OK</span>  <span style={{fontWeight:"400"}}> to open the Gate. </span>
    </div>
    <div className=" mb-3">
      <img style={{position:"relative"}} src={NumPadSmallIcon} alt="" />
      <input
                type="text"
                style={InputDivStyle}
                placeholder="Enter PIN"
              />
      <img src={OKIcon} alt="" />
    </div>

    </div>
  );
}

export default VisitorScreenCard;

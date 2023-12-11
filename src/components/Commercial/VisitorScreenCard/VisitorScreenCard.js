import React from "react";
import LogoIcon from "../../../assests/header_logo.png";
import Form from "react-bootstrap/Form";
import searchIcon from "../../../assests/search_icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

const SearchInputStyle = {
  border: "none",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "15px",
  borderRadius: "25px",
  width: "377px",
  height: "38px",
};
const iconStyle = {
  position: "relative",
  right: "-30px",
};

function VisitorScreenCard() {
  return (
    <div
      className="d-grid"
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
    

    <div >

    </div>

    </div>
  );
}

export default VisitorScreenCard;

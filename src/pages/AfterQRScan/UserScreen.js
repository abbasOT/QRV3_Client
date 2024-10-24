import React, { useState, useEffect } from "react";
import UsersCard from "../../components/Commercial/UsersCard/UsersCard";
import back from "../../assests/backIcon.svg";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function UserScreen({AdminData,value, usersData, handleCall, setShowUsers ,handleKeyPress,handleSearchInputChange }) {
  
console.log(usersData)
  const defaultBackgroundStyle = {
    width: "100%",
    // borderRadius: "40px",
  };
  
  const dynamicBackgroundStyle = AdminData?.wallpaper
    ? {
        ...defaultBackgroundStyle,
        backgroundImage: `url(${AdminData.wallpaper})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : defaultBackgroundStyle;

  const OpacityValue = {
    ...dynamicBackgroundStyle,
  };


  const handleBack = () => {
    setShowUsers(false);
  };
  return (
    <div style={OpacityValue}>
      <div style={{ padding: "20px" ,  backgroundColor: `rgba(42, 54, 73, ${
              1 - AdminData.brightness / 100
            })`,height: "93vh",}}>
        <div
          style={{ marginTop: "10px", marginBottom: "20px" }}
          onClick={handleBack}
        >
          <img src={back} alt="" />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField
            sx={{
              backgroundColor: "#ECECEC",

              height: "40px",
              borderRadius: 25,
              margin: "10px",

              display: "flex",

              justifyContent: "center",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputAdornment-root": {
                margin: 0,
              },
            }}
            id="textfield"
            placeholder="Search Name"
            value={value}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <UsersCard usersData={usersData} handleCall={handleCall} />
      </div>
    </div>
  );
}

export default UserScreen;

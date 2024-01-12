import LogoIcon from "../../assests/header_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import OKIcon from "../../assests/ok.png";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
import { TextField, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useState, useEffect } from "react";
import UsersCard from "../../components/Commercial/UsersCard/UsersCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";

const userOuterDiv = {
  border: "none",
  backgroundColor: "#D3D3D3",
  margin: "5px",
  padding: "5px",
  borderRadius: "25px",
  width: "97%",
  maxHeight: "424px",
  overflowY: "auto",
  height: "275px",
};

function SearchResults({ AdminData, CommercialResidents,setPage,page }) {
  const { pcbId } = useParams();
  const [pin, setPin] = useState("");

  //   const [AdminData, setAdminData] = useState();
  const [propId, setPropId] = useState("");
  const navigate = useNavigate();
  const handleCall = async (userId) => {
    if (propId === "" || userId === "") {
      alert("cannot make call");
      return;
    }
    try {
      const response = await axios.post(
        `https://192.168.18.147:8000/commercialAdmin/sendCallNotification/${userId}`,
        { propId }
      );

      // Handle the response if needed
      console.log(response.data);
      navigate(`/videoCall/${propId}`);
    } catch (error) {
      console.error("Error in handleCall:", error);
      // Handle the error if needed
    }
  };
  console.log(AdminData);

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

 const  handlePageChange =() =>{
    console.log(page)
    setPage("main")
 }

  return (
    <>
      <div style={OpacityValue}>
        <div
          className="d-grid justify-content-center pt-5"
          style={{
            backgroundColor: `rgba(42, 54, 73, ${
              1 - AdminData.brightness / 100
            })`,
            height: "600px",
          }}
        >
          <ChevronLeftIcon style={{ color: "#fff" }} onClick={handlePageChange}/>
          <div className="mt-2" style={{ color: "white" }}>
            <h5> Welcome to</h5>{" "}
            <h1>
              {AdminData.WelcomMessage ? AdminData.WelcomMessage : "Blue Lake"}
            </h1>
          </div>

          <div style={userOuterDiv}>
            <div className="p-3">
              <TextField
                id="input-with-icon-textfield"
                placeholder="Search Resident"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: { textAlign: "center" }, // Centering the text within the TextField
                }}
                variant="standard"
              />
            </div>

            <UsersCard
              usersData={CommercialResidents}
              handleCall={handleCall}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;

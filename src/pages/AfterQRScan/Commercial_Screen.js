import LogoIcon from "../../assests/header_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import OKIcon from "../../assests/ok.png";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
import { TextField, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import UsersCard from "../../components/Commercial/UsersCard/UsersCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userOuterDiv = {
  border: "#FFF solid 1px",
  margin: "5px",
  padding: "5px",
  borderRadius: "15px",
  width: "377px",
  maxHeight: "424px",
  overflowY: "auto",
  height: "400px",
};

const InputDivStyle = {
  borderRadius: "20px 0 0 20px",
  width: "226px",
  height: "39px",
  border: "none",
  backgroundColor: "#EBEBEB",
  paddingLeft: "10%",
  marginRight: "-15px",
  marginLeft: "-25px",
};

function CommercialScreen() {
//   const { pcbId } = useParams();
//   const [pin, setPin] = useState("");
//   const [CommercialResidents, setCommercialResidents] = useState([]);
//   const [AdminData, setAdminData] = useState();
//   const [comId, setComId] = useState("");
//   const [propertyType ,setpropertyType] =useState("")
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to fetch properties
//     const fetchProperties = async () => {
//       try {
//         // Make a GET request to get properties
//         const response = await axios.get(
//           `https://192.168.18.147:8000/commercialAdmin/visitor_residents/${pcbId}`
//         );
//         // Update the state with the fetched properties
//         setCommercialResidents(response.data.residents || []);

//         setComId(response.data.propId);
//         setpropertyType(response.data.proptype)
//         setAdminData(response.data.AdminData);
//         setLoading(false);
//         console.log(CommercialResidents);
//       } catch (error) {
//         console.log("Error fetching properties:", error.response.data);
//         alert(error.response.data.error);
//       }
//     };

//     // Call the function to fetch properties when the component mounts
//     fetchProperties();
//   }, []);

//   const handleCall = async (userId) => {
//     if (comId === "" || userId === "") {
//       alert("cannot make call");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `https://192.168.18.147:8000/commercialAdmin/sendCallNotification/${userId}`,
//         { comId }
//       );

//       // Handle the response if needed
//       console.log(response.data);
//       navigate(`/videoCall/${userId}`);
//     } catch (error) {
//       console.error("Error in handleCall:", error);
//       // Handle the error if needed
//     }
//   };

//   const handleOkIconClick = async () => {
//     if (pin === "") {
//       alert("Enter PinCode");
//       return;
//     }
//     try {
//       // Make a POST request with the PIN to /commercialAdmin/accessDoorWithPin
//       const response = await axios.post(
//         `https://192.168.18.147:8000/commercialAdmin/accessDoorWithPin/${comId}`,
//         {
//           pin: pin,
//         }
//       );

//       // Handle the response if needed
//       console.log(response.data);
//     } catch (error) {
//       // Handle errors
//       console.error("Error making POST request:", error);
//       alert(error.response.data.error);
//     }
//   };

//   console.log(AdminData);

  const defaultBackgroundStyle = {
    width: "430px",
    // borderRadius: "40px",open
    background: "#2A3649",
  };

  const dynamicBackgroundStyle = AdminData?.wallpaper
    ? {
        ...defaultBackgroundStyle,
        backgroundImage: `url(${AdminData.wallpaper})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : defaultBackgroundStyle;

  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        
        <div
          className="d-grid justify-content-center pt-5"
          style={dynamicBackgroundStyle}
        >
          <div>
            <img src={LogoIcon} alt="" />
          </div>
          <div className="mt-2" style={{ color: "white" }}>
            <h5> Welcome to</h5>{" "}
            <h1>
              {AdminData.WelcomMessage ? AdminData.WelcomMessage : "Blue Lake"}
            </h1>
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

          <div style={userOuterDiv}>
            <UsersCard
              usersData={CommercialResidents}
              handleCall={handleCall}
            />
            {/* <img src={kIcon} alt="" />
                <UsersCard usersData={Data}  handleCall={handleCall}/> */}
          </div>

          <div
            className="mt-3 mb-3"
            style={{ color: "white", fontSize: "13px", fontFamily: "Inter" }}
          >
            <span style={{ fontWeight: "700" }}>Enter the PIN </span>
            <span style={{ fontWeight: "400" }}>
              if you know it and press{" "}
            </span>{" "}
            <span style={{ fontWeight: "700" }}> OK</span>{" "}
            <span style={{ fontWeight: "400" }}> to open the Gate. </span>
          </div>
          <div className=" mb-3">
            <img
              style={{ position: "relative" }}
              src={NumPadSmallIcon}
              alt=""
            />
            <input
              type="text"
              style={InputDivStyle}
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <img src={OKIcon} alt="" onClick={handleOkIconClick} />
          </div>
        </div>
      )}
    </>
  );
}

export default CommercialScreen;

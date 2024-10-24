// import LogoIcon from "../../assests/header_logo.png";
import LogoIcon from "../../assests/logo_icon.svg";
import SearchIcon from "@mui/icons-material/Search";
// import OKIcon from "../../assests/ok.png";
import OKIcon from "../../assests/ok.svg";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
import { TextField, IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import kIcon from "../../assests/k_icon.svg";
import React, { useState, useEffect } from "react";
import UsersCard from "../../components/Commercial/UsersCard/UsersCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Residential_Screen from "./Residential_Screen";
import SearchResults from "./SearchResults";
import "./qrstyle.css";
import Loader from "../../pages/Loader/Loader";
import SensorError from "./SensorError";

import callIcon from "../../assests/call_icon.png";

import greenOk from "../../assests/visitorScreen/greenOK.svg"
import redOk from "../../assests/visitorScreen/redOK.svg"
import yellowOk from "../../assests/visitorScreen/yellowOK.svg"


import OrIcon from "../../assests/or.svg";
import UserScreen from "./UserScreen";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import { Box } from '@mui/material'

import { app } from "../../firebase"

const InputDivStyle = {
  borderRadius: "20px 0 0 20px",
  width: "226px",
  height: "39px",
  border: "none",
  paddingLeft: "10%",
  marginRight: "-15px",
  marginLeft: "-25px",
  paddingLeft: "35px"
};

function VisitorScreen() {
  const { pcbId } = useParams();
  const [pin, setPin] = useState("");
  const [CommercialResidents, setCommercialResidents] = useState([]);
  const [CommercialResidents2, setCommercialResidents2] = useState([]);
  const [AdminData, setAdminData] = useState();
  const [residentialPropertyId, setResdentialPropertyId] = useState("");
  const [propId, setPropId] = useState("");
  const [propertyType, setpropertyType] = useState("");
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState("main");
  const [data, setData] = useState(null);
  const [pcbData, setPcbData] = useState(null);

  const [ShowUsers, setShowUsers] = useState(false);

  const [okIconColor, setOkIconColor] = useState("0")

  const navigate = useNavigate();

  useEffect(() => {
    const database = getDatabase();
    const userDevicesRef = ref(database, `PCB/${pcbId}`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      if (data) {
        // console.log(data)
        setPcbData(data)
        setResdentialPropertyId(data.propertyId)

      }
    });
  }, []);




  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://ot-technologies.com/commercialAdmin/visitor_residents/${pcbId}`
        );
        // Update the state with the fetched properties
        setCommercialResidents(response.data.residents || []);
        setCommercialResidents2(response.data.residents || []);

        setPropId(response.data.propId);
        setpropertyType(response.data.proptype);
        setAdminData(response.data.AdminData);
        setData(response.data.data);
        // setPcbData(response.data.residentsData);
        setPcbData(response.data.pcbData);

        if (response.data.AdminData.brightness) {
          setBrightness(response.data.AdminData.brightness || 50);
        } else if (response.data.AdminData.opacity) {
          setBrightness(response.data.AdminData.opacity);
        }
        setLoading(false);
        //   console.log(CommercialResidents);
        // }
        setLoading(false);
      } catch (error) {
        // console.log("Error fetching properties:", error);
        setLoading(false);
        // alert(error.response.data.error);
        // navigate("/InvalidQR")
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
    document.body.style.minWidth = "350px";
  }, []);

  // console.log(pcbData, "the data i want for the pcb ")



  const commercial_prop_id = AdminData?.propertyId
  const handleShowUsers = function () {
    setShowUsers(true);
  };
  const handleCall = async (userId) => {
    if (propId === "" || userId === "") {
      alert("cannot make call");
      return;
    }
    const randomString = generateRandomAlphanumeric(7);

    try {
      const tokenResponse = await createToken(randomString);
      // console.log(tokenResponse.data.token);

      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/sendCallNotification/${userId}`,
        { propId, randomString, commercial_prop_id, pcbId }
      );

      // Handle the response if needed
      // console.log(response);
      // navigate(`/videoCall/${pcbId}`);
      navigate(`/videoCall/${pcbId}/${randomString}`);
    } catch (error) {
      // console.error("Error in handleCall:", error);
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      } else {
        alert(error.response.data.message);
      }
      // Handle the error if needed
    }
  };

  const createToken = async (randomString) => {
    try {
      const tokenResponse = await axios.post(
        "https://ot-technologies.com/commercialAdmin/createToken",
        { randomString }
      );
      return tokenResponse;
    } catch (error) {
      // console.error("Error creating token:", error);
      throw error;
    }
  };

  const handleOkIconClick = async () => {
    if (pin === "") {
      alert("Enter PinCode");
      return;
    }
    try {
      // Make a POST request with the PIN to /commercialAdmin/accessDoorWithPin
      const comId = propId;
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/accessDoorWithPin/${comId}`,
        {
          pin: pin,
          propertyId: commercial_prop_id,
          pcbId: pcbId,
        }
      );

      // Handle the response if needed
      if (response.data.sensorCheck) {
        console.log(response.data.userId, "the user id of the user who accessed the door pin")
        const userId = response.data.userId
        const pinName = response.data.pinName
        handleNotificationMsg(userId, pinName)
        alert("Pin matched successfully");
        setOkIconColor("1");

        // Set a timeout to revert the icon color back to "0" after 3 seconds
        setTimeout(() => {
          setOkIconColor("0");
        }, 3000);
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error.response.data.sensorCheck);
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      } else {
        console.error("Error making POST request:", error);
        alert("Wrong Pin Code");
        setOkIconColor("-1");

        // Set a timeout to revert the icon color back to "0" after 3 seconds
        setTimeout(() => {
          setOkIconColor("0");
        }, 3000);
      }
    }
  };


  const handleNotificationMsg = async (userId, pinName) => {
    if (!userId) {
      return;
    }
    try {
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/sendDoorPinNotifications/${userId}`,
        { pcbId, pinName }
      );
      console.log("the accessed door pin notification msg api response: ", response);
    } catch (error) {
      console.error("Error making POST request:", error);
    };
  }




  // console.log(AdminData);

  const defaultBackgroundStyle = {
    width: "100%",
    backgroundColor: "#2A3649",
    height: "100vh",



    // borderRadius: "40px",
  };

  // const dynamicBackgroundStyle = pcbData?.wallpaper
  //   ? {
  //     ...defaultBackgroundStyle,
  //     backgroundImage: `url(${pcbData?.wallpaper})`,
  //     backgroundSize: "cover",
  //     backgroundRepeat: "no-repeat",

  //   }
  //   : defaultBackgroundStyle;

  const dynamicBackgroundStyle = {
    ...defaultBackgroundStyle,
    ...(pcbData?.wallpaper && {
      backgroundImage: `url(${pcbData?.wallpaper})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: "",
      height: "100vh",

    }),
  };
  // const OpacityValue = {
  //   ...dynamicBackgroundStyle,
  // };

  function generateRandomAlphanumeric(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    return result;
  }



  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value.trim() === "") {
      setCommercialResidents(CommercialResidents2);
    }

  };



  const handleKeyPress = (e) => {


    console.log("keyPress")
    if (e.key === "Enter") {
      if (searchInput === "") {
        alert("Please enter the name")
      } else {
        const filteredResidents = Object.keys(CommercialResidents).filter(
          (residentId) => {
            const resident = CommercialResidents[residentId];
            const fullName = `${resident.firstName} ${resident.lastName}`;
            const searchQuery = searchInput.toLowerCase();
            return (
              fullName.toLowerCase().includes(searchQuery) ||
              resident.lastName.toLowerCase().includes(searchQuery)
            );
          }
        );


        const filteredResidentsArray = filteredResidents.map(
          (residentId) => CommercialResidents[residentId]
        );

        // Update the state with the filtered residents
        setCommercialResidents(filteredResidentsArray);
        setPage("search");
        // navigate("/search")
        console.log(
          filteredResidentsArray,
          "Filtered Residents:",
          filteredResidents
        );
      }
    }
    console.log(propertyType, "the property type")

  };

  const getBackgroundStyle = (okIconColor) => ({
    background: okIconColor === "1"
      ? "linear-gradient(90deg, #FFFFFF 0%, #19A752 97.57%)" // Green gradient
      : okIconColor === "-1"
        ? "linear-gradient(90deg, #FFFFFF 0%, #A31F3F 100%)" // Red gradient
        : "#EBEBEB" // Default background
  });

  return (
    < div style={{
      height: "100vh",
    }} >
      <Loader open={loading} />
      {loading ? (
        <>loading</>
      ) : (
        <>
          {pcbData?.sensor === "0" ? (
            <>
              <SensorError />
            </>
          ) : (
            <>
              {propertyType === "commercial" ? (
                <>
                  {page === "main" ? (
                    <>
                      <div style={dynamicBackgroundStyle}>
                        {ShowUsers ? (
                          <>
                            <UserScreen
                              AdminData={AdminData}
                              usersData={CommercialResidents}
                              handleCall={handleCall}
                              setShowUsers={setShowUsers}
                              value={searchInput}
                              handleKeyPress={handleKeyPress}
                              handleSearchInputChange={handleSearchInputChange}
                            />
                          </>
                        ) : (
                          <div className="" style={{
                          }}>
                            <div
                              className="pt-5"
                              style={{
                                // backgroundColor: `rgba(42, 54, 73, ${1 - pcbData?.brightness / 100
                                //   })`,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box >
                                <Typography>

                                </Typography>
                              </Box>
                              <div style={{
                                paddingBottom: "30px",
                                paddingTop: "30px",
                              }}>
                                <img src={LogoIcon} alt="" />
                              </div>
                              <div className="pt-2" style={{ color: "white" }}>
                                <h5> Welcome to</h5>{" "}
                                <h1
                                  style={{
                                    fontFamily: "Fredoka One, sans-serif",
                                  }}
                                >
                                  {pcbData?.WelcomMessage
                                    ? pcbData?.WelcomMessage
                                    : "QR DoorMan"}
                                </h1>
                              </div>
                              {/*  */}
                              <div
                                className=""
                                onClick={handleShowUsers}
                              >
                                <img src={callIcon} alt="" width={"300px"} />
                              </div>
                              <div>
                                <img src={OrIcon} style={{ minWidth: 293, maxWidth: 350, width: "100%" }} alt="" />
                              </div>

                              <div
                                className=""
                                style={{
                                  color: "white",
                                  fontSize: "13px",
                                  fontFamily: "Inter",
                                  paddingBottom: "1rem",
                                  paddingTop: "1rem",
                                }}
                              >
                                <span style={{ fontWeight: "700" }}>
                                  Enter the PIN{" "}
                                </span>
                                <span style={{ fontWeight: "400" }}>
                                  if you know it and press{" "}
                                </span>{" "}
                                <span style={{ fontWeight: "700" }}>OK</span>{" "}
                                <span style={{ fontWeight: "400" }}>
                                  {" "}
                                  to open the Gate.{" "}
                                </span>
                              </div>
                              <div
                                className="pb-0"
                              >
                                <img
                                  style={{ position: "relative", width: "11px", height: "15px", marginLeft: "10px" }}
                                  src={NumPadSmallIcon}
                                  alt=""
                                />
                                <input
                                  type="text"
                                  style={{
                                    ...InputDivStyle,
                                    ...getBackgroundStyle(okIconColor)
                                  }}
                                  placeholder="Enter PIN"
                                  value={pin}
                                  onChange={(e) => setPin(e.target.value)}
                                  maxLength={6}
                                />
                                <img
                                  src={
                                    okIconColor === "1"
                                      ? greenOk
                                      : okIconColor === "-1"
                                        ? redOk
                                        : yellowOk // Default to yellow when okIconColor is "0"
                                  }
                                  width={70}
                                  alt=""
                                  onClick={handleOkIconClick}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <SearchResults
                        AdminData={AdminData}
                        CommercialResidents={CommercialResidents}
                        setPage={setPage}
                        page={page}
                        value={searchInput}
                        handleKeyPress={handleKeyPress}
                        handleSearchInputChange={handleSearchInputChange}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {pcbData?.sensor === "1" &&
                    <Residential_Screen
                      pcbData={pcbData}
                      residentialPropertyId={residentialPropertyId}
                      AdminData={AdminData}
                      brightness={brightness}
                      propId={propId}
                      pcbId={pcbId}
                    />
                  }
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default VisitorScreen;

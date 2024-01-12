import LogoIcon from "../../assests/header_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import OKIcon from "../../assests/ok.png";
import NumPadSmallIcon from "../../assests/numpad_smal_icon.svg";
import { TextField, IconButton } from "@mui/material";
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
import SensorError from './SensorError'

const userOuterDiv = {
  border: "#FFF solid 1px",
  // margin: "5px",
  marginRight: "auto",
  marginLeft: "auto",
  padding: "5px",
  borderRadius: "15px",
  width: "97%",
  maxHeight: "424px",
  overflowY: "auto",
  height: "275px",
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

function VisitorScreen() {
  const { pcbId } = useParams();
  const [pin, setPin] = useState("");
  const [CommercialResidents, setCommercialResidents] = useState([]);
  const [AdminData, setAdminData] = useState();
  const [propId, setPropId] = useState("");
  const [propertyType, setpropertyType] = useState("");
  const [loading, setLoading] = useState(true);
  const [brightness, setBrightness] = useState(50);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState("main");
  const [data, setData] = useState(null);
  const [pcbData,setPcbData] =useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://192.168.18.147:8000/commercialAdmin/visitor_residents/${pcbId}`
        );
        // Update the state with the fetched properties
        setCommercialResidents(response.data.residents || []);

        setPropId(response.data.propId);
        setpropertyType(response.data.proptype);
        setAdminData(response.data.AdminData);
        setData(response.data.data);
        setPcbData(response.data.residentsData)
        // console.log(pcbData.sensor)
        // if(pcbData.sensor === "0"){
        //   navigate("/sensor_error")
        // }
        // if(pcbData.sensor === "1"){
          if (response.data.AdminData.brightness) {
            setBrightness(response.data.AdminData.brightness);
          } else if (response.data.AdminData.opacity) {
            setBrightness(response.data.AdminData.opacity);
          }
           setLoading(false);
        //   console.log(CommercialResidents);
        // }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching properties:");
        setLoading(false);
        alert("error.response.data.error");
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
    document.body.style.minWidth = "350px";
  }, []);

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
      navigate(`/videoCall/${pcbId}`);
    } catch (error) {
      console.error("Error in handleCall:", error);
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      }
      // Handle the error if needed
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
        `https://192.168.18.147:8000/commercialAdmin/accessDoorWithPin/${comId}`,
        {
          pin: pin,
        }
      );

      // Handle the response if needed
      if (response.data.sensorCheck) {
        alert("sensorCheck true");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.sensorCheck);
      if (error.response.data.sensorCheck === false) {
        alert(error.response.data.error);
        navigate("/sensor_error");
      } else {
        console.error("Error making POST request:", error);
        alert(error.response.data.error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const filteredResidents = Object.keys(CommercialResidents).filter(
        (residentId) =>
          CommercialResidents[residentId].name
            .toLowerCase()
            .includes(searchInput.toLowerCase())
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

  // const OpacityValue = {
  //   ...dynamicBackgroundStyle,
  // };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(pcbData)
  return (
    <>
      <Loader open={loading} />
      {loading ? (
        <>loading</>
      ) : (
        <>
        {pcbData.sensor ==="0" ? (<><SensorError/></>):(<>
          {propertyType === "commercial" ? (
            <>
              {page === "main" ? (
                <>
                  <div style={dynamicBackgroundStyle}>
                    <div
                      className="d-grid justify-content-center pt-5"
                      style={{
                        backgroundColor: `rgba(42, 54, 73, ${
                          1 - brightness / 100
                        })`,
                      }}
                    >
                      <div>
                        <img src={LogoIcon} alt="" />
                      </div>
                      <div className="mt-2" style={{ color: "white" }}>
                        <h5> Welcome to</h5>{" "}
                        <h1>
                          {AdminData.WelcomMessage
                            ? AdminData.WelcomMessage
                            : "QR DoorMan"}
                        </h1>
                      </div>
                      <div>
                        <TextField
                          sx={{
                            backgroundColor: "#ECECEC",
                            width: "97%",
                            // height:"38px",
                            borderRadius: 25,
                            margin: "10px",
                          }}
                          id="textfield"
                          placeholder="Search Name"
                          value={searchInput}
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

                      <div >
                        
                        <UsersCard
                          usersData={CommercialResidents}
                          handleCall={handleCall}
                        />
                      </div>


                      {/* <div className="p-1"> <img src={kIcon} alt="" width="98%" /></div>
                       
                       
                <UsersCard usersData={data}  handleCall={handleCall}/> */}
                      <div
                        className="mt-3 mb-3"
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontFamily: "Inter",
                        }}
                      >
                        <span style={{ fontWeight: "700" }}>
                          Enter the PIN{" "}
                        </span>
                        <span style={{ fontWeight: "400" }}>
                          if you know it and press{" "}
                        </span>{" "}
                        <span style={{ fontWeight: "700" }}> OK</span>{" "}
                        <span style={{ fontWeight: "400" }}>
                          {" "}
                          to open the Gate.{" "}
                        </span>
                      </div>
                      <div
                        className=" mb-3"
                        style={{ marginRight: "auto", marginLeft: "auto" }}
                      >
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
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Residential_Screen
                AdminData={AdminData}
                brightness={brightness}
                propId={propId}
                pcbId={pcbId}
              />
            </>
          )}
        

        </>) }
        
        </>
      )}
    </>
  );
}

export default VisitorScreen;

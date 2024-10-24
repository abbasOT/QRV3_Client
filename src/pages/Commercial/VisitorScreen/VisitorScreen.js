import React, { useState, useRef, useEffect } from "react";
import Header from "../../../components/Commercial/Header/Header";
import QrCodeIcon from "../../../assests/download_qr_icon.svg";
import uploadIcon from "../../../assests/upload_icon.svg";
import IntercomIcon from "../../../assests/intercomId_icon.png";
import BrightnessIcon from "../../../assests/brightness_icon.svg";
import IntercomIdModal from "../../../components/Commercial/IntercomIdModal/InterComModal";
import VisitorScreenCard from "../../../components/Commercial/VisitorScreenCard/VisitorScreenCard";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Loader from "../../../pages/Loader/Loader";
import Slider from "@mui/material/Slider";
import DownloadQRModal from "../../../components/Commercial/DownloadQRModal/DownloadQR";
import { Link, useNavigate } from "react-router-dom";

const InputDivStyle = {
  borderRadius: "5px",
  width: "312px",
  height: "37px",
  border: "none",
  backgroundColor: "#EEE",
  paddingLeft: "10%",
};

const btnStyle = {
  width: "312px",
  height: "37px",
  borderRadius: "10px",
  border: "#566D90 solid 1px",
  backgroundColor: "white",
  color: "#566D90",
  fontWeight: "600",
};
const brightBtn = {
  ...btnStyle,
  width: "182px",
  fontWeight: "400",
}

const InterCombtnStyle = {
  width: "312px",
  height: "37px",
  borderRadius: "20px",
  border: "#566D90 solid 1px",
  backgroundColor: "white",
  color: "#566D90",
  fontWeight: "600",
};

const iconStyle = {
  marginLeft: "10px",
};
function VisitorScreen() {
  const [progressValue, setProgressValue] = useState(0);
  const [showIntercomModal, setInterIdModal] = useState(false);
  const [WelcomMessage, setWelcomeMessage] = useState("");
  const [commercialData, setCommercialData] = useState(null);
  const [ResidentsData, setResidentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [brightness, setBrightness] = useState(0);
  const [showQRModal, setQRModal] = useState(false);
  const [pcbId, setpcbId] = useState("");
  const [Data, setData] = useState(null);
  const navigate = useNavigate();

  console.log(pcbId)
  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };


  let com_prop_id = localStorage.getItem("userKey");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ot-technologies.com/commercialAdmin/get_ComAdmin/${com_prop_id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCommercialData(data.commercialAdmin);
        setResidentsData(data.residentsData);
        setData(data.AdminData)
        if (data.commercialAdmin.brightness) {
          setBrightness(data.commercialAdmin.brightness || 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    };

    fetchData();
  }, [com_prop_id]);

  const handleProgressBarClick = (e) => {
    const progressBarWidth = e.target.offsetWidth;
    const clickedPercentage = parseInt(
      (e.nativeEvent.offsetX / progressBarWidth) * 100,
      10
    );

    setProgressValue(clickedPercentage);
  };

  const handleOpenModal = () => {
    setInterIdModal(true);
    console.log(showIntercomModal);
  };

  const handleEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        // Make a POST request to the server
        const response = await axios.post(
          `https://ot-technologies.com/commercialAdmin/WelcomMessage/${com_prop_id}`,
          {
            WelcomMessage: e.target.value,
          }
        );

        console.log(response.data);
        alert(response.data.message);
        setCommercialData(response.data.commercialData);
        // Clear the input field after successful submission
        setWelcomeMessage("");
      } catch (error) {
        alert(error.response.data.error);
        console.error("Error making POST request:", error);
        if (error.response.data.login) {
          alert(error.response.data.message);
          navigate("/login");
        }
        // Handle the error if needed
      }
    }
  };

  //uploadWallpaper

  const fileInputRef = useRef(null);

  const handleWallpaper = () => {

    // Trigger click on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setLoading(true)
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    try {

      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/uploadWallpaper/${com_prop_id}`,
        formData
      );

      setLoading(false)
      console.log("File uploaded successfully", response.data);
      alert(response.data.message);
      setCommercialData(response.data.commercialData);
    } catch (error) {
      console.error("Error uploading file", error);
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  };
  const DownloadQR = async () => {
    if (!commercialData.pcbId) {
      alert("first Add PcbId");
      return;
    }

    const pcbId = commercialData.pcbId;
    setpcbId(pcbId);
    setQRModal(true);
  };

  const saveBrightnessValue = () => {
    // Make a POST request using Axios
    axios
      .post(
        `https://ot-technologies.com/commercialAdmin/savebrightness/${com_prop_id}`,
        { brightness }
      )
      .then((response) => {
        // Handle successful response
        alert(response.data.message);
        console.log("Timer set successfully", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error setting timer:", error.message);
        if (error.response.data.login) {
          alert(error.response.data.message);
          navigate("/login");
        }
      });
  };

  return (

    <>
      <Loader open={loading} />

      <div>
        <Header />
        <div className="container mt-4" style={{ minWidth: "1300px" }}>
          <div className="row align-items-center justify-content-around">
            <div className="col-5">
              <div className="mb-5">
                <input
                  type="text"
                  style={InputDivStyle}
                  placeholder="Write a welcome message..."
                  value={WelcomMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  onKeyPress={handleEnterKeyPress}
                />
              </div>
              <hr />
              <div className="mt-5 mb-5">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  style={btnStyle}
                  type="button"
                  className="btn btn-primary "
                  onClick={handleWallpaper}
                >
                  Wallpaper
                  <img style={iconStyle} src={uploadIcon} alt="" />
                </button>
              </div>

              <hr />

              <div className="mt-5 mb-5 d-flex justify-content-center">
                <div
                  onClick={handleProgressBarClick}
                  style={{ cursor: "pointer", width: "316px", height: "21px" }}
                >
                  <div className="d-flex">
                    <div style={{ marginRight: "15px" }}>
                      <img src={BrightnessIcon} alt="" />
                    </div>
                    <Slider
                      value={brightness}
                      onChange={handleBrightnessChange}
                    />
                  </div>

                  {/* <ProgressBar
                  now={progressValue}
                  style={getProgressBarStyle()} // Use the dynamic style
                /> */}
                </div>
              </div>

              {/* <hr /> */}

              <div className="mt-5  mb-5">
                <button
                  style={brightBtn}
                  type="button"
                  onClick={saveBrightnessValue}
                  className="btn btn-primary "
                >
                  Save Brightness
                </button>
              </div>

              <hr />

              <div className="mt-5 ">
                <button
                  style={btnStyle}
                  type="button"
                  className="btn btn-primary  mb-5 "
                  onClick={DownloadQR}
                >
                  Download QR <img style={iconStyle} src={QrCodeIcon} alt="" />
                </button>
              </div>

              <hr />
              <div className="mt-5  mb-5">
                <button
                  style={InterCombtnStyle}
                  type="button"
                  className="btn btn-primary "
                  onClick={handleOpenModal}
                >
                  Intercom ID <img style={iconStyle} src={IntercomIcon} alt="" />
                </button>
              </div>

              {/* <hr /> */}
            </div>

            <div className="col-6 " style={{ display: "contents" }}>
              {loading ? (
                <>loading</>
              ) : (
                // Render your component with the fetched data
                <VisitorScreenCard
                  CommercialData={commercialData}
                  ResidentsData={ResidentsData}
                  brightness={brightness}
                  Data={Data}
                />
              )}
            </div>
          </div>
        </div>
        <Modal
          centered
          className="abc"
          show={showQRModal}
          onHide={() => setQRModal(false)}
        >
          <Modal.Body>
            <DownloadQRModal pcbId={pcbId} setQRModal={setQRModal} />
          </Modal.Body>
        </Modal>

        <Modal
          size=""
          centered
          className="abc"
          show={showIntercomModal}
          style={{ width: "", height: "" }}
          onHide={() => setInterIdModal(false)}
        >
          <Modal.Body>
            <IntercomIdModal setInterIdModal={setInterIdModal} commercialData={commercialData} setCommercialData={setCommercialData} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default VisitorScreen;

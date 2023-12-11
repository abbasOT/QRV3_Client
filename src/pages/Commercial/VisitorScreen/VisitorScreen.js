import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Header from "../../../components/Commercial/Header/Header";
import QrCodeIcon from "../../../assests/download_qr_icon.svg";
import uploadIcon from "../../../assests/upload_icon.svg";
import IntercomIcon from "../../../assests/intercomId_icon.png";
import BrightnessIcon from "../../../assests/brightness_icon.svg";
import IntercomIdModal from '../../../components/Commercial/IntercomIdModal/InterComModal'
import VisitorScreenCard from "../../../components/Commercial/VisitorScreenCard/VisitorScreenCard";
import { Button, Card, Form ,Modal,} from "react-bootstrap";

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
  const [progressValue, setProgressValue] = useState(50);
  const [showIntercomModal, setInterIdModal] = useState(false);

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

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <div className="mb-5">
              <input
                type="text"
                style={InputDivStyle}
                placeholder="Write a welcome message..."
              />
            </div>
            <hr />
            <div className="mt-5 ">
              <button
                style={btnStyle}
                type="button"
                className="btn btn-primary"
              >
                Wallpaper
                <img style={iconStyle} src={uploadIcon} alt="" />
              </button>
            </div>

            <hr />

            <div className="mt-5 d-flex justify-content-center">
              <div
                onClick={handleProgressBarClick}
                style={{ cursor: "pointer", width: "316px", height: "21px" }}
              >
                <div>{/* <img src={BrightnessIcon} alt="" /> */}</div>

                <ProgressBar
                  now={progressValue}
                  // label={`${progressValue}%`}
                  style={{
                    height: "21px",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(90deg, #566D90 0%, #2A3649 100%)",
                    boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                  }} // Set a minimum width for the progress bar
                />
              </div>
            </div>

            <hr />

            <div className="mt-5 ">
              <button
                style={btnStyle}
                type="button"
                className="btn btn-primary"
              >
                Download QR <img style={iconStyle} src={QrCodeIcon} alt="" />
              </button>
            </div>

            <hr />

            <div className="mt-5 ">
              <button
                style={InterCombtnStyle}
                type="button"
                className="btn btn-primary"
                onClick={ handleOpenModal}
              >
                Intercom ID <img style={iconStyle} src={IntercomIcon}  alt="" />
              </button>
            </div>

            <hr />
          </div>

          <div className="col-6">
           <VisitorScreenCard/>
          </div>
        </div>
      </div>


      <Modal
        size=""
        centered
        className="abc"
        show={showIntercomModal}
        style={{ width: "", height: "" }}
        onHide={() => setInterIdModal(false)}
      >
       
        <Modal.Body>
          <IntercomIdModal />
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default VisitorScreen;

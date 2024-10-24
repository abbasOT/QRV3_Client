import Header from "../../../components/Commercial/Header/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, get, push } from "firebase/database";
import { app } from "../../../firebase";
import { Modal } from "react-bootstrap";
import BlockedModal from "../../../components/Commercial/BlockedAlertModal/BlockedModal";

const greenbtn = {
  backgroundColor: "#19a65b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const redbtn = {
  backgroundColor: "#DC5656",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width: "50px",
  height: "45px",
};

const PmStyle = {
  border: "#EEE solid 2px",
  padding: "5px 15px",

  borderRadius: "10px",
  width: "65px",
  height: "45px",
};

const btnStyle = {
  width: "360px",
  height: "40px",
  borderRadius: "10px",
  border: "#566D90 solid 2px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",
};
const divStyle = {
  width: "360px",
};
const timeDivStyle = {
  width: "105px",
  height: "45px",
  padding: "5px 25px",
  border: "#EEE solid 2px",
  borderRadius: "10px",
  marginRight: "10px",
};
function LightTimer() {
  const navigate = useNavigate();
  const [onTime, setonTime] = React.useState(dayjs("2022-04-17T15:30"));
  const [offTime, setOffTime] = React.useState(dayjs("2022-04-17T15:30"));
  const [showBlockModal, setBlockModal] = useState(false);
  const [PCBData, setPCBData] = useState([])

  useEffect(() => {

    const database = getDatabase();
    const userDevicesRef = ref(database, `PCB`);
    onValue(userDevicesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (typeof data === 'object') {
        let matchedObject;
        const searchProperty = 'propertyId'; // Property to match (e.g., 'propertyId')
        const searchValue = localStorage.getItem("userKey");
        if (!searchValue || searchValue === "") {

          setBlockModal(true)

        }
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key][searchProperty] === searchValue) {
            matchedObject = data[key]; // Store the first matching object
            break; // Exit the loop since we only need one match
          }
        }

        if (matchedObject) {
          const dbOnTime = matchedObject?.ontime ?? ""; // Get onTime from matchedObject (if exists)
          const dbOffTime = matchedObject?.offtime ?? ""; // Get offTime from matchedObject (if exists)

          // Parse the database time strings using dayjs
          const parsedOnTime = dayjs(dbOnTime, 'HH:mm a'); // Parse with format "HH:mm A"
          const parsedOffTime = dayjs(dbOffTime, 'HH:mm a'); // Parse with format "HH:mm A"

          // Update state with parsed dayjs objects for TimePicker compatibility
          setonTime(parsedOnTime);
          setOffTime(parsedOffTime);

        } else {
          console.log("No matching PCB objects found");
        }
      }


    });
  }, []);



  let com_prop_id = localStorage.getItem("userKey");

  const handleSetTimer = () => {
    const formattedOnTime = onTime.format('hh:mm a');
    const formattedOffTime = offTime.format('hh:mm a');
    // Make a POST request using Axios
    axios.post(`https://ot-technologies.com/commercialAdmin/setTimer/${com_prop_id}`, {
      ontime: formattedOnTime,
      offtime: formattedOffTime,
    })
      .then(response => {
        // Handle successful response
        alert(response.data.message)
        console.log('Timer set successfully', response);
      })
      .catch(error => {
        // Handle error
        console.error('Error setting timer:', error.message);
        if (error.response.data.login) {
          alert(error.response.data.message);
          navigate("/login");
          return;
        }
      });
  };

  const handleCloseModal = () => {
    setBlockModal(false);
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "10%" }}>
        <div className="row d-grid justify-content-center">
          <div className="col d-flex pb-4 justify-content-">
            <div
              style={divStyle}
              className="d-flex justify-content-center align-items-center"
            >
              <div style={{ marginRight: "50px" }}>
                {" "}
                <button style={greenbtn}>ON </button>{" "}
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker

                    value={onTime}
                    onChange={(newValue) => setonTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <hr />
          <div className="col d-flex pt-1 mb-5">
            <div
              style={divStyle}
              className="d-flex justify-content-center align-items-center"
            >
              <div style={{ marginRight: "50px" }}>
                <button style={redbtn}>OFF </button>{" "}
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker

                    value={offTime}
                    onChange={(newValue) => setOffTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="col-6 mt-5">
            <button style={btnStyle} type="button" onClick={handleSetTimer} className="btn btn-primary shadow">
              Set Timer
            </button>
          </div>
        </div>
      </div>

      <Modal
        size=""
        centered
        className="abc"
        show={showBlockModal}
        dialogClassName="border-radius"
        // style={{ borderRadius: '45px' }}
        onHide={handleCloseModal}
      >

        <Modal.Body>
          <BlockedModal />
        </Modal.Body>
      </Modal>


    </div>
  );
}

export default LightTimer;

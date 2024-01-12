import Header from "../../../components/Commercial/Header/Header";

import React, { useState } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
  const [onTime, setonTime] = React.useState(dayjs("2022-04-17T15:30"));
  const [offTime, setOffTime] = React.useState(dayjs("2022-04-17T15:30"));

  
  let com_prop_id = localStorage.getItem("userKey");

  const handleSetTimer = () => {
    const formattedOnTime = onTime.format('hh:mm A');
const formattedOffTime = offTime.format('hh:mm A');
    // Make a POST request using Axios
    axios.post(`${process.env.REACT_APP_URL1}/commercialAdmin/setTimer/${com_prop_id}`, {
      ontime: formattedOnTime,
      offtime: formattedOffTime,
    })
      .then(response => {
        // Handle successful response
        alert(response.data.message)
        console.log('Timer set successfully',response);
      })
      .catch(error => {
        // Handle error
        console.error('Error setting timer:', error.message);
      });
  };

  console.log(onTime)

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
            <button style={btnStyle} type="button"  onClick={handleSetTimer} className="btn btn-primary shadow">
              Set Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightTimer;

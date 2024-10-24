import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person.png";
import NumPadIcon from '../../../assests/numpad.png'
import AddPinIcon from '../../../assests/add_pin_icon.svg'
import { Button, Typography } from "@mui/material";
import DeleteIcon from "../../../assests/delete_icon.svg"
import { useNavigate } from "react-router-dom";


const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  fontSize: "16px",
  width: "300px",

  outline: "none",

};

const PinNameStyle = {
  ...inputFieldStyle,
  marginLeft: "30px",
}

const ABStyle = {
  color: "#19A752",
  fontWeight: "700",
  marginLeft: "30px",
  fontSize: "16px",
  marginTop: "6px"
}
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#566D90 solid 1px",
  backgroundColor: "white",
  textTransform: "none",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  color: "#566D90",
  fontWeight: 600,
  gap: "1rem",
  '&:hover': {
    background: "#FFF",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    color: "#566D90"
  }
};




const iconStyle = {
  marginLeft: "20px",
};

export default function AddPinCodeModal({ asciiValue, createPincode, PinCode, setPinCode, PinCodeName, setPinName, ModalStatus, pinId, setPinCodeModal }) {


  let com_prop_id = localStorage.getItem("userKey");
  const propertyId = localStorage.getItem("commercialPropId")

  const navigate = useNavigate();


  const updatePin = async () => {
    console.log(asciiValue);
    let pin = `${asciiValue}${PinCode}`;
    // Check if the PinCode is less than 4 digits
    if (PinCode.length < 4) {
      alert("Pin code must be exactly 4 digits");
      return; // Exit the function if the condition is met
    }

    try {
      const response = await axios.put(
        `https://ot-technologies.com/commercialAdmin/update_pins/${com_prop_id}/${pinId}`,
        {
          pinCode: pin,
          pinCodeName: PinCodeName,
          propertyId,
        }
      );
      console.log("API Response:", response.data);
      setPinCodeModal(false);
    } catch (error) {

      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data)
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  };


  const deletePin = async () => {
    try {
      const response = await axios.delete(
        `https://ot-technologies.com/commercialAdmin/delete_pins/${com_prop_id}/${pinId}?propertyId=${propertyId}`,
      );
      console.log("API Response:", response.data);
      setPinCodeModal(false);
    } catch (error) {

      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data)
      if (error.response.data.login) {
        alert(error.response.data.message);
        navigate("/login");
      }
    }
  };



  const [isListed, setIsListed] = useState(false);

  const handleChangePin = (e) => {
    const inputValue = e.target.value;
    // Check if the input value length is less than or equal to 4
    if (inputValue.length <= 4) {
      setPinCode(inputValue);
    }
  };



  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row align-items-center">
        <div className="col-12">
          <Card className=" " style={{ borderStyle: "none" }}>
            <Card.Body className="p-0">
              <div className="mb-" style={{ padding: "5% 8%" }}>
                <div className="mb-3">
                  <Form >
                    {/* 1 */}
                    <div className="d-flex mt-">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="input-field"
                        placeholder="PIN Code Name"
                        style={PinNameStyle}
                        maxLength={20}
                        autoComplete="off"
                        value={PinCodeName}
                        onChange={(e) => setPinName(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={NumPadIcon} alt="User Icon" style={iconStyle} />
                      <span style={ABStyle}>{asciiValue}</span>

                      <input
                        id="input-field"
                        placeholder="Pin Code"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={PinCode}
                        onChange={(e) => {
                          const { value } = e.target;
                          const numericValue = value.match(/\d*/g)?.join('') || '';
                          handleChangePin({ target: { value: numericValue } });
                        }}

                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}

                    <Typography sx={{ textAlign: "center", fontSize: "0.75rem", fontFamily: "Poppins", color: "#566D90" }}>
                      NOTE: Share the green letters along with the PIN Code
                    </Typography>

                    <div className="d-grid justify-content-center pt-3 gap-3">
                      {
                        (ModalStatus !== "activePinCode") &&
                        <Button
                          sx={btnStyle}
                          className="btn btn-primary shadow-sm mt-3 mb-3"
                          onClick={createPincode}
                        >
                          <img src={AddPinIcon} alt="" /> Add PIN Code
                        </Button>
                      }

                      {
                        (ModalStatus === "activePinCode") &&
                        <>
                          <Button
                            sx={btnStyle}
                            className="btn btn-primary mt-2"
                            onClick={updatePin}
                          >
                            Save
                          </Button>


                          <Button
                            sx={{ ...btnStyle, fontWeight: 400 }}
                            className="btn btn-primary mt-2"
                            onClick={deletePin}
                          >
                            <img src={DeleteIcon} alt="" />
                            Delete
                          </Button>
                        </>
                      }


                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

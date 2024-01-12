import axios from "axios";
import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person.png";
import NumPadIcon from '../../../assests/numpad.png'
import AddPinIcon from '../../../assests/add_pin_icon.svg'

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

const PinNameStyle ={
  ...inputFieldStyle,
  marginLeft: "30px",
}

const ABStyle ={
  color:"#19A752",
  fontWeight:"700",
  marginLeft: "30px",
  fontSize: "16px",
  marginTop:"6px"
}
const btnStyle = {
  width: "230px",
  height: "37px",
  borderRadius: "10px",
  border: "#2A3649 solid 1px",
  backgroundColor: "white",
  color: "#2A3649",
  fontWeight: "600",
};

const iconStyle = {
  marginLeft: "20px",
};

export default function AddPinCodeModal({createPincode ,PinCode,setPinCode, PinCodeName,setPinName}) {


 

  const [isListed, setIsListed] = useState(false);
 



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
                        autoComplete="off"
                        value={PinCodeName} 
                        onChange={(e) => setPinName(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={NumPadIcon} alt="User Icon" style={iconStyle} />
                      <span  style={ABStyle}>AB</span> 

                      <input
                        type="text"
                        id="input-field"
                        placeholder="Pin Code"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={PinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}

                    <div className="d-grid justify-content-center">
                      <button
                        style={btnStyle}
                        type="button"
                        className="btn btn-primary shadow-sm mt-3 mb-3"
                        onClick={createPincode}
                      >
                        <img src={AddPinIcon} alt="" /> Add PIN Code
                      </button>

                     
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

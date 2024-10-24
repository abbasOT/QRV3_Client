import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import LoadingScreen from "../../../pages/Loader/Loader";
import Name_Icon from "../../../assests/person_blue_icon.svg";
import MailIcon from "../../../assests/mail_blue_icon.svg";
import sendIcon from "../../../assests/send_icon.svg";
import BlockIcon from '@mui/icons-material/Block';
import { Divider, Button } from "@mui/material";
import DeleteIcon from "../../../assests/delete_icon.svg"
import ReplayIcon from '@mui/icons-material/Replay';
import Address_Icon from "../../../assests/address_blue_icon.svg"
import Phone_Icon from "../../../assests/phone_blue_icon.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
  opacity: "unset"
};
const inputFieldStyle = {
  border: "none",
  background: "none",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: 500,
  width: "300px",
  marginLeft: "30px",
  outline: "none",
  color: "#566D90",

};
const btnStyle = {
  minWidth: "230px",
  textTransform: "none",
  gap: "1rem",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  height: "37px",
  borderRadius: "10px",
  border: "#566D90 solid 1px",
  background: "#FFF",
  color: "#566D90",
  fontWeight: "600",
  '&:hover': {
    background: "#FFF",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    color: "#566D90"
  }
};

const suspendButton = {
  background: "#D0301F", border: "none", color: "#FFF", boxShadow: '0px 4px 4px 0px #00000040', mb: "1rem",
  '&:hover': {
    background: "#D0301F",
    color: "#FFF"
  }
}

const reactiveButton = {
  background: "#19A752", border: "none", color: "#FFF", boxShadow: '0px 4px 4px 0px #00000040', mb: "1rem",
  '&:hover': {
    background: "#19A752",
    color: "#FFF"
  }
}
const iconStyle = {
  marginLeft: "20px",
};

export default function AddResidentModal({
  formData,
  setFormData,
  handleSendInvitation,
  ModalStatus,
  selectedResident,
  setAddUserModal
}) {
  const [isListed, setIsListed] = useState(false);


  let com_prop_id = localStorage.getItem("userKey");
  const propertyId = localStorage.getItem("commercialPropId")
  const userId = selectedResident?.userID

  const navigate = useNavigate();


  const updateResident = async (actionType) => {

    try {
      const response = await axios.put(
        `https://ot-technologies.com/commercialAdmin/update_resident/${com_prop_id}/${userId}`,
        {
          propertyId: propertyId,
          commercialResidentId: userId,
          actionType: actionType,
        }
      );
      console.log("API Response:", response.data.message);
      setAddUserModal(false);
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


  const deleteResident = async () => {
    try {
      const response = await axios.delete(
        `https://ot-technologies.com/commercialAdmin/delete_resident/${com_prop_id}/${userId}?propertyId=${propertyId}`,
      );
      console.log("API Response:", response.data);
      setAddUserModal(false);
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



  return (
    <div className="container">
      <LoadingScreen open={isListed} />
      <div className="row align-items-center pt-3 pb-1">
        <div className="col-7">
          <Card className=" " style={{ borderStyle: "none" }}>
            <Card.Body className="p-0">
              <div className="mb-" style={{ padding: "5% 8%" }}>
                <div className="mb-3">
                  <Form onSubmit={""}>
                    {/* 1 */}
                    <div className="d-flex mt-">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        className="residentialModalInputField"
                        id="name-input-field"
                        placeholder="Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={ModalStatus === "addResident" ? formData.name : selectedResident?.firstName} // Bind email state to the input value
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        } // Update email state on input change
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/* 2 */}
                    <div className="d-flex mt-3">
                      <img src={Name_Icon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        id="lname-input-field"
                        className="residentialModalInputField"
                        placeholder="Last Name"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={ModalStatus === "addResident" ? formData.lname : selectedResident?.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lname: e.target.value })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>
                    {/*  */}



                    <div>
                      {ModalStatus !== "addResident" && (
                        <>
                          <div className="d-flex mt-3">
                            <img src={Address_Icon} style={iconStyle} alt="User Icon" />
                            <input
                              type="text"
                              placeholder="Address"
                              className="residentialModalInputField"
                              id="input-field"
                              style={inputFieldStyle}
                              autoComplete="off"
                              value={selectedResident?.address}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                            />
                          </div>
                          <hr style={hrStyle} />

                          <div className="d-flex mt-3">
                            <img src={Phone_Icon} style={iconStyle} alt="User Icon" />
                            <input
                              type="text"
                              placeholder="Phone Number"
                              className="residentialModalInputField"
                              id="input-field"
                              style={inputFieldStyle}
                              autoComplete="off"
                              value={selectedResident?.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                            />
                          </div>
                          <hr style={hrStyle} />
                        </>
                      )}
                    </div>


                    <div className="d-flex mt-3 ">
                      <img src={MailIcon} alt="User Icon" style={iconStyle} />
                      <input
                        type="text"
                        placeholder="Email"
                        className="residentialModalInputField"
                        id="email-input-field"
                        style={inputFieldStyle}
                        autoComplete="off"
                        value={ModalStatus === "addResident" ? formData.email : selectedResident?.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <hr style={hrStyle}></hr>

                    {/* 3 */}

                    <div>
                      {ModalStatus === "addResident" && (
                        <div className="d-flex mt-3">
                          <img src={MailIcon} alt="User Icon" style={iconStyle} />
                          <input
                            type="text"
                            placeholder="Confirm Email"
                            className="residentialModalInputField"
                            id="email-input-field"
                            style={inputFieldStyle}
                            autoComplete="off"
                            value={formData.repeatEmail}
                            onChange={(e) =>
                              setFormData({ ...formData, repeatEmail: e.target.value })
                            }
                          />
                        </div>
                      )}
                      {ModalStatus === "addResident" && <hr style={hrStyle} />}
                    </div>


                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-1" style={{ width: "6.3%" }}>
          <Divider orientation="vertical" sx={{ border: "3px solid #EDEDED", opacity: "unset", height: 330, width: 3, borderRadius: "0.75rem" }} />
        </div>

        <div className="col-4" style={{}}>

          {
            ModalStatus === "activeResident" &&
            <Button
              sx={{ ...btnStyle, ...suspendButton }}
              className="btn btn-primary mt-2"
              onClick={() => updateResident("suspend")}
            >
              <BlockIcon sx={{ transform: 'rotate(270deg)' }} />
              Suspend Resident
            </Button>
          }


          {ModalStatus === "suspendedResident" &&
            <Button
              sx={{ ...btnStyle, ...reactiveButton }}
              className="btn btn-primary mt-2"
              onClick={() => updateResident("reactive")}
            >
              <ReplayIcon sx={{ transform: 'scaleX(-1) rotate(-20deg)', }} />
              Reactive Resident
            </Button>}


          {ModalStatus === "addResident" &&
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleSendInvitation}
            >
              Send Invitation{" "}
              <img style={{ marginLeft: "20px" }} src={sendIcon} alt="" />
            </button>
          }

          {
            (ModalStatus === "activeResident" || ModalStatus === "notLinked" || ModalStatus === "subscriptionCancelled" || ModalStatus === "suspendedResident") &&
            <Button
              sx={{ ...btnStyle, fontWeight: 400 }}
              className="btn btn-primary mt-2"
              onClick={deleteResident}
            >
              <img src={DeleteIcon} alt="" />
              Delete Resident
            </Button>
          }



        </div>
      </div>
    </div>
  );
}

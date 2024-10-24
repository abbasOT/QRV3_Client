import Header from "../../../components/Commercial/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import AddPinIocn from "../../../assests/add_pin_icon.svg";
import Form from "react-bootstrap/Form";
import PinCodeCard from "../../../components/Commercial/PinCodeCard/PinCodeCard";
import PinCodeIcon from "../../../assests/pin_code.svg";
import React, { useEffect, useState } from "react";
import AddPinCodeModal from "../../../components/Commercial/AddPinCodeModal/AddPinModal";
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeModalIcon from "../../../assests/pin_code_modal_icon.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const iconStyle = {
  position: "relative",
  marginRight: "-40px",
};

const btnStyle = {
  width: "180px",
  height: "36px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#EEE",
  color: "#2A3649",
  fontWeight: "700",
  boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.2)"
};
const SearchInputStyle = {
  border: "none",
  backgroundColor: "#EEEEEE",
  color: "#8E8E8E",
  paddingLeft: "50px",
};

function PinCode() {
  const [showPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();
  const [PinsData, setPins] = useState([]);
  const [PinsData2, setPins2] = useState([]);
  const [PinCodeName, setPinName] = useState();
  const [PinCode, setPinCode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [asciiValue, setAsciiValue] = useState("");
  const navigate = useNavigate();


  const handleOpenModal = (item) => {
    setPinCodeModal(true);
    console.log(showPinCodeModal);
    setUserName(item.name);
  };


  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // If the input value is empty, reset the users state to its original value
    if (inputValue.trim() === "") {
      setPins(PinsData2);

    }
  };


  let com_prop_id = localStorage.getItem("userKey");

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Make a GET request to fetch residents with the specified comPropId
        const response = await axios.get(
          `https://ot-technologies.com/commercialAdmin/get_pins/${com_prop_id}`
        );

        // Assuming the response contains a property 'residents' with an array of resident data
        setPins(response.data.pins);
        setPins2(response.data.pins)
        setAsciiValue(response.data.SC);
        //special characters
        console.log(response.data.pins);
      } catch (error) {
        console.error("Error fetching residents:", error);
        if (error.response.data.login) {
          alert(error.response.data.message);
          navigate("/login");
        }
        // Handle error if needed
      }
    };

    fetchResidents();
  }, []);

  const createPincode = async () => {
    console.log(asciiValue);
    let pin = `${asciiValue}${PinCode}`;

    try {
      const response = await axios.post(
        `https://ot-technologies.com/commercialAdmin/add_pins/${com_prop_id}`,
        {
          PinCode: pin,
          PinCodeName,
        }
      );
      console.log("API Response:", response.data);
      setPins(response.data.pins);
      setPinCodeModal(false);
      setPinName("");
      setPinCode("");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform search logic here, for example, filter residents based on searchInput
      const filteredResidents = Object.keys(PinsData).filter((residentId) =>
        PinsData[residentId].PinCodeName.toLowerCase().includes(
          searchInput.toLowerCase()
        )
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => PinsData[residentId]
      );

      // Update the state with the filtered residents
      setPins(filteredResidentsArray);

      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row mt-4 d-flex justify-content-between">
          <div
            className="col-2 "
            style={{ textAlign: "left", color: "#566D90" }}
          >
            {" "}
            <span>
              Total PIN Code{" "}
              <span style={{ fontWeight: "700" }}>
                {" "}
                <>{PinsData ? Object.keys(PinsData).length : 0}</>
              </span>{" "}
            </span>
          </div>
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary "
              onClick={handleOpenModal}
            >
              <img
                src={AddPinIocn}
                style={{ marginRight: "15px" }}
                alt=""
              />

              Add PIN Code
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 d-flex">
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search Resident"
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <hr className="mt-5" />
        <div className="row mt-5 ">
          <PinCodeCard
            icon={PinCodeIcon}
            dataArray={PinsData}
            setPins={setPins}
          />
        </div>
      </div>

      <Modal
        centered
        className="abc"
        show={showPinCodeModal}
        style={{ width: "", height: "", marginLeft: "", marginRight: "auto" }}
        onHide={() => setPinCodeModal(false)}
      >
        <Modal.Title
          className="w-100 text-center pt-2"
          style={{
            alignItems: "center",
            height: "62px",
            backgroundColor: "#2A3649",
            color: "white",
          }}
        >
          <img style={{ marginRight: "30px" }} src={PinCodeModalIcon} alt="" />
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Open Sans",
              fontSize: "20px",
            }}
          ></span>
          {username}
        </Modal.Title>
        <Modal.Body>
          <AddPinCodeModal
            asciiValue={asciiValue}
            createPincode={createPincode}
            PinCodeName={PinCodeName}
            setPinName={setPinName}
            PinCode={PinCode}
            setPinCode={setPinCode}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PinCode;

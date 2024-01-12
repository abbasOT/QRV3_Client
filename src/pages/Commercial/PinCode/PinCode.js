
import Header from '../../../components/Commercial/Header/Header'
import searchIcon from "../../../assests/search_icon.svg";
import AddResidentIocn from "../../../assests/add_resident_icon.svg";
import Form from "react-bootstrap/Form";
import PinCodeCard from '../../../components/Commercial/PinCodeCard/PinCodeCard'
import PinCodeIcon from '../../../assests/pin_code.svg'
import React, { useEffect, useState } from "react";
import AddPinCodeModal from '../../../components/Commercial/AddPinCodeModal/AddPinModal';
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeModalIcon from "../../../assests/pin_code_modal_icon.svg";
import axios from "axios";

const iconStyle = {
    position: "relative",
    marginRight: "-40px", 
  };
  
const btnStyle = {
    width: "180px",
    height: "32px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#EEE",
    color: "#2A3649",
    fontWeight: "700",
  };
  const SearchInputStyle = {
    border: "none",
    backgroundColor: "#EEEEEE",
    color: "#8E8E8E",
    paddingLeft:"50px"
  
  };




function PinCode() {

  const [showPinCodeModal, setPinCodeModal] = useState(false);
  const [username, setUserName] = useState();
  const [PinsData, setPins] = useState([]);
  const [PinCodeName,setPinName] = useState()
  const [PinCode , setPinCode] =useState("")
  const [searchInput, setSearchInput] = useState("");

  const handleOpenModal = (item) => {
    setPinCodeModal(true);
    console.log(showPinCodeModal);
    setUserName(item.name);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  let com_prop_id = localStorage.getItem("userKey");
  
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Make a GET request to fetch residents with the specified comPropId
        const response = await axios.get(
          `https://localhost:8000/commercialAdmin/get_pins/${com_prop_id}`
        );

        // Assuming the response contains a property 'residents' with an array of resident data
        setPins(response.data.pins);
        console.log(response.data.pins)
        
      } catch (error) {
        console.error("Error fetching residents:", error);
        // Handle error if needed
      }
    };

    fetchResidents();
  }, []);

  const createPincode= async () => {
    try {
const pin = `AB${PinCode}` 
      const response = await axios.post(
        `https://localhost:8000/commercialAdmin/add_pins/${com_prop_id}`,
        {
          PinCode:pin,
          PinCodeName
        }
       
      );
      console.log("API Response:", response.data);
      setPins(response.data.pins);
      setPinCodeModal(false)
        setPinName("")
        setPinCode("")

    } catch (error) {
      console.error("Error sending invitation:", error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform search logic here, for example, filter residents based on searchInput
      const filteredResidents = Object.keys(PinsData).filter((residentId) =>
      PinsData[residentId].PinCodeName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
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
            Total PIN Code <span style={{ fontWeight: "700" }}>    <>{PinsData ? Object.keys(PinsData).length : 0}</></span>{" "}
            </span>
          </div>
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              onClick={handleOpenModal}
            >
              <img
                src={AddResidentIocn}
                style={{ marginRight: "5px" }}
                alt=""
              />{" "}
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
        <div className="row mt-5 justify-content-around">
        <PinCodeCard icon={PinCodeIcon}  dataArray={PinsData} setPins={setPins}/>
        </div>
      </div>

      <Modal
        
        centered
        className="abc"
        show={showPinCodeModal}
        style={{ width: "", height: "",marginLeft:"",marginRight:"auto" }}
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
          <AddPinCodeModal    createPincode={createPincode} PinCodeName={PinCodeName} setPinName={setPinName} PinCode={PinCode} setPinCode={setPinCode} />
        </Modal.Body>
      </Modal>


    </div>
  )
}

export default PinCode
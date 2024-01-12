import React, { useEffect, useState } from "react";
import Header from "../../../components/Commercial/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import AddResidentIocn from "../../../assests/pdf_icon.svg";
import Form from "react-bootstrap/Form";
import { Dropdown, Modal, Button } from "react-bootstrap";
import PinCodeIcon from "../../../assests/pin_code.svg";
import EventCard from "../../../components/Commercial/EventsCard/EventCard";
import axios from "axios";
import DateFromModal from "../../../components/Commercial/DateFromModal/DateFromModal";
import DateToModal from "../../../components/Commercial/DateToModal/DateToModal";
import jsPDF from "jspdf";

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
  paddingLeft: "50px",
};

function Events() {
  const [ShowFromModal, setShowFromModal] = useState(false);
  const [ShowToModal, setShowToModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [events, setEvents] = useState([]);

  const handleOpenModal = () => {
    // if(!events ){
    //   alert("moye moye")
    //   return
    // }
    setShowFromModal(true);
    console.log(ShowFromModal);
  };

  let comId = localStorage.getItem("userKey");
  useEffect(() => {
    // Function to fetch properties
    const fetchProperties = async () => {
      try {
        // Make a GET request to get properties
        const response = await axios.get(
          `https://localhost:8000/commercialAdmin/getEvents/${comId}`
        );

        setEvents(response.data.EventData || []);
      } catch (error) {
        console.log("Error fetching properties:");
        // alert(error.response.data.error);
      }
    };

    // Call the function to fetch properties when the component mounts
    fetchProperties();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform search logic here, for example, filter residents based on searchInput
      const filteredResidents = Object.keys(events).filter((residentId) =>
        events[residentId].name
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );

      const filteredResidentsArray = filteredResidents.map(
        (residentId) => events[residentId]
      );

      // Update the state with the filtered residents
      setEvents(filteredResidentsArray);

      console.log(
        filteredResidentsArray,
        "Filtered Residents:",
        filteredResidents
      );
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(fromDate);

  const handleExportPdf = async () => {
    if (!fromDate) {
      alert("Enter from date");
      return;
    }
    if (!toDate) {
      alert("Enter to date");
      return;
    }

    try {
      const response = await axios.post(
        `https://localhost:8000/commercialAdmin/exportPdf/${comId}`,
        {
          fromDate: fromDate,
          toDate: toDate,
        }
      );

      // Get the data from the response
      const data = response.data.data;
      console.log(data);
      // Generate PDF
      const pdf = new jsPDF();
      pdf.text("Report", 10, 10);

      // Loop through the data and add it to the PDF
      data.forEach((item, index) => {
        pdf.text(`${index + 1}. ${item[0]} - ${item[1]}`, 10, 20 + index * 10);
      });

      // Save the PDF or open it in a new tab
      pdf.save("report.pdf");

      // Log the data from the response
      console.log("Response:", data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="container" style={{minWidth:"1300px"}}  >
        <div className="row mt-4 d-flex justify-content-end">
          <div className="col-2 " style={{ textAlign: "right" }}>
            {" "}
            <button
              style={btnStyle}
              type="button"
              className="btn btn-primary shadow-sm"
              onClick={handleOpenModal}
            >
              Export
              <img
                src={AddResidentIocn}
                style={{ marginLeft: "10px" }}
                alt=""
              />{" "}
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 d-flex">
            {" "}
            <img src={searchIcon} style={iconStyle} alt="" />{" "}
            <Form.Control
            className="shadow-sm"
              style={SearchInputStyle}
              id="SearchInput"
              size="lg"
              type="text"
              placeholder="Search Resident"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        <div className="row mt-5 d-flex justify-content-end">
          <div
            className="col-1"
            style={{ color: "#566D90", fontWeight: "600" }}
          >
            Pag 1
          </div>
        </div>
        <hr />
        <div className="row mt-5 justify-content-around">
          <EventCard dataArray={events} />
        </div>
      </div>

      <Modal
        centered
        className="abc"
        show={ShowFromModal}
        onHide={() => setShowFromModal(false)}
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
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Poppins",
              fontSize: "20px",
            }}
          >
            {" "}
            From
          </span>
        </Modal.Title>
        <Modal.Body>
          <DateFromModal
            setFromDate={setFromDate}
            setShowFromModal={setShowFromModal}
            setShowToModal={setShowToModal}
            showToModal={ShowToModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        className="abc"
        show={ShowToModal}
        onHide={() => setShowToModal(false)}
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
          <span
            style={{
              fontWeight: "600",
              fontFamily: "Poppins",
              fontSize: "20px",
            }}
          >
            {" "}
            To
          </span>
        </Modal.Title>
        <Modal.Body>
          <DateToModal
            setToDate={setToDate}
            setShowFromModal={setShowFromModal}
            handleExportPdf={handleExportPdf}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Events;

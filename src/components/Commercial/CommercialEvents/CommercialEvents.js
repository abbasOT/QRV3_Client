import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, TextField, Divider, } from '@mui/material'
import SearchEventsIcon from "../../../assests/commercialAdmin/searchEvents.svg"
import SearchIcon from '@mui/icons-material/Search';
import EventDialogue from '../EventDialogue/EventDialogue';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../EventsCard/EventCard';
import { useDispatch, useSelector } from "react-redux";
import { setDateValues } from '../../../redux/slices/searchEventsByDate';
import { getDatabase, ref, onValue } from 'firebase/database';



function CommercialEvents() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let com_prop_id = localStorage.getItem("userKey");
    const commercial_prop_id = localStorage.getItem("commercialPropId")

    const [events, setEvents] = useState([]);

    const [startDate, setStartDate] = useState({ month: "", day: "", year: "" });
    const [endDate, setEndDate] = useState({ month: "", day: "", year: "" });

    // Handle input change
    const handleStartDateChange = (e) => {
        const { name, value } = e.target;
        setStartDate((prev) => ({ ...prev, [name]: value }));
    };

    const handleEndDateChange = (e) => {
        const { name, value } = e.target;
        setEndDate((prev) => ({ ...prev, [name]: value }));
    };

    // Function to format date to MM/DD/YYYY
    const formatDate = ({ month, day, year }) => `${month}/${day}/${year}`;

    // Dispatch the action to set date values
    const handleSearch = () => {
        // Create formatted date strings
        const start = formatDate(startDate);
        const end = formatDate(endDate);

        // Log the output in the desired format

        const dateRange = `${start} - ${end}`
        console.log(dateRange);
        // dispatch(setDateValues(dateRange))
        dispatch(setDateValues({ dateRange }));
    };

    // useEffect(() => {
    //     // Function to fetch properties
    //     const fetchEvents = async () => {
    //         try {
    //             // Make a GET request to get properties
    //             const response = await axios.get(
    //                 `https://ot-technologies.com/commercialAdmin/getEvents/${com_prop_id}?commercial_prop_id=${commercial_prop_id}`,

    //             );

    //             setEvents(response.data.EventData || []);
    //         } catch (error) {
    //             console.log("Error fetching events:");
    //             if (error.response.data.login) {
    //                 alert(error.response.data.message);
    //                 navigate("/login");
    //                 return;
    //             }
    //             // alert(error.response.data.error);
    //         }
    //     };

    //     // Call the function to fetch properties when the component mounts
    //     fetchEvents();
    // }, [com_prop_id, commercial_prop_id]);



    useEffect(() => {
        const db = getDatabase(); // Get the Firebase Realtime Database instance
        const eventsRef = ref(db, `property/${commercial_prop_id}/events`);

        const unsubscribe = onValue(
            eventsRef,
            (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    setEvents(data);
                } else {
                    setEvents([]); // Set eventData to an empty array if no data is found
                }
            },
            (error) => {
                console.error('Error in getting events:', error);
                setEvents([]); // Set eventData to an empty array on error
            }
        );
        // Cleanup the listener on component unmount or when commercial_prop_id changes
        return () => {
            unsubscribe();
        };
    }, [commercial_prop_id]);





    console.log(events)

    const [showEventDialogue, setShowEventDialogue] = useState(false);

    const handleEventDialogue = () => {
        setShowEventDialogue(false);
    };

    const handleEventDialogueOpen = () => {
        handleSearch();
        setShowEventDialogue(true);
    };

    const handleEventDialogueClose = () => {
        setShowEventDialogue(false);
    };


    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", gap: "2rem", mb: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>

                    <Typography sx={{ fontFamily: "Raleway", fontSize: "0.8rem", color: "#8E8E8E" }}>
                        Search by Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder=' Month' maxLength={2} name="month" value={startDate.month}
                            onChange={handleStartDateChange} />
                        <hr style={{ border: "2px solid #EEEEEE", width: 4, opacity: "unset" }} />
                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder='   Day' maxLength={2}
                            value={startDate.day} name="day"
                            onChange={handleStartDateChange} />
                        <hr style={{ border: "2px solid #EEEEEE", width: 4, opacity: "unset" }} />
                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder='   Year' maxLength={4}
                            value={startDate.year} name="year"
                            onChange={handleStartDateChange} />
                    </Box>

                    <Typography sx={{ fontFamily: "Raleway", fontSize: "0.8rem", color: "#8E8E8E", fontWeight: 700 }}>
                        To
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder=' Month' maxLength={2}
                            value={endDate.month} name="month"
                            onChange={handleEndDateChange} />
                        <hr style={{ border: "2px solid #EEEEEE", width: 4, opacity: "unset" }} />
                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder='   Day' maxLength={2}
                            value={endDate.day} name="day"
                            onChange={handleEndDateChange} />
                        <hr style={{ border: "2px solid #EEEEEE", width: 4, opacity: "unset" }} />
                        <input style={{ background: "#EEEEEE", borderRadius: "5px", border: "none", width: 70, padding: "0.4rem" }} placeholder='   Year' maxLength={4}
                            value={endDate.year} name="year"
                            onChange={handleEndDateChange} />
                    </Box>

                </Box>
                <Box sx={{
                    borderRadius: "0.4rem", border: "2px solid #566D90", boxShadow: "0px 4px 4px 0px #00000040", padding: "0.1rem 0.2rem", cursor: "pointer",
                    '&:hover': {
                        border: "2px solid #F6F6F6",
                        '& svg': {
                            color: "#F08F00",
                        },
                    },
                }}
                    onClick={handleEventDialogueOpen}
                // onClick={handleSearch}
                >
                    <SearchIcon sx={{ color: " #566D90" }} />
                </Box>
            </Box>
            <div className="row mt-5 d-flex justify-content-end">
                <div
                    className="col-1"
                    style={{ color: "#566D90", fontWeight: "600" }}
                >
                    Page 1
                </div>
            </div>

            <div className="row justify-content-around" style={{ height: "63vh", overflowY: "auto", padding: "0rem 2rem", marginTop: "2rem" }}>
                <div>
                    <EventCard dataArray={events} />
                </div>
            </div>


            {showEventDialogue && (
                <EventDialogue
                    handleEventDialogueOpen={handleEventDialogueOpen}
                    events={events}
                    handleEventDialogue={handleEventDialogue}
                    handleEventDialogueClose={handleEventDialogueClose}
                />
            )}

        </>
    )
}

export default CommercialEvents

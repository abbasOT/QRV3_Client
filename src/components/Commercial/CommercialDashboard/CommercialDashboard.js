import React, { useState, useEffect } from 'react'
import { Box, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, Typography, Divider } from '@mui/material'
import ServicePin from "../../../assests/commercialAdmin/servicePin.svg"
import EntryButton from "../../../assests/commercialAdmin/entryButton.svg"
import videoCall from "../../../assests/commercialAdmin/videoCall.svg"
import TemporaryPin from "../../../assests/commercialAdmin/temporaryPin.svg"
import PermanentPin from "../../../assests/commercialAdmin/permanentPin.svg"
import { Gauge, gaugeClasses, BarPlot, ChartContainer } from '@mui/x-charts';
import newVideoCall from "../../../assests/commercialAdmin/newSvgs/Video Call.svg"
import newServicePin from "../../../assests/commercialAdmin/newSvgs/Service Pin.svg"
import newEntryButton from "../../../assests/commercialAdmin/newSvgs/Entry Button.svg"
import newTemporaryPin from "../../../assests/commercialAdmin/newSvgs/Temporary Pin.svg"
import newPermanentPin from "../../../assests/commercialAdmin/newSvgs/Permanent Pin.svg"
import { useNavigate } from 'react-router-dom'
import { format, startOfDay, subDays, startOfMonth, subMonths } from 'date-fns';
import { getDatabase, ref, onValue } from 'firebase/database';


import axios from 'axios'

function CommercialDashboard() {


  const navigate = useNavigate();
  let com_prop_id = localStorage.getItem("userKey");
  const commercial_prop_id = localStorage.getItem("commercialPropId")
  const [tempPinsCount, setTempPinsCount] = useState(0);

  const [selectedOption, setSelectedOption] = useState('option1');


  const [events, setEvents] = useState([]);

  const [totalEventsCount, setTotalEventsCount] = useState({
    today: 0,
    lastThreeMonths: [0, 0, 0],
    monthlyAverage: 0,
  });

  const [eventCounts, setEventCounts] = useState({
    entryButton: 0,
    videoCall: 0,
    permanentPin: 0,
    temporaryPin: 0,
    servicePin: 0,
  });


  useEffect(() => {
    const db = getDatabase(); // Get the Firebase Realtime Database instance
    const commercialResidentsRef = ref(db, `property/${commercial_prop_id}/commercialResidents`);

    const calculateTempPinsCount = (residents) => {
      let count = 0;

      // Check if the residents array is not null or undefined
      if (!residents) return count;

      residents.forEach((residentData) => {
        const tempPins = residentData?.TempPins;

        if (tempPins) {
          Object.values(tempPins).forEach((pinData) => {
            if (pinData.name && pinData.name.trim() !== "") {
              count += 1;
            }
          });
        }
      });

      return count;
    };

    // Attach the onValue listener
    onValue(commercialResidentsRef, (snapshot) => {
      const data = snapshot.val();

      // Check if commercialResidents node exists
      if (!data) {
        setTempPinsCount(0);
        return;
      }

      const totalTempPins = calculateTempPinsCount(Object.values(data));
      setTempPinsCount(totalTempPins);
    });

  }, [commercial_prop_id]);


  // useEffect(() => {
  //   // Function to fetch properties
  //   const fetchEvents = async () => {
  //     try {
  //       // Make a GET request to get properties
  //       const response = await axios.get(
  //         `https://ot-technologies.com/commercialAdmin/getEvents/${com_prop_id}?commercial_prop_id=${commercial_prop_id}`,

  //       );

  //       const allEvents = response.data.EventData || []
  //       const eventsArray = Object.values(allEvents);
  //       setEvents(eventsArray);
  //     } catch (error) {
  //       console.log("Error fetching events:");
  //       if (error.response.data.login) {
  //         alert(error.response.data.message);
  //         navigate("/login");
  //         return;
  //       }
  //       // alert(error.response.data.error);
  //     }
  //   };

  //   // Call the function to fetch properties when the component mounts
  //   fetchEvents();
  // }, [com_prop_id, commercial_prop_id]);

  useEffect(() => {
    const db = getDatabase(); // Get the Firebase Realtime Database instance
    const eventsRef = ref(db, `property/${commercial_prop_id}/events`);

    const handleEventSnapshot = (snapshot) => {
      const data = snapshot.val();

      // Check if the events node exists
      if (!data) {
        setEvents([]);
        return;
      }

      // Convert the data to an array of event objects
      const eventsArray = Object.values(data);

      // If there are no events (e.g., empty object), set an empty array
      if (eventsArray.length === 0) {
        setEvents([]);
        return;
      }

      // Check if each event object is valid (e.g., has an ID or name)
      const validEvents = eventsArray.filter(
        (event) => event && event.eventType
      );

      setEvents(validEvents);
    };

    // Attach the onValue listener for real-time updates
    const unsubscribe = onValue(eventsRef, handleEventSnapshot, (error) => {
      console.error("Error fetching events:", error);
      if (error?.response?.data?.login) {
        alert(error.response.data.message);
        navigate("/login");
        return;
      }
      // Handle any additional error handling here if needed
    });

    // Cleanup function to detach the listener when the component unmounts
    return () => unsubscribe();
  }, [commercial_prop_id, navigate]);

  console.log(events, "events in the dashboard")

  const data = [
    {
      text: 'Entry Button', image: newEntryButton,
      // number: "X"
      number: eventCounts.entryButton
    },
    { text: 'Video Call', image: newVideoCall, number: eventCounts.videoCall },
    { text: 'Permanent Pin', image: newPermanentPin, number: eventCounts.permanentPin },
    { text: 'Temporary Pin', image: newTemporaryPin, number: eventCounts.temporaryPin },
    { text: 'Service Pin', image: newServicePin, number: eventCounts.servicePin },
  ];

  const filterEventsByDate = (events) => {
    const now = new Date();
    const today = startOfDay(now);
    const lastWeek = subDays(now, 7);; // Assuming week starts on Monday
    const lastMonth = startOfMonth(now);

    return events?.filter(({ timestamp }) => {
      const eventDate = new Date(timestamp);
      if (selectedOption === 'option1') {
        return eventDate >= today;
      } else if (selectedOption === 'option2') {
        return eventDate >= lastWeek;
      } else if (selectedOption === 'option3') {
        return eventDate >= lastMonth;
      }
      return false;
    });
  };

  const countEvents = (filteredEvents) => {
    const counts = {
      entryButton: 0,
      videoCall: 0,
      permanentPin: 0,
      temporaryPin: 0,
      servicePin: 0,
    };

    filteredEvents.forEach(({ eventType }) => {
      if (eventType === 'key') {
        counts.entryButton += 1;
      } else if (eventType === 'videoCall') {
        counts.videoCall += 1;
      } else if (eventType === 'P') {
        counts.permanentPin += 1;
      } else if (eventType === 'T') {
        counts.temporaryPin += 1;
      } else if (eventType === 'servicePinCode') {
        counts.servicePin += 1;
      }
    });

    return counts;
  };

  // Calculate total events for today, excluding "entryButton" events
  const calculateTodayEvents = (events) => {
    const now = new Date();
    const today = startOfDay(now);

    return events?.filter(({ timestamp, eventType }) => {
      const eventDate = new Date(timestamp);
      // Exclude entryButton events and only count others
      return eventDate >= today && eventType !== 'key'; // Assuming 'key' represents entryButton
    }).length;
  };


  // Calculate total events for each of the last three months
  const calculateLastThreeMonthsEvents = (events) => {
    const now = new Date();
    const lastThreeMonthsCounts = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = i === 0 ? now : startOfMonth(subMonths(now, i - 1));

      lastThreeMonthsCounts[i] = events?.filter(({ timestamp, eventType }) => {
        const eventDate = new Date(timestamp);
        return eventDate >= monthStart && eventDate < monthEnd && eventType !== 'key';
      }).length;
    }

    return lastThreeMonthsCounts;
  };

  useEffect(() => {
    const todayEventsCount = calculateTodayEvents(events);
    const lastThreeMonthsCounts = calculateLastThreeMonthsEvents(events);
    const totalLastThreeMonths = lastThreeMonthsCounts.reduce((sum, count) => sum + count, 0);
    const monthlyAverage = Math.round(totalLastThreeMonths / 3);

    setTotalEventsCount({
      today: todayEventsCount,
      lastThreeMonths: lastThreeMonthsCounts,
      monthlyAverage,
    });
  }, [events]);

  // Get last three months names
  const getLastThreeMonthsNames = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const lastThreeMonthsNames = [];

    for (let i = 0; i < 3; i++) {
      const monthIndex = now.getMonth() - i;
      const adjustedMonthIndex = monthIndex >= 0 ? monthIndex : 12 + monthIndex;
      lastThreeMonthsNames.push(monthNames[adjustedMonthIndex]);
    }

    return lastThreeMonthsNames;
  };

  const lastThreeMonthsNames = getLastThreeMonthsNames();

  useEffect(() => {
    const filteredEvents = filterEventsByDate(Object.values(events));
    const counts = countEvents(filteredEvents);
    setEventCounts(counts);
  }, [events, selectedOption]);



  const options = [
    { value: 'option1', mainLabel: 'Today', subLabel: '(12 am-11:49 pm)' },
    { value: 'option2', mainLabel: 'Last Week' },
    { value: 'option3', mainLabel: 'Last Month' },
    // Add more options as needed
  ];

  const settings = {
    width: 290,
    height: 290,
    value: 10,
  };



  const [items, setItems] = useState(data);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToggle = (index) => {
    const updatedItems = [...items];
    const currentItem = updatedItems[index];
    currentItem.toggled = !currentItem.toggled;
    currentItem.number = currentItem.toggled ? "456" : "X"; // Update this to fetch the number from the database
    setItems(updatedItems);
  };


  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem ", pt: "1rem", }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "3.5rem", position: "relative" }}>

          {data.map((item, index) => (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "-2rem" }}>
              <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Raleway', fontWeight: 500, color: '#B1B1B1', whiteSpace: 'nowrap' }}>
                {item.text}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                <img src={item.image} style={{ filter: 'drop-shadow(0px 4px 4px #00000040)', background: 'none', width: 30, height: 30 }} />
              </Box>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-family-rajdhani)',
                  color: item.text === "Entry Button" && item.number === "X" ? "#B1B1B1" : "#566D90",
                  // marginLeft: item.text === "Entry Button" && item.number === "X" ? "0.3rem" : "0rem",
                  fontWeight: 600,
                  color: '#566D90',
                  // p: '1rem',
                  height: "1rem",
                  width: '1rem',
                  // marginLeft: "0.8rem",
                  textAlign: 'center',
                  marginTop: '-0.5rem',
                }}
              >
                {item.number}
              </Typography>
            </Box>
          ))}



        </Box>

        <Box sx={{ mt: "0rem" }}>
          <RadioGroup
            aria-labelledby="payment-option"
            name="payment-option"
            value={selectedOption}
            onChange={handleOptionChange}
            sx={{ pt: 0, mb: 0 }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio sx={{
                  '& .MuiSvgIcon-root': { color: '#566D90', width: "1rem", height: "1rem", }
                }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#B1B1B1', fontWeight: 600, fontFamily: 'var(--font-family-rajdhani)', fontSize: "0.8rem" }}>
                      {option.mainLabel}
                    </Typography>
                    {option.subLabel && (
                      <Typography sx={{ color: '#B1B1B1', fontWeight: 600, fontFamily: 'var(--font-family-rajdhani)', fontSize: "0.6rem", ml: 0.5 }}>
                        {option.subLabel}
                      </Typography>
                    )}
                  </Box>
                }
                sx={{ marginBottom: 0, paddingTop: 0 }}
              />
            ))}

          </RadioGroup>
        </Box>
      </Box >

      <Typography sx={{ fontFamily: "Raleway", color: "#B1B1B1", textAlign: "left" }}>
        Door Monitoring Report
      </Typography>
      <Divider sx={{ border: "1px solid #B1B1B1", opacity: "50%", width: "80%", minWidth: 930 }} />

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem", width: "85%", pt: "2rem" }}>
        <Typography sx={{ fontFamily: "Raleway", fontSize: "2rem", fontWeight: 800, color: "#566D90" }}>
          VISITORS
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", pt: "4.3rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mb: "1rem", pr: "5rem" }}>

            <Box sx={{ position: 'relative', display: 'inline-flex', }}>
              <Box sx={{
                position: 'absolute',
                top: -70,
                right: 30,

              }}>
                <Typography sx={{ fontSize: '3rem', fontFamily: 'var(--font-family-rajdhani)', fontWeight: 600, color: '#19A752', textAlign: "start" }}>{totalEventsCount.today}</Typography>
                <Typography sx={{ fontFamily: "Raleway", fontWeight: 600, color: "#B1B1B1", mt: "-1rem" }}>Arrived today</Typography>
              </Box>
              <Gauge
                {...settings}
                cornerRadius="50%"
                innerRadius="90%"
                sx={(theme) => ({

                  [`& .${gaugeClasses.valueText}`]: {
                    display: 'none',
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#19A752',
                    filter: 'drop-shadow(0px 4px 4px #00000040)'

                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: '#566D90',
                    filter: 'drop-shadow(0px 4px 4px #00000040)'
                  },


                })}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: "column",


                }}
              >
                <Typography sx={{ fontSize: '5rem', fontFamily: 'var(--font-family-rajdhani)', fontWeight: 600, color: '#566D90', }}>{tempPinsCount}</Typography>
                <Typography sx={{ fontFamily: "Raleway", fontWeight: 600, color: "#B1B1B1", mt: "-1rem" }}>Incoming Visitors</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mb: "1rem", pr: "5rem" }}>

            <Box sx={{ display: "flex", alignItems: "end", gap: "2rem" }}>

              {totalEventsCount?.lastThreeMonths?.map((count, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 35,
                    // height: `${count / 20}px`, 
                    height: `${count / 2}px`,
                    maxHeight: 180,
                    minHeight: 40,
                    background: index === 0 ? "#566D90" : index === 1 ? "#F08F00" : "#19A752",
                    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Typography sx={{ position: "absolute", top: -20, fontWeight: 600, fontFamily: 'var(--font-family-rajdhani)', color: index === 0 ? "#566D90" : index === 1 ? "#F08F00" : "#19A752" }}>
                    {count}
                  </Typography>
                  <Typography sx={{ position: "absolute", bottom: "10%", right: 0, left: 0, fontFamily: "Inter", fontWeight: 500, fontSize: "0.75rem", color: "#FFF" }}>
                    {lastThreeMonthsNames[index]}
                  </Typography>
                </Box>
              ))}

            </Box>

            <Typography sx={{ fontSize: '5rem', fontFamily: 'var(--font-family-rajdhani)', fontWeight: 600, color: '#566D90', }}> {totalEventsCount.monthlyAverage}</Typography>
            <Typography sx={{ fontFamily: "Raleway", fontWeight: 600, color: "#B1B1B1", mt: "-1rem" }}>Monthly average</Typography>


          </Box>

        </Box>


      </Box>
    </>
  )
}

export default CommercialDashboard






import React, { useState, useMemo } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box, Divider, Typography } from '@mui/material';
import PersonIcon from "../../../assests/commercialAdmin/doubleEntryPersonIcon.svg"
import CloseIcon from '@mui/icons-material/Close';
import { ButtonStyle } from '../CommercialSettings/CommercialSettings';
import PdfIcon from "../../../assests/commercialAdmin/pdfIcon.svg"
import { useSelector } from 'react-redux';
import EventCard from '../EventsCard/EventCard';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EventDialogue({ handleEventDialogueOpen, handleEventDialogue, handleEventDialogueClose, events }) {

    const dateRange = useSelector((state) => state.searchEventsByDate.dateRange);

    // Function to parse and validate the date range
    const parseDateRange = (range) => {
        if (!range || range.trim() === "") {
            return null; // No date range entered
        }

        const dates = range.split(' - ');

        if (dates.length === 2) {
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[1]);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return null;
            }

            // Set endDate to include the whole day
            endDate.setHours(23, 59, 59, 999);

            return { startDate, endDate };
        }
        return null;
    };

    const parsedDateRange = useMemo(() => parseDateRange(dateRange), [dateRange]);

    const filteredEvents = useMemo(() => {
        if (!parsedDateRange) return null; // Show nothing if date range is not valid

        const { startDate, endDate } = parsedDateRange;

        return Object.entries(events).filter(([_, event]) => {
            const eventDate = new Date(event.timestamp);
            return eventDate >= startDate && eventDate <= endDate;
        }).reduce((acc, [key, event]) => {
            acc[key] = event;
            return acc;
        }, {});
    }, [events, parsedDateRange]);

    console.log(filteredEvents, "the filter events")


    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleEventDialogueOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleEventDialogue();
        setOpen(false)
    }




    const handleExportPdf = () => {
        const filteredEventsPdf = Object.values(filteredEvents);
        const pdf = new jsPDF();



        const dateRangeText = `Event List (${dateRange})`;

        pdf.setFontSize(14);
        pdf.text(dateRangeText, 14, 18); // Position it below the title

        // Prepare the data for the table
        const tableData = filteredEventsPdf.map((event, index) => {
            // Format the timestamp to a readable date
            const eventDate = new Date(event.timestamp).toLocaleString();
            return [
                event.message,        // Message
                event.gateName,       // Intercom No
                eventDate             // Timestamp
            ];
        });

        // Define the columns
        const columns = ["Name", "Intercom", "Timestamp"];

        // Generate the table in the PDF
        pdf.autoTable({
            head: [columns],
            body: tableData,
            startY: 25,               // Start position of the table
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            theme: 'grid',            // Optional: 'striped', 'grid', or 'plain'
            headStyles: {
                fillColor: [22, 160, 133],  // Header background color
                textColor: 255,             // Header text color (white)
                lineWidth: 0.2,             // Border line width
                lineColor: [169, 169, 169], // Border line color (grey)
            },
        });

        // Save the PDF
        pdf.save("event_report.pdf");
    };



    return (
        <>

            <Dialog
                open={handleClickOpen}
                onClose={handleClickClose}
                PaperProps={{
                    sx: { ...themeStyle.paperPropsStyle },
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >



                <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", }}>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: "1.2rem", color: "#566D90", textAlign: "center", fontWeight: 600 }}>

                        {dateRange}

                    </Typography>


                    <Box sx={{ position: "absolute", right: 100, top: -10, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        <Button variant='text' sx={{ gap: "0.5rem", textTransform: "none", fontWeight: 600, fontFamily: "Poppins", color: "#566D90" }} onClick={handleExportPdf}>
                            <img src={PdfIcon} />
                            Export
                        </Button>
                        <Divider orientation='vertical' sx={{ border: "1px solid #EEEEEE", opacity: "unset", height: 18, mr: "0.3rem" }} />
                        <CloseIcon onClick={handleClickClose} sx={{ width: 30, height: 30, color: "#566D90", cursor: "pointer" }} />

                    </Box>
                </Box>



                <div className="row justify-content-around" style={{ height: "63vh", overflowY: "auto", padding: "0rem 2rem", marginTop: "2rem" }}>
                    <div>
                        <EventCard dataArray={events} />
                    </div>
                </div>


            </Dialog>
        </>
    );

}
const themeStyle = {

    paperPropsStyle: {
        background: "#FFF",
        borderRadius: "1.9rem",
        width: "auto",
        minWidth: "80%",
        minHeight: "80vh",
        padding: "2rem 1.5rem 0.5rem 1.5rem",

    },

}
export default EventDialogue
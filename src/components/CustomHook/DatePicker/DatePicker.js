import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    selectedDate,
    handleDateChange,
  };
};

const CustomDatePicker = ({ handleDateChange }) => {
  const { selectedDate, handleDateChange: localHandleDateChange } = useDatePicker();

  // When the date changes locally, call the parent's handler
  React.useEffect(() => {
    handleDateChange(selectedDate);
  }, [selectedDate, handleDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en" utils={dayjs}>
      <DateCalendar value={selectedDate} onChange={localHandleDateChange} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

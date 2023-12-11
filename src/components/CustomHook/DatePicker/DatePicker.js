import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Handle any additional logic when the date changes
    setSelectedDate(date);
  };

  return {
    selectedDate,
    handleDateChange,
  };
};

const CustomDatePicker = () => {
  const { selectedDate, handleDateChange } = useDatePicker();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en" utils={dayjs}>
      <DateCalendar value={selectedDate} onChange={handleDateChange} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

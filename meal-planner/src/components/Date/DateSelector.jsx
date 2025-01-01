import { useState } from 'react';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div>
      <label htmlFor="date-picker">Select a Date for the Meal :</label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={today}
      />
      {selectedDate && <p>You selected: {selectedDate}</p>}
    </div>
  );
};

export default DateSelector;
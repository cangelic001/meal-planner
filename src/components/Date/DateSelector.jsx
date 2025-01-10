import { useDate } from '../DateContext';

const DateSelector = () => {
  const { selectedDate, handleDateChange } = useDate();

  const today = new Date().toLocaleDateString('en-CA');

  const formattedDate = selectedDate instanceof Date ? selectedDate.toLocaleDateString('en-CA') : selectedDate;

  return (
    <div>
      <label htmlFor="date-picker">Select a Date for the Meal :</label>
      <input
        id="date-picker"
        type="date"
        value={formattedDate}
        onChange={handleDateChange}
        min={today}
      />
      {selectedDate && <p>You selected: {selectedDate}</p>}
    </div>
  );
};

export default DateSelector;
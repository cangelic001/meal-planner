import { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => { 
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

return (
  <DateContext.Provider value={{ selectedDate, handleDateChange, setSelectedDate }}>
    {children}
  </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);

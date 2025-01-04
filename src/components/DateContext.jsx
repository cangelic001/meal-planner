import { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => { // children here is to define a var to be wrapped inside the provider component.
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

return (
  <DateContext.Provider value={{ selectedDate, handleDateChange }}>
    {children}
  </DateContext.Provider>
  );
};

// useDate is a fn to use the useContext function which receives the DateContext var.
export const useDate = () => useContext(DateContext);

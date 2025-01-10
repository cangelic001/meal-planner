import { useState, useEffect } from "react";
import MealCard from "./MealCard";
import { fetchMealPlanFromAirtable } from "../services/fetchFromAirtableService";
import loadinggif from "../../assets/images/loadingspoon.gif"
import "./ViewMealPlans.css"

const ViewMealPlans = () => {
    const [mealPlans, setMealPlans] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchMealPlanFromAirtable();
  
          let groupedData = {};
  
          data.forEach((record) => {
            const { date, mealType, recipeName } = record;
  
            if (!groupedData[date]) {
              groupedData[date] = { date, breakfast: null, lunch: null, dinner: null };
            }
  
            if (mealType === "breakfast") groupedData[date].breakfast = recipeName;
            if (mealType === "lunch") groupedData[date].lunch = recipeName;
            if (mealType === "dinner") groupedData[date].dinner = recipeName;
          });
  
          const sortedMealPlans = Object.keys(groupedData)
            .map((key) => groupedData[key])
            .sort((a, b) => new Date(a.date) - new Date(b.date));
  
          setMealPlans(sortedMealPlans);
        } catch (error) {
          console.error("Error fetching meal plans:", error);
        }
      };
  
      fetchData();
    }, []); 
  
    return (
      <div>
        <h1 className="headline">Meal Plans Created:</h1>
  
        {mealPlans.length > 0 ? (
          mealPlans.map((meal, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
                <MealCard
                key={index}
                date={meal.date}
                breakfast={meal.breakfast}
                lunch={meal.lunch}
                dinner={meal.dinner}
                setMealPlans={setMealPlans}
                />
            </div>
          ))
        ) : (
          <img src={loadinggif} alt="Loading Spoon" className="loading"/>
        )}
      </div>
    );
  };
  
  export default ViewMealPlans;
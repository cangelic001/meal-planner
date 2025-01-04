// Sample code for fetching and displaying meals for a selected date
const fetchMealPlanForDate = async (selectedDate) => {
    const response = await fetchMealPlansFromAirtable(selectedDate);
    const meals = response.records.filter(record => record.fields.Date === selectedDate);
    
    const breakfastMeals = meals.filter(meal => meal.fields.MealType === 'Breakfast');
    const lunchMeals = meals.filter(meal => meal.fields.MealType === 'Lunch');
    const dinnerMeals = meals.filter(meal => meal.fields.MealType === 'Dinner');
  
    // Display meals in the appropriate sections
    return (
      <div>
        <h3>Breakfast</h3>
        {breakfastMeals.map(meal => <div key={meal.id}>{meal.fields.RecipeName}</div>)}
        
        <h3>Lunch</h3>
        {lunchMeals.map(meal => <div key={meal.id}>{meal.fields.RecipeName}</div>)}
        
        <h3>Dinner</h3>
        {dinnerMeals.map(meal => <div key={meal.id}>{meal.fields.RecipeName}</div>)}
      </div>
    );
  };
  
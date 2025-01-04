const submitMealPlanToAirtable = async (mealData) => {
    const BEARER_TOKEN = `${import.meta.env.VITE_AIRTABLE_BEARER_TOKEN}`; 
    const BASE_ID = `${import.meta.env.VITE_AIRTABLE_BASE_ID}`; 
    const TABLE_NAME = `${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`; 
  
    const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  
    const headers = {
      'Authorization': `Bearer ${BEARER_TOKEN}`, 
      'Content-Type': 'application/json',
    };
    
    const body = JSON.stringify({
      fields: {
        'Date': mealData.date,
        'Meal Type': mealData.type, // 'breakfast', 'lunch', or 'dinner'
        'Recipe Name': mealData.name,
        'Recipe ID': mealData.recipeId, 
      },
    });

    console.log("Submitting meal data:", body);  // Add this to check the payload
    
    try {
      const response = await fetch(AIRTABLE_URL, {
        method: 'POST',
        headers: headers,
        body: body,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit meal data to Airtable');
      }
  
      const responseData = await response.json();
      return responseData; 
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      if (error.response) {
          console.error('Airtable API Response:', error.response.data);
      }
      alert('An error occurred while submitting the meal plan.');
    }
  
};

export default submitMealPlanToAirtable;
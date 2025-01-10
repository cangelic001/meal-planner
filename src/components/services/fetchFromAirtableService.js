  const BEARER_TOKEN = `${import.meta.env.VITE_AIRTABLE_BEARER_TOKEN}`;
  const BASE_ID = `${import.meta.env.VITE_AIRTABLE_BASE_ID}`;
  const TABLE_NAME = `${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`;
  const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const fetchMealPlanFromAirtable = async (date) => {
    console.log('Fetching meal plans from Airtable');
  
    try {
      const response = await fetch(
        `${AIRTABLE_URL}`,
        {
          method: 'GET',
          headers: headers,
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch meal data from Airtable');
      }
  
      const data = await response.json();
  
      const results = [];
      for (let record of data.records) {
        const date = record.fields.Date;
        const mealType = record.fields['Meal Type'] ? record.fields['Meal Type'].trim().toLowerCase() : '';
        const recipeName = record.fields['Recipe Name'];
        const recipeId = record.fields['Recipe ID'];
  
        // Validate the mealType and Date
        if (!date || !mealType || !recipeName || !recipeId) {
          console.error('Invalid record:', record);
          continue; // Skip invalid records
        }
  
        results.push({
          date,
          mealType,
          recipeName,
          recipeId,
        });
      }
  
      console.log('Fetched and validated meal data:', results);
      return results || [];
  
    } catch (error) {
      console.error('Error fetching from Airtable:', error);
      alert('An error occurred while fetching the meal plan.');
      return []; // Return empty array in case of error
    }
  };
  
  export { fetchMealPlanFromAirtable };
  

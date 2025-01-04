import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MealExample from '../MealExample/MealExample';
import DateSelector from '../Date/DateSelector';
import { useDate } from '../DateContext';
import { useState } from 'react';
import submitMealPlanToAirtable from '../services/airtableService';

const BuildMealPlan = (props) => {
    const { recipes } = props; // declare recipes var, each item in the array

    const [breakfastRecipes, setBreakfastRecipes] = useState([]);
    const [lunchRecipes, setLunchRecipes] = useState([]);
    const [dinnerRecipes, setDinnerRecipes] = useState([]);

    const { selectedDate } = useDate();

    const handleAddRecipe = (mealType, recipeName, recipeId) => {
        const mealData = { name: recipeName, id: recipeId};

        if (mealType === 'breakfast') {
            setBreakfastRecipes([...breakfastRecipes, mealData]);
        } else if (mealType === 'lunch') {
            setLunchRecipes([...lunchRecipes, mealData]);
        } else if (mealType === 'dinner') {
            setDinnerRecipes([...dinnerRecipes, mealData]);
        }
    };

    const handleRemoveRecipe = (mealType, recipeIndex) => {
        if (mealType === 'breakfast') {
            setBreakfastRecipes(breakfastRecipes.filter((_, index) => index !== recipeIndex));
        } else if (mealType === 'lunch') {
            setLunchRecipes(lunchRecipes.filter((_, index) => index !== recipeIndex));
        } else if (mealType === 'dinner') {
            setDinnerRecipes(dinnerRecipes.filter((_, index) => index !== recipeIndex));
        }
    };

        // to add to submit button
        const handleSubmit = async () => {
            console.log('handlesubmit', selectedDate)
            console.log('selectedDate type:', typeof selectedDate);

            // Convert the string to a Date object if needed and format it
            const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // "YYYY-MM-DD" format
            console.log('Formatted date:', formattedDate, typeof formattedDate); // Check the format
        
            try {
                // Submit breakfast recipes
                for (let recipe of breakfastRecipes) {
                    const mealData = {
                        date: formattedDate,
                        name: recipe.name,
                        type: 'breakfast',
                        recipeId: recipe.id,  
                    };
                    console.log('id type:', typeof mealData.recipeId); // TO DELETE
                    console.log('name type:', typeof mealData.name); // TO DELETE
                    console.log('meal type type:', typeof mealData.type); // TO DELETE
                    const response = await submitMealPlanToAirtable(mealData);
                    console.log('Breakfast meal submitted:', response);
                }
        
                // Submit lunch recipes
                for (let recipe of lunchRecipes) {
                    const mealData = {
                        date: formattedDate,
                        name: recipe.name,
                        type: 'lunch',
                        recipeId: recipe.id,  
                    };
                    const response = await submitMealPlanToAirtable(mealData);
                    console.log('Lunch meal submitted:', response);
                }
        
                // Submit dinner recipes
                for (let recipe of dinnerRecipes) {
                    const mealData = {
                        date: formattedDate,
                        name: recipe.name,
                        type: 'dinner',
                        recipeId: recipe.id,  
                    };
                    const response = await submitMealPlanToAirtable(mealData);
                    console.log('Dinner meal submitted:', response);
                }
        
                alert('Meal plan submitted successfully!');
            } catch (error) {
                console.error('Error submitting meal plan:', error);
                alert('An error occurred while submitting the meal plan.');
            }
        };
        

    return (
        <div>
            <Card>
                <DateSelector />
                <br />
                {/* Breakfast */}
                <Card.Header as="h5" style={{ backgroundColor: 'mediumvioletred', color: 'white' }}>Breakfast</Card.Header>
                    <Card.Body className="card-body">
                        <div>
                              
                                {breakfastRecipes.map((recipe, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '1rem' }}>{recipe.name}</span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleRemoveRecipe('breakfast', index)}
                                    >
                                        X
                                    </Button>
                                </div>
                                ))}
                            
                        </div>
                    </Card.Body>
                <br />

                {/* Lunch */}
                <Card.Header as="h5" style={{ backgroundColor: 'palevioletred', color: 'white' }}>Lunch</Card.Header>
                    <Card.Body className="card-body">
                        <div>   
                            {lunchRecipes.map((recipe, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                <span style={{ marginRight: '1rem' }}>{recipe.name}</span>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleRemoveRecipe('lunch', index)}
                                >
                                    X
                                </Button>
                            </div>
                            ))}
                        </div>
                    </Card.Body>
                <br />

                {/* Dinner */}
                <Card.Header as="h5" style={{ backgroundColor: 'hotpink', color: 'white' }}>Dinner</Card.Header>
                    <Card.Body className="card-body">
                        <div>   
                            {dinnerRecipes.map((recipe, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '1rem' }}>{recipe.name}</span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleRemoveRecipe('dinner', index)}
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>                
                    <Button onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem' }}>Submit</Button>
                </div> 
            </Card>
            <h1>Click the buttons to add a menu for breakfast, lunch or dinner</h1>

            <div className="recipes">
                {recipes.map((recipe) => {
                    return (
                        <div key={recipe.id}>
                            <MealExample key={recipe.id} recipe={recipe} />
                            <Button 
                                className='add-button' 
                                style={{ borderColor: 'transparent', backgroundColor: 'mediumvioletred', color: 'white' }}
                                onClick={() => handleAddRecipe('breakfast', recipe.name, recipe.id)}>
                                Breakfast
                                </Button>
                            <Button 
                                className='add-button' 
                                style={{ borderColor: 'transparent', backgroundColor: 'palevioletred', color: 'white' }}
                                onClick={() => handleAddRecipe('lunch', recipe.name, recipe.id)}>
                                Lunch
                                </Button>
                            <Button 
                                className='add-button' 
                                style={{ borderColor: 'transparent', backgroundColor: 'hotpink', color: 'white' }}
                                onClick={() => handleAddRecipe('dinner', recipe.name, recipe.id)}>
                                Dinner
                                </Button>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default BuildMealPlan;
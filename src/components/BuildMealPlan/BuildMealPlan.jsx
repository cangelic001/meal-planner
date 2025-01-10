import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MealExample from '../MealExample/MealExample';
import DateSelector from '../Date/DateSelector';
import { useDate } from '../DateContext';
import { useState } from 'react';
import { submitMealPlanToAirtable } from '../services/submitToAirtableService';
import { fetchMealPlanFromAirtable } from '../services/fetchFromAirtableService';

const BuildMealPlan = (props) => {
    const { recipes } = props; 

    const [breakfastRecipes, setBreakfastRecipes] = useState([]);
    const [lunchRecipes, setLunchRecipes] = useState([]);
    const [dinnerRecipes, setDinnerRecipes] = useState([]);

    const { selectedDate, setSelectedDate } = useDate();

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

    const handleSubmit = async () => {
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; 

        try {
            const allMealPlans = await fetchMealPlanFromAirtable(formattedDate);

            const existingMealPlans = allMealPlans.filter(plan => plan.date === formattedDate);

            if (existingMealPlans.length > 0) {
                alert(`A meal plan already exists for ${formattedDate}. Please choose a different date.`);
                
                setBreakfastRecipes([]);
                setLunchRecipes([]);
                setDinnerRecipes([]);
                
                return;  
            }

            const meals = [
        { recipes: breakfastRecipes, type: 'breakfast' },
        { recipes: lunchRecipes, type: 'lunch' },
        { recipes: dinnerRecipes, type: 'dinner' },
    ];

    for (const { recipes, type } of meals) {
        for (const recipe of recipes) {
            const mealData = {
                date: formattedDate,
                name: recipe.name,
                type,
                recipeId: recipe.id,
            };
            try {
                const response = await submitMealPlanToAirtable(mealData);
                console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} meal submitted:`, response);
            } catch (error) {
                console.error(`Error submitting ${type} meal:`, error);
            }
        }
    }
            
            setBreakfastRecipes([]);
            setLunchRecipes([]);
            setDinnerRecipes([]);

            const today = new Date().toISOString().split('T')[0]; 

            setSelectedDate(today);

            alert('Meal plan submitted successfully!');
        } catch (error) {
            console.error('Error submitting meal plan:', error);
            alert('An error occurred while submitting the meal plan.');
        }
    };
        
    return (
        <div>
            <Card>
                <h1>Meal Plan Builder</h1>
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
                    <Button variant="success" onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem' }}>Submit</Button>
                </div> 
            </Card>
            <h1 style={{fontSize: "2rem"}}>Click the buttons to add a menu for breakfast, lunch or dinner</h1>

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
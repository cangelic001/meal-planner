import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MealExample from '../MealExample/MealExample';
import DateSelector from '../Date/DateSelector';
import ViewMeals from '../ViewMeals/ViewMeals';
import {useState} from 'react';

const BuildMealPlan = (props) => {
    const { recipes } = props; // declare recipes var, each item in the array

    const [breakfastRecipes, setBreakfastRecipes] = useState([]);
    const [lunchRecipes, setLunchRecipes] = useState([]);
    const [dinnerRecipes, setDinnerRecipes] = useState([]);

    const handleAddRecipe = (mealType, recipeName) => {
        if (mealType === 'breakfast') {
            setBreakfastRecipes([...breakfastRecipes, recipeName]);
        } else if (mealType === 'lunch') {
            setLunchRecipes([...lunchRecipes, recipeName]);
        } else if (mealType === 'dinner') {
            setDinnerRecipes([...dinnerRecipes, recipeName]);
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

    return (
        <div>
            <Card>
                <DateSelector />
                <br />
                {/* Breakfast */}
                <Card.Header as="h5" style={{ backgroundColor: 'mediumvioletred', color: 'white' }}>Breakfast</Card.Header>
                    <Card.Body className="card-body">
                        <div>
                            <Card.Text>   
                                {breakfastRecipes.map((recipe, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '1rem' }}>{recipe}</span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleRemoveRecipe('breakfast', index)}
                                    >
                                        X
                                    </Button>
                                </div>
                                ))}
                            </Card.Text>
                        </div>
                    </Card.Body>
                <br />

                {/* Lunch */}
                <Card.Header as="h5" style={{ backgroundColor: 'palevioletred', color: 'white' }}>Lunch</Card.Header>
                    <Card.Body className="card-body">
                        <Card.Text>   
                            {lunchRecipes.map((recipe, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                <span style={{ marginRight: '1rem' }}>{recipe}</span>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleRemoveRecipe('lunch', index)}
                                >
                                    X
                                </Button>
                            </div>
                            ))}
                        </Card.Text>
                    </Card.Body>
                <br />

                {/* Dinner */}
                <Card.Header as="h5" style={{ backgroundColor: 'hotpink', color: 'white' }}>Dinner</Card.Header>
                    <Card.Body className="card-body">
                        <Card.Text>   
                            {dinnerRecipes.map((recipe, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '1rem' }}>{recipe}</span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleRemoveRecipe('dinner', index)}
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </Card.Text>
                    </Card.Body>
                <br />

                <Button style={{ width: '10rem' }}>Submit</Button>
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
                                onClick={() => handleAddRecipe('breakfast', recipe.name)}>
                                Breakfast
                                </Button>
                            <Button 
                                className='add-button' 
                                style={{ borderColor: 'transparent', backgroundColor: 'palevioletred', color: 'white' }}
                                onClick={() => handleAddRecipe('lunch', recipe.name)}>
                                Lunch
                                </Button>
                            <Button 
                                className='add-button' 
                                style={{ borderColor: 'transparent', backgroundColor: 'hotpink', color: 'white' }}
                                onClick={() => handleAddRecipe('dinner', recipe.name)}>
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
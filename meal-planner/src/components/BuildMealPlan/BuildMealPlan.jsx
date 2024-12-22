import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import MealExample from '../MealExample/MealExample';
import ViewMeals from '../ViewMeals/ViewMeals';
import {useState} from 'react';

const BuildMealPlan = (props) => {
    const { recipes } = props; // declare recipes var, each item in the array

    return (
        <div>
            <Card>
                {/* Breakfast */}
                <Card.Header as="h5" style={{ backgroundColor: 'mediumvioletred', color: 'white' }}>Breakfast</Card.Header>
                    <Card.Body className="card-body">
                        <Card.Text>   
                            {/* create a state for storing the items added */}
                        </Card.Text>
                    </Card.Body>
                <br />

                {/* Lunch */}
                <Card.Header as="h5" style={{ backgroundColor: 'palevioletred', color: 'white' }}>Lunch</Card.Header>
                    <Card.Body className="card-body">
                        <Card.Text>   

                        </Card.Text>
                    </Card.Body>
                <br />

                {/* Dinner */}
                <Card.Header as="h5" style={{ backgroundColor: 'hotpink', color: 'white' }}>Dinner</Card.Header>
                    <Card.Body className="card-body">
                        <Card.Text>   

                        </Card.Text>
                    </Card.Body>
                <br />

                <Button style={{ width: '10rem' }}>Submit</Button>
            </Card>
            <h1>Add from the recipes below</h1>

            <div className="recipes">
                {/* why is it when i try importing the ViewMeals component here it throws an error */}
                {recipes.map((recipe) => {
                    return (
                        <div key={recipe.id}>
                            <MealExample key={recipe.id} recipe={recipe} />
                            <Button className='add-button' style={{ borderColor: 'transparent', backgroundColor: 'mediumvioletred', color: 'white' }}>Breakfast</Button>
                            <Button className='add-button' style={{ borderColor: 'transparent', backgroundColor: 'palevioletred', color: 'white' }}>Lunch</Button>
                            <Button className='add-button' style={{ borderColor: 'transparent', backgroundColor: 'hotpink', color: 'white' }}>Dinner</Button>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default BuildMealPlan;
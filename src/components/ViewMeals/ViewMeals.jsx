import MealExample from '../MealExample/MealExample';
import { Link } from 'react-router-dom';

const ViewMeals = (props) => {
    const { recipes } = props; // declare recipes var, each item in the array

    return (
        <div className="recipes">
            {recipes.map((recipe) => (
                    <MealExample key={recipe.id} recipe={recipe}></MealExample>
            ))}
        </div>
    );
}

export default ViewMeals;
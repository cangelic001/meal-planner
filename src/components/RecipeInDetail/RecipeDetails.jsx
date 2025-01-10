import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./RecipeDetails.css"

const RecipeDetails = ({recipes}) => {
    const {id} = useParams(); 

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const foundRecipe = recipes.find((recipe) => recipe.id.toString() === id);
        setRecipe(foundRecipe); 
    }, [id, recipes]); 

    if (!recipe) {
        return <div>Loading...</div>; 
    }

    const ingredients = recipe?.ingredients || [];
    const totalTimeNeeded = recipe ? recipe.prepTimeMinutes + recipe.cookTimeMinutes : 0;
    const instructions = recipe?.instructions;

    return (
        <div>
          <section>
              <Card className="card-scrollable" style={{ height: '50rem', overflow: 'auto', padding: '10px' }}> 
                  <Card.Img variant="top"  src={recipe?.image} />
                  <Card.Body className="card-body" style={{ padding: '15px'}}>
                      <Card.Title className="recipe-title">{recipe?.name}</Card.Title>
                        <div>
                            <span className="bold-header">Calories :</span> {recipe?.caloriesPerServing} cals
                            <br />
                            <span className="bold-header">Total Time (Prep + Cook) :</span> {totalTimeNeeded} minutes
                            <br />
                            <span className="bold-header">Difficulty :</span> {recipe?.difficulty}
                            <br />
                            <span className="bold-header">Ingredients : </span>
                            <ul>{ingredients.map((ingredient, id) => (
                                <li key={id}>{ingredient}</li>
                            ))}
                            </ul>
                            <span className="bold-header">Instructions : </span>
                            <ol>{instructions.map((step, id) => (
                                <li key={id}>{step}</li>
                            ))}
                            </ol>
                        </div>
                  </Card.Body>
              </Card>
          </section>
      </div>
    )
}

export default RecipeDetails;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MealExample.css';
import { Link } from 'react-router-dom';

const MealExample = (props) => {
  const { recipe } = props; 
  
  const totalTimeNeeded = recipe?.prepTimeMinutes + recipe?.cookTimeMinutes;

  return (
      <div>
          <section>
              <Card style={{ width: '30rem', height: '40rem'}}> 
                  {/* has image, body (title + text) */}
                  <Card.Img variant="top" src={recipe?.image} />
                  <Card.Body className="card-body">
                      <Card.Title>{recipe?.name}</Card.Title>
                      <Card.Text>
                        Calories : {recipe?.caloriesPerServing} calories
                        <br />
                        Total Time (Prep + Cook) : {totalTimeNeeded} minutes
                        <br />
                        Difficulty : {recipe?.difficulty}
                      </Card.Text>
                      <Link to={`/view-meals/${recipe.id}`}>
                      <Button variant="primary">View Recipe in Detail</Button>
                      </Link>
                  </Card.Body>
              </Card>
          </section>
      </div>
  );
}

export default MealExample;
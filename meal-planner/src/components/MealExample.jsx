import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './MealExample.css';

const MealExample = (props) => {
  const { recipe } = props; // declare recipe var, each item in the array

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
                        Calories : {recipe?.caloriesPerServing} cals
                        <br />
                        Total Time (Prep + Cook) : {totalTimeNeeded} minutes
                        <br />
                        Difficulty : {recipe?.difficulty}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
              </Card>
          </section>
      </div>
  );
}

export default MealExample;
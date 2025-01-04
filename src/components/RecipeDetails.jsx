import { useParams } from "react-router-dom";


export default function RecipeDetails ({recipes}) {
    // based on Route in App.jsx this component is a child component to
    const {id} = useParams(); // to extract recipe id from the URL defined in the Route where this component is a child element to.

    // based on the props passed into the component
    const ingredients = recipes.ingredients

    return (
        <div>
          <section>
              <Card style={{ width: '30rem', height: '40rem'}}> 
                  {/* has image, body (title + text) */}
                  <Card.Img variant="top" src={recipes?.image} />
                  <Card.Body className="card-body">
                      <Card.Title>{recipes?.name}</Card.Title>
                      <Card.Text>
                        Calories : {recipes?.caloriesPerServing} cals
                        <br />
                        Total Time (Prep + Cook) : {totalTimeNeeded} minutes
                        <br />
                        Difficulty : {recipe?.difficulty}
                        <br />
                        Ingredients : 
                        <ul>{ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                        ))}
                        </ul>
                        <br />
                        
                      </Card.Text>
                      <Button variant="primary">View Recipe in Detail</Button>
                  </Card.Body>
              </Card>
          </section>
      </div>
    )
}
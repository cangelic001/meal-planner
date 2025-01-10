import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button"
import { deleteMealPlansByDate } from "../services/deleteAirtableService";

const MealCard = ({ date, breakfast, lunch, dinner, setMealPlans }) => {
    const handleDelete = async () => {
        try {
            await deleteMealPlansByDate(date);
            setMealPlans((prevMealPlans) => prevMealPlans.filter((plan) => plan.date !== date));
        } catch (error) {
            console.error("Error deleting meal plan:", error);
            alert("An error occurred while deleting the meal plan.");
        }
    };
    
    return (
        <div>
            <Card>
                <p style={{fontWeight: "bold", color: "mediumvioletred"}}>Selected Date: {date}</p>
            {/* breakfast */}
                <Card.Header as="h5" style={{ backgroundColor: 'mediumvioletred', color: 'white' }}>Breakfast</Card.Header>
                    <Card.Body className="card-body">
                        {breakfast || 'No meal planned'}
                    </Card.Body>

            {/* lunch */}
                <Card.Header as="h5" style={{ backgroundColor: 'palevioletred', color: 'white' }}>Lunch</Card.Header>
                    <Card.Body className="card-body">
                        {lunch || 'No meal planned'}
                    </Card.Body>

            {/* dinner */}
                <Card.Header as="h5" style={{ backgroundColor: 'hotpink', color: 'white' }}>Dinner</Card.Header>
                    <Card.Body className="card-body">
                        {dinner || 'No meal planned'}
                    </Card.Body>
                    <Button variant="danger" onClick={handleDelete} style={{ marginTop: "10px", height: "50px"}}>Delete Meal Plan</Button>
            </Card>
            
        </div>
    )
}

export default MealCard;
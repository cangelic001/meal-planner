import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <h1>What would you like to do today?</h1>
            <Link to='/view-meals'>
                <Button variant="light" className="browse">I want to browse recipes!</Button>
            </Link>
            <Link to='/build-meal-plan'>
                <Button variant="light" className="create">I want to create a meal plan!</Button>
            </Link>
            <Link to='/view-meal-plans'>
                <Button variant="light" className="see">I want to see the meal plans created!</Button>
            </Link>
            
        </div>
    );
}

export default Home;
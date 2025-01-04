import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='nav-bar'>
            <div>
                    <Link to='/' className='tab-home'>Home</Link>
                    <Link to='/view-meals' className='tab-vm'>View Meals</Link>
                    <Link to='/build-meal-plan' className='tab-bmp'>Build a Meal Plan</Link>
                    <Link to='/view-meal-plans' className='tab-vmp'>View Created Meal Plans</Link>
            </div>
        </nav>
    );
};

export default NavBar;
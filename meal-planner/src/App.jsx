import { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import './App.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import NavBar from './components/NavBar/NavBar';
import ViewMeals from './components/ViewMeals/ViewMeals';
import BuildMealPlan from './components/BuildMealPlan/BuildMealPlan';
import ViewMealPlans from './components/ViewMealPlans/ViewMealPlans';
import Home from './components/Home/Home';
const apiUrl = `${import.meta.env.VITE_MEAL_DB_URL}`;

const App = () => {

  const [recipes, setRecipes] = useState([]);

  // fetch API data for meals to display in View Meals tab
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const { recipes } = await res.json();
      setRecipes(recipes);
    };

    fetchData();
  }, []);

// add function 

  return (
    <>
      <NavBar></NavBar>
      <h1 className='tagline'>Meal planning tagline</h1>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/view-meals' element={<ViewMeals recipes={recipes}/>}/>
        <Route path='/build-meal-plan' element={<BuildMealPlan recipes={recipes}/>}/>
        <Route path='/view-meal-plans' element={<ViewMealPlans />}/>
        <Route path="*" element={<h1>Whoops nothing here!</h1>} />
      </Routes>
    </>
  );
}

export default App


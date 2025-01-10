import { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import './App.css'
import ribbonImage from "./assets/images/ribbon.webp"

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar/NavBar';
import ViewMeals from './components/ViewMeals/ViewMeals';
import BuildMealPlan from './components/BuildMealPlan/BuildMealPlan';
import ViewMealPlans from './components/ViewMealPlans/ViewMealPlans';
import Home from './components/Home/Home';
import RecipeDetails from './components/RecipeInDetail/RecipeDetails';
import { DateProvider } from './components/DateContext';

const apiUrl = `${import.meta.env.VITE_MEAL_DB_URL}`;

const App = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const { recipes } = await res.json();
      setRecipes(recipes);
    };

    fetchData();
  }, []);

  const initialPlan = {
    breakfast: 0,
    lunch: 0,
    dinner: 0
   }
  const [dailyPlanBuilder, setDailyPlanBuilder] = useState([initialPlan])

  const addToPlan = (mealChosen) => {
    setDailyPlanBuilder({...dailyPlanBuilder, [mealType]: mealName})

  };

  return (
    <>
      <DateProvider>
        <NavBar></NavBar>

        <div className="text">
          <img src={ribbonImage} alt="Ribbon" className="ribbon tagline"></img>
          <h1 className='tagline'>Eat smart, stay fit, feel lit!</h1>
          <img src={ribbonImage} alt="Ribbon" className="ribbon tagline"></img>
        </div>

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/view-meals' element={<ViewMeals recipes={recipes} />}/>
          <Route path='/view-meals/:id' element={<RecipeDetails recipes={recipes}/>}/>
          <Route path='/build-meal-plan' element={<BuildMealPlan recipes={recipes}/>}/>
          <Route path='/view-meal-plans' element={<ViewMealPlans />}/>
          <Route path="*" element={<h1>Whoops nothing here!</h1>} />
        </Routes>
      </DateProvider>
    </>
  );
}

export default App
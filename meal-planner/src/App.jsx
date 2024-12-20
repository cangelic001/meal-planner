import { useEffect, useState } from 'react'
import './App.css'

// Bootstrap
import MealExample from './components/MealExample';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';

const App = () => {

  return (
    <>
      <NavBar></NavBar>
      <h1>Hello world!</h1>
      <section className='meal-example'>
        <MealExample />
        <MealExample />
        <MealExample />
      </section>
      
    </>
  );
}

export default App


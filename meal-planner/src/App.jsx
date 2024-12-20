import { useEffect, useState } from 'react'
import './App.css'

// Bootstrap
import MealExample from './components/MealExample';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  return (
    <>
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


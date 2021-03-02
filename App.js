import React, { useState,useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';
const App = ()=> {
  const APP_ID = "a96de192";
  const APP_KEY = "1124d8ebf07edbb532fd56f734ce5500";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('chicken');
  

  

  useEffect( () => {
    getRecipes();
    

  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  }
  const updateSearch = e => {
    setSearch(e.target.value)
    
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }
  return (
    <div className = 'App'>
    <form onSubmit = {getSearch} className = 'Search-form'>
      <input className = 'Search-bar' type  = 'text' value = {search} onChange = {updateSearch}/>
      <button className = 'Search-button' type = 'submit'>Search</button>
    </form>
    <div className = "recipes">
    {recipes.map(recipe => (
      <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
      />
      
    ))}
    </div>

      
    </div>
  );
};
export default App;
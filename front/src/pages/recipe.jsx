import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SimilarRecipes from '../components/SimilarRecipes'; 
import '../style.css';

export default function Recipe() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const titre = query.get('titre');
    const difficulte = query.get('difficulte');
    const temps = query.get('temps');

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/get-recipe?titre=${titre}&difficulte=${difficulte}&temps=${temps}`);
        const data = await response.json();
        const recipeData = JSON.parse(data[0].message.content); 
        setRecipeDetails(recipeData);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      }
    };

    fetchRecipe();
  }, [location]);

  return (
    <div className="recipe-details">
        {recipeDetails ? (
          <div>
            <h2>{recipeDetails.titre}</h2>
            <p>Difficulté : {recipeDetails.difficulte}</p>
            <p>Temps : {recipeDetails.temps}</p>
            <p>Ingrédients : {recipeDetails.ingredients.join(', ')}</p>
            <p>Étapes : {recipeDetails.etapes.join(', ')}</p>
          </div>
        ) : (
          <p>Chargement de la recette...</p>
        )}
        {recipeDetails && <SimilarRecipes recipeTitle={recipeDetails.titre} />}
    </div>
  );
}

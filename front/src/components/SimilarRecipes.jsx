import React, { useState, useEffect } from 'react';

function SimilarRecipes({ recipeTitle }) {
  const [similarRecipes, setSimilarRecipes] = useState([]);

  useEffect(() => {
    const fetchSimilarRecipes = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/get-similar-recipe?recipe=${encodeURIComponent(recipeTitle)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const recipes = JSON.parse(data[0].message.content).recettes; 
          setSimilarRecipes(recipes);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes similaires:", error);
      }
    };

    if (recipeTitle) {
      fetchSimilarRecipes();
    }
  }, [recipeTitle]);

  return (
    <div className="similar-recipes">
      <h3>Recettes Similaires</h3>
      <div>
        {similarRecipes.map((recipe, index) => (
          <a href={`/recipe?titre=${encodeURIComponent(recipe.titre)}&description=${encodeURIComponent(recipe.description)}&temps=${encodeURIComponent(recipe.temps)}`} key={index} className="similar-recipe-link">
            <h4>{recipe.titre}</h4>
            <p>{recipe.description}</p>
            <p>Temps : {recipe.temps}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SimilarRecipes;

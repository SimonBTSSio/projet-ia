import React, { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://195.35.29.110:3000/search-recipe?question=${encodeURIComponent(query)}`);
      const data = await response.json();

      const recipesData = data.map(item => JSON.parse(item.message.content).recettes).flat();
      setRecipes(recipesData);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
  };

  return (
    <div>
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher des recettes..."
            />
            <button type="submit">Rechercher</button>
        </form>

        <div>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.titre}</h3>
              <p>Difficulté : {recipe.difficulte}</p>
              <p>Temps : {recipe.temps}</p>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
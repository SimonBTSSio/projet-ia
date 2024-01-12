import { useState } from 'react';
import '../style.css';
import Navbar from "../home/Navbar.jsx";

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch(`http://localhost:3001/search-recipe?question=${encodeURIComponent(query)}`);
      const data = await response.json();
      const recipesData = Object.values(data);
      setRecipes(recipesData[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
    setIsLoading(false);
  };

  return (
      <div>
          <Navbar/>
          <div className="search">
              <form onSubmit={handleSearch}>
                  <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher des recettes..."
                      disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading}>Rechercher</button>
              </form>

              <div className="recipe-container">
                  {recipes.map((recipe, index) => {
                      const recipeUrl = `/recipe?titre=${encodeURIComponent(recipe.titre)}&difficulte=${encodeURIComponent(recipe.difficulte)}&temps=${encodeURIComponent(recipe.temps)}`;

                      return (
                          <a href={recipeUrl} className="recipe-box" key={index}>
                              <h3>{recipe.titre}</h3>
                              <p>Difficulté : {recipe.difficulte}</p>
                              <p>Temps : {recipe.temps}</p>
                              <p>{recipe.description}</p>
                          </a>
                      );
                  })}
              </div>
          </div>
      </div>
  );
}

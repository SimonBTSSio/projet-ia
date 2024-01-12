import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SimilarRecipes from '../components/SimilarRecipes';
import AccompanimentSuggester from '../components/AccompanimentSuggester';
import '../style.css';
import RecipeEvaluation from "../components/comment/RecipeEvaluation.jsx";
import CommentList from "../components/comment/CommentList.jsx";
import TabMenu from "../components/recipe/TabMenu.jsx";
import AddIngredientsToShoppingListButton from '../components/AddIngredientsToShoppingListButton';

export default function Recipe() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/api/recipes/name/${recipeDetails.titre}`);
        const data = await response.json();
        if (data.recipe.id) {
          const commentResponse = await fetch(`http://195.35.29.110:3000/api/comments/${data.recipe.id}`);
            const commentData = await commentResponse.json();

            setComments(commentData.comments)
        } else {
          console.log("pas de commentaires");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      }
    }
    fetchComments();

  }, [recipeDetails]);

  console.log(comments)
  const tabsData = [
    { label: 'Recettes similaires', content: <SimilarRecipes recipeTitle={recipeDetails?.titre} /> },
    { label: 'Commentaires', content:<CommentList comments={comments}/>
    }
  ];

  console.log(comments)

  return (
    <div className="recipe-details">
        {recipeDetails ? (
          <div>
            <h2>{recipeDetails.titre}</h2>
            <p>Difficulté : {recipeDetails.difficulte}</p>
            <p>Temps : {recipeDetails.temps}</p>
            <p>Ingrédients : {recipeDetails.ingredients}</p>
            <p>Étapes : {recipeDetails.etapes}</p>
            <div class="btn-container">
              <AddIngredientsToShoppingListButton ingredients={recipeDetails.ingredients} />
              <RecipeEvaluation recette={recipeDetails}>Evaluer cette recette</RecipeEvaluation>
            </div>
          </div>
        ) : (
          <p>Chargement de la recette...</p>
        )}
        {recipeDetails && <TabMenu tabsData={tabsData} />}
        {recipeDetails && <AccompanimentSuggester recipeTitle={recipeDetails.titre} />}
    </div>
  );
}
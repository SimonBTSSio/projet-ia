import React from 'react';

const AddIngredientsToShoppingListButton = ({ ingredients }) => {
  const handleAddToShoppingList = async () => {
    const ingredientList = ingredients.split(' - ');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Veuillez vous connecter pour ajouter à la liste de courses.');
      return;
    }

    try {
      const response = await fetch('http://195.35.29.110:3000/api/todoLists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ingredientList })
      });

      if (response.ok) {
        alert('Ingrédients ajoutés à la liste de courses !');
      } else {
        alert('Erreur lors de l’ajout à la liste de courses.');
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout à la liste de courses:', error);
    }
  };

  return (
    <button onClick={handleAddToShoppingList}>
      Ajouter les ingrédients à la liste de courses
    </button>
  );
};

export default AddIngredientsToShoppingListButton;

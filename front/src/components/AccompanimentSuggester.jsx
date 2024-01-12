import React, { useState } from 'react';

const AccompanimentSuggester = ({ recipeTitle }) => {
  const [accompaniments, setAccompaniments] = useState([]);

  const fetchAccompaniments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/accompaniement?recipe=${recipeTitle}`);
      const data = await response.json();
      const recipeData = JSON.parse(data[0].message.content);
      console.log(recipeData);
      setAccompaniments(recipeData.accompagnements);
    } catch (error) {
      console.error("Erreur lors de la récupération des accompagnements:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAccompaniments}>Obtenir des suggestions d'accompagnements</button>
      {accompaniments.length > 0 && (
        <div>
          <h3>Suggestions d'accompagnements:</h3>
          <ul>
            {accompaniments.map((item, index) => (
              <li key={index}>{item.nom}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccompanimentSuggester;
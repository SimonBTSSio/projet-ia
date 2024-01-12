import {useEffect, useState} from 'react';
import '../style.css';
import Navbar from "../home/Navbar.jsx";
import 'regenerator-runtime';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const { transcript, resetTranscript, browserSupportsSpeechRecognition, finalTranscript} = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://195.35.29.110:3000/search-recipe?question=${encodeURIComponent(query)}`);
      const data = await response.json();
      const recipesData = Object.values(data);

      setRecipes(recipesData);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
    setIsLoading(false);
  };

    useEffect(() => {
        setQuery(transcript);

        if (finalTranscript !== '') {
            setIsListening(false);
            handleSearch({ preventDefault: () => {} });
        }

    }, [transcript, finalTranscript, handleSearch]);

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    const handleVoice = () => {
        setIsListening(true);
        SpeechRecognition.startListening({ language: 'fr-FR' });
        resetTranscript();
    }

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
                  <KeyboardVoiceIcon onClick={handleVoice} color={isListening ? 'primary' : 'disabled'} />
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

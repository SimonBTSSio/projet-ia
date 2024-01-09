const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes');
const recipeRoutes = require('./routes/recipe.routes');
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/ping', async (req, res) => {
    res.json({"res": "pong"})
});

app.get('/api', async (req, res) => {
  res.json({"foo": req.query.test})
});

app.get('/get-recipe', async (req, res) => {
  try {
      const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: "Tu es sur un site de cuisine, tu dois me donner une recette avec les informations suivantes et tu dois me retourner les informations au format json les champs jsons doivents être (titre, difficulte, temps, ingredients, etapes). Informations à retourner : le nom de la recette, le temps de préparation, le niveau de difficulté, les ingrédients, et chaque étapes de la recettes. Informations recette : titre = " + req.query.titre + " / difficulté = " + req.query.difficulte + " / temps = " + req.query.temps}],
          model: "gpt-3.5-turbo",
      });
      res.send(completion.choices);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.get('/get-similar-recipe', async (req, res) => {
  try {
      const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: "Tu dois me proposer plusieurs recettes similaire à celle ci en me donnant le titre, la description et le temps de réalisation, tu dois me faire une réponse au format json, les champs json de chaque recettes devront être (titre, description, temps). Recette : " + req.query.recipe}],
          model: "gpt-3.5-turbo",
      });
      res.send(completion.choices);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.get('/search-recipe', async (req, res) => {
  try {
      const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: "Tu es un moteur de recherche intelligent, en te basant sur la recherches suivantes je veux que tu retourne plusieurs recettes, t'as réponse doit être au format json , chaque recette poséde un titre (nom champ json : titre), le niveau de difficulté (facile, moyen ou dur)(nom champ json : difficulte), le temps moyen pour réaliser la recette (nom champ json : temps) et enfin une petite description de la recette (nom champ json : description). recherche utilisateurs : " + req.query.question }],
          model: "gpt-3.5-turbo",
      });
      res.send(completion.choices);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.get('/chat-bot', async (req, res) => {
  try {
      const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: req.query.question }],
          model: "gpt-3.5-turbo",
      });
      res.send(completion.choices);
  } catch (error) {
      res.status(500).send({ message: error });
  }
});
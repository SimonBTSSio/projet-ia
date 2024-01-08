const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
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

app.get('/search-recipe', async (req, res) => {
  try {
      const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: "Tu es un moteur de recherche intelligent, en te basant sur la recherches suivantes je veux que tu retourne plusieurs recettes, t'as réponse doit être au format json, chaque recette poséde un titre, le niveau de difficulté (facile, moyen ou dur), le temps moyen pour réaliser la recette et enfin une petite description de la recette. recherche utilisateurs : " + req.query.question }],
          model: "gpt-3.5-turbo",
      });
      res.send(completion.choices);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

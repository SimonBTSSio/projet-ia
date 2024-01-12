const User = require('../models/user.model');
const RecipeUser = require('../models/recipeuser.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
  try {
    const { login, mail, password } = req.body;
    const newUser = await User.create({ login, mail, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
      const { id } = req.params;
      const { login, mail, password } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      await user.update({ login, mail, password });
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      await user.destroy();
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function registerUser(req, res) {
  try {
    const { login, mail, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Crypter le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe crypté
    const newUser = await User.create({ login, mail, password: hashedPassword });

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: newUser.id }, 'votre_secret_token', { expiresIn: '1h' });

    res.status(201).json({ userId: newUser.id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {async function registerUser(req, res) {
  try {
    const { login, mail, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Crypter le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe crypté
    const newUser = await User.create({ login, mail, password: hashedPassword });

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: newUser.id }, 'votre_secret_token', { expiresIn: '1h' });

    res.status(201).json({ userId: newUser.id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  try {
    const { mail, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ where: { mail } });
    if (!existingUser) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier si le mot de passe est correct en comparant avec le hash stocké
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: existingUser.id }, 'votre_secret_token', { expiresIn: '1h' });

    res.status(200).json({ userId: existingUser.id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function logoutUser(req, res) {
  try {
    // Dans une implémentation réelle, vous pouvez simplement ignorer le token et déclarer l'utilisateur comme déconnecté.
    // Ici, pour la démonstration, nous allons simplement retourner un message indiquant la déconnexion réussie.
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const likeRecipe = async (req, res) => {
  try {
    const { recette_id, author } = req.body;

    const [recipeUser, created] = await RecipeUser.findOrCreate({
      where: { recette_id, author },
      defaults: { recette_id, author },
    });

    if (created) {
      res.status(201).json({ message: 'Recette likée avec succès.', recipeUser });
    } else {
      res.status(200).json({ message: 'Vous avez déjà liké cette recette.', recipeUser });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unlikeRecipe = async (req, res) => {
  try {
    const { recette_id, author } = req.params;

    const recipeUser = await RecipeUser.findOne({ where: { recette_id, author } });

    if (!recipeUser) {
      return res.status(404).json({ message: 'Vous n\'avez pas liké cette recette.' });
    }

    await recipeUser.destroy();
    res.status(200).json({ message: 'Recette unlikée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLikedRecipes = async (req, res) => {
    try {
        const { author } = req.params;

        const likedRecipes = await RecipeUser.findAll({ where: { author } });

        if (!likedRecipes) {
        return res.status(404).json({ message: 'Aucune recette likée trouvée pour cet utilisateur.' });
        }

        res.status(200).json({ likedRecipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLikedRecipe = async (req, res) => {
    try {
        const { recette_id, author } = req.params;

        const likedRecipe = await RecipeUser.findOne({ where: { recette_id, author } });

        if (!likedRecipe) {
        return res.status(404).json({ message: 'Aucune recette likée trouvée pour cet utilisateur.' });
        }

        res.status(200).json({ likedRecipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
  likeRecipe,
  getLikedRecipes,
  getLikedRecipe,
  unlikeRecipe,
};
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.post('/like', UserController.likeRecipe);
router.get('/like/:id', UserController.getLikedRecipes);
router.delete('/unlike/:recette_id/:author', UserController.unlikeRecipe);
router.get('/like/:recette_id/:author', UserController.getLikedRecipe);

module.exports = router;

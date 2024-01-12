const express = require('express');
const router = express.Router();
const TodoListController = require('../controllers/todoList.controller');
const TodoList = require('../models/todoList.model');
const TodoItem = require('../models/todoItem.model');

router.post('/', TodoListController.createTodoList);
router.get('/', TodoListController.getAllTodoLists);
router.get('/:id', TodoListController.getTodoListById);
router.put('/:id', TodoListController.updateTodoList);
router.delete('/:id', TodoListController.deleteTodoList);
router.post('/create', async (req, res) => {
    try {
      const { userId, ingredientList } = req.body;

      const newTodoList = await TodoList.create({
        title: 'Liste de courses',
        userId: userId 
      });

      await Promise.all(ingredientList.map(async (ingredient) => {
        await TodoItem.create({
          name: ingredient,
          todoListId: newTodoList.id 
        });
      }));
  
      res.status(201).json({ message: 'TodoList créée avec succès', todoListId: newTodoList.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erreur lors de la création de la TodoList' });
    }
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const TodoItemController = require('../controllers/todoItem.controller');

router.post('/', TodoItemController.createTodoItem);
router.get('/', TodoItemController.getAllTodoItems);
router.get('/:id', TodoItemController.getTodoItemById);
router.put('/:id', TodoItemController.updateTodoItem);
router.delete('/:id', TodoItemController.deleteTodoItem);
router.get('/list/:todoListId', TodoItemController.getTodoItemsByListId);


module.exports = router;
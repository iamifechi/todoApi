const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')

const {
    addTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask
  } = todoController

router.post('/', addTask); //POST /api/v1/todo
router.patch('/:id', updateTask); //PATCH /api/v1/todo/:id
router.delete('/:id', deleteTask); //DELETE /api/v1/todo/:id
router.get('/', getTasks); //GET /api/v1/todo or /api/v1/todo?page=<num>&limit=<num>
router.get('/:id', getTask); //GET /api/v1/todo/:id

module.exports = router;


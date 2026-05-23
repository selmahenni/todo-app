const express = require('express');
const router = express.Router();
const { 
  getAllTasks, 
  getTaskById,
  createTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/tasksController');

// Définition des routes CRUD
router.get('/', getAllTasks);          // GET    /tasks
router.get('/:id', getTaskById);       // GET    /tasks/:id   ← NOUVEAU
router.post('/', createTask);          // POST   /tasks
router.put('/:id', updateTask);        // PUT    /tasks/:id
router.delete('/:id', deleteTask);     // DELETE /tasks/:id

module.exports = router;
import express from 'express'; // Import express only
import { createTask, getAllTask, deleteTask, updateTask, updateImpTask, updateCompTask, getImpTasks, getCompTasks, getIncompTasks } from '../Controller/task.controller.js'; // Import your controller function
import { authenticateToken } from '../Controller/auth.controller.js';

const router = express.Router(); // Create a router instance

// Define your route and attach the controller function
router.post('/createdtask', authenticateToken, createTask); // Changed to ' / tasks ' for clarity
router.get('/getalltasks', authenticateToken, getAllTask); // Changed to ' / tasks ' for clarity
router.delete('/deletetask/:id', authenticateToken, deleteTask)
router.put('/updatetask/:id', authenticateToken, updateTask)
router.put('/updateimptask/:id', authenticateToken, updateImpTask)
router.put('/updatecomtask/:id', authenticateToken, updateCompTask)
router.get('/getimptasks', authenticateToken, getImpTasks); // Changed to ' / tasks ' for clarity
router.get('/getcomptasks', authenticateToken, getCompTasks); // Changed to ' / tasks ' for clarity
router.get('/getincomptasks', authenticateToken, getIncompTasks); // Changed to ' / tasks ' for clarity






export default router; // Export the router
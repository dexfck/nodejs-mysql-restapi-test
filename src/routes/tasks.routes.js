import {Router} from 'express';
import {createTask, updateTask, deleteTask, getOneTask, getTasks} from '../controller/task.controller.js';

const router = Router()
router.get('/task', getTasks)
router.get('/task/:id', getOneTask)
router.post('/task', createTask)
router.patch('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

export default router
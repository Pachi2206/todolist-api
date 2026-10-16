import { Router } from "express";
import { supabase } from "../../lib/supabase.js";
import { validateSchema } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { createTasksRepository } from "./task.repository.js";
import { createTasksService } from "./task.service.js";
import { createTaskController } from "./task.controller.js";
import { createTaskSchema, updateTaskSchema, taskIdParams } from "./task.schema.js";

const taskRepository = createTasksRepository(supabase);
const taskService = createTasksService(taskRepository);
const taskController = createTaskController(taskService);

export const tasksRouter = Router();

tasksRouter.use(requireAuth);   // <- todas las rutas de tareas requieren token

tasksRouter.get('/', taskController.list);
tasksRouter.get('/:id', validateSchema(taskIdParams, 'params'), taskController.getById);
tasksRouter.post('/', validateSchema(createTaskSchema), taskController.create);
tasksRouter.patch('/:id', validateSchema(taskIdParams, 'params'), validateSchema(updateTaskSchema), taskController.update);
tasksRouter.delete('/:id', validateSchema(taskIdParams, 'params'), taskController.remove);

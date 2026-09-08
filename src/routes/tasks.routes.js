const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} = require("../validators/task.validator");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Operaciones relacionadas con tareas
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Devuelve una lista de todas las tareas.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *       401:
 *         description: No autorizado. Se requiere un token JWT.
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Devuelve la información de una tarea específica.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea encontrada correctamente
 *       401:
 *         description: No autorizado. Se requiere un token JWT.
 *       404:
 *         description: Tarea no encontrada
 */
router.get(
  "/:id",
  validate(taskIdSchema, "params"),
  getTaskById
);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una tarea
 *     description: Crea una nueva tarea.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudiar Node.js
 *               description:
 *                 type: string
 *                 example: Repasar Express y JWT
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado. Se requiere un token JWT.
 */
router.post(
  "/",
  validate(createTaskSchema),
  createTask
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Actualiza la información de una tarea existente.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudiar Node.js
 *               description:
 *                 type: string
 *                 example: Repasar Express, JWT y Swagger
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado. Se requiere un token JWT.
 *       404:
 *         description: Tarea no encontrada
 */
router.put(
  "/:id",
  validate(taskIdSchema, "params"),
  validate(updateTaskSchema),
  updateTask
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea existente.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       401:
 *         description: No autorizado. Se requiere un token JWT.
 *       404:
 *         description: Tarea no encontrada
 */
router.delete(
  "/:id",
  validate(taskIdSchema, "params"),
  deleteTask
);

module.exports = router;
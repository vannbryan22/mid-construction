/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The tasks managing API
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Description of the task
 *         status:
 *           type: string
 *           enum: [To Do, In Progress, Done]
 *           description: Status of the task
 *         user_id:
 *           type: integer
 *           description: ID of the user who created the task
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp of the task
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp of the task
 *       required:
 *         - title
 *         - status
 *         - userId
 *     Meta:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Total number of items
 *         size:
 *           type: integer
 *           description: Number of items per page
 *         count:
 *           type: integer
 *           description: Number of items on the current page
 *         page:
 *           type: integer
 *           description: Current page number
 *         lastPage:
 *           type: integer
 *           description: Last page number
 *         from:
 *           type: integer
 *           description: Index of the first item on the page
 *         to:
 *           type: integer
 *           description: Index of the last item on the page
 *         query:
 *           type: string
 *           description: Search query
 *         sortBy:
 *           type: string
 *           description: Field by which to sort
 *         sortDirection:
 *           type: string
 *           enum: [ASC, DESC]
 *           description: Sort direction
 *       required:
 *         - total
 *         - size
 *         - count
 *         - page
 *         - lastPage
 *         - from
 *         - to
 *         - query
 *         - sortBy
 *         - sortDirection
 */

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Failed to retrieve task
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a paginated list of tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [To Do, In Progress, Done]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: "ASC"
 *     responses:
 *       200:
 *         description: A paginated list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 meta:
 *                   $ref: '#/components/schemas/Meta'
 *       500:
 *         description: Failed to retrieve tasks
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Failed to create task
 */

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Failed to update task
 */

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       500:
 *         description: Failed to delete task
 */

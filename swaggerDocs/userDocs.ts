/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         fullName:
 *           type: string
 *           example: John Doe
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2024-08-02T12:00:00Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2024-08-02T12:00:00Z
 *       required:
 *         - id
 *         - name
 *         - email
 *         - fullName
 *         - created_at
 *         - updated_at
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a user by the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to retrieve user
 */

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update an existing user with the current user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete current user
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */

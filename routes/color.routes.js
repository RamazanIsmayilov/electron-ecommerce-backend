const express = require("express");
const { createColor, getColors, updateColor, deleteColor, searchColor } = require("../controllers/color.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Colors
 *   description: Operations about colors
 */

/**
 * @swagger
 * /colors:
 *   post:
 *     summary: Create a new color
 *     tags: [Colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the color
 *                 example: "Green"
 *     responses:
 *       201:
 *         description: The color was successfully created
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, adminMiddleware, createColor)

/**
 * @swagger
 * /colors:
 *   get:
 *     summary: Get all colors
 *     tags: [Colors]
 *     responses:
 *       200:
 *         description: A list of colors
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, adminMiddleware, getColors)

/**
 * @swagger
 * /colors/{id}:
 *   put:
 *     summary: Update a color by ID
 *     tags: [Colors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the color to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the color
 *                 example: "Green"
 *     responses:
 *       200:
 *         description: The updated color
 *       404:
 *         description: Color not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, adminMiddleware, updateColor)

/**
 * @swagger
 * /colors/{id}:
 *   delete:
 *     summary: Delete a color by ID
 *     tags: [Colors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the color to delete
 *     responses:
 *       200:
 *         description: Color deleted
 *       404:
 *         description: Color not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteColor)

/**
 * @swagger
 * /colors/search:
 *   get:
 *     summary: Search colors by query
 *     tags: [Colors]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for colors
 *         schema:
 *           type: string
 *           example: "Green"
 *     responses:
 *       200:
 *         description: A list of matching colors
 *       500:
 *         description: Internal server error
 */
router.get('/search', authMiddleware, adminMiddleware, searchColor)




module.exports = router
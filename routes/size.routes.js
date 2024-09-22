const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  createSize,
  getSizes,
  updateSize,
  deleteSize,
  searchSize,
} = require("../controllers/size.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sizes
 *   description: Operations related to sizes
 */

/**
 * @swagger
 * /sizes:
 *   post:
 *     summary: Create a new size
 *     tags: [Sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the size
 *                 example: "24"
 *     responses:
 *       201:
 *         description: The size was successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, adminMiddleware, createSize);

/**
 * @swagger
 * /sizes:
 *   get:
 *     summary: Get all sizes
 *     tags: [Sizes]
 *     responses:
 *       200:
 *         description: A list of sizes
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, adminMiddleware, getSizes);

/**
 * @swagger
 * /sizes/{id}:
 *   put:
 *     summary: Update a size by ID
 *     tags: [Sizes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the size to update
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
 *                 description: The new name of the size
 *                 example: "27"
 *     responses:
 *       200:
 *         description: The updated size
 *       404:
 *         description: Size not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, adminMiddleware, updateSize);

/**
 * @swagger
 * /sizes/{id}:
 *   delete:
 *     summary: Delete a size by ID
 *     tags: [Sizes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the size to delete
 *     responses:
 *       200:
 *         description: Size deleted
 *       404:
 *         description: Size not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteSize);

/**
 * @swagger
 * /sizes/search:
 *   get:
 *     summary: Search sizes by query
 *     tags: [Sizes]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for sizes
 *         schema:
 *           type: string
 *           example: "24"
 *     responses:
 *       200:
 *         description: A list of matching sizes
 *       500:
 *         description: Internal server error
 */
router.get("/search", authMiddleware, adminMiddleware, searchSize);

module.exports = router;

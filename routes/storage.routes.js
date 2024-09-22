const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  createStorage,
  getStorages,
  updateStorage,
  deleteStorage,
  searchStorage,
} = require("../controllers/storage.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Storages
 *   description: Operations related to storages
 */

/**
 * @swagger
 * /storages:
 *   post:
 *     summary: Create a new storage
 *     tags: [Storages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the storage
 *                 example: "128GB"
 *     responses:
 *       201:
 *         description: The storage was successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, adminMiddleware, createStorage);

/**
 * @swagger
 * /storages:
 *   get:
 *     summary: Get all storages
 *     tags: [Storages]
 *     responses:
 *       200:
 *         description: A list of storages
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, adminMiddleware, getStorages);

/**
 * @swagger
 * /storages/{id}:
 *   put:
 *     summary: Update a storage by ID
 *     tags: [Storages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the storage to update
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
 *                 description: The new name of the storage
 *                 example: "256GB"
 *     responses:
 *       200:
 *         description: The updated storage
 *       404:
 *         description: Storage not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, adminMiddleware, updateStorage);

/**
 * @swagger
 * /storages/{id}:
 *   delete:
 *     summary: Delete a storage by ID
 *     tags: [Storages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the storage to delete
 *     responses:
 *       200:
 *         description: Storage deleted
 *       404:
 *         description: Storage not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteStorage);

/**
 * @swagger
 * /storages/search:
 *   get:
 *     summary: Search storages by query
 *     tags: [Storages]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for storages
 *         schema:
 *           type: string
 *           example: "128GB"
 *     responses:
 *       200:
 *         description: A list of matching storages
 *       500:
 *         description: Internal server error
 */
router.get("/search", authMiddleware, adminMiddleware, searchStorage);

module.exports = router;

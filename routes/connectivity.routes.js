const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  createConnectivity,
  getConnectivities,
  updateConnectivity,
  deleteConnectivity,
  searchConnectivity,
} = require("../controllers/connectivity.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Connectivities
 *   description: Operations related to connectivities
 */

/**
 * @swagger
 * /connectivities:
 *   post:
 *     summary: Create a new connectivity
 *     tags: [Connectivities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the connectivity
 *                 example: "BT"
 *     responses:
 *       201:
 *         description: The connectivity was successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, adminMiddleware, createConnectivity);

/**
 * @swagger
 * /connectivities:
 *   get:
 *     summary: Get all connectivities
 *     tags: [Connectivities]
 *     responses:
 *       200:
 *         description: A list of connectivities
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, adminMiddleware, getConnectivities);

/**
 * @swagger
 * /connectivities/{id}:
 *   put:
 *     summary: Update a connectivity by ID
 *     tags: [Connectivities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the connectivity to update
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
 *                 description: The new name of the connectivity
 *                 example: "BT + 4G"
 *     responses:
 *       200:
 *         description: The updated connectivity
 *       404:
 *         description: Connectivity not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, adminMiddleware, updateConnectivity);

/**
 * @swagger
 * /connectivities/{id}:
 *   delete:
 *     summary: Delete a connectivity by ID
 *     tags: [Connectivities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the connectivity to delete
 *     responses:
 *       200:
 *         description: Connectivity deleted
 *       404:
 *         description: Connectivity not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteConnectivity);

/**
 * @swagger
 * /connectivities/search:
 *   get:
 *     summary: Search connectivities by query
 *     tags: [Connectivities]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for connectivities
 *         schema:
 *           type: string
 *           example: "BT"
 *     responses:
 *       200:
 *         description: A list of matching connectivities
 *       500:
 *         description: Internal server error
 */
router.get("/search", authMiddleware, adminMiddleware, searchConnectivity);

module.exports = router;

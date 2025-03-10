const express = require("express");
const router = express.Router();
const {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  searchBrand,
} = require("../controllers/brand.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations about categories
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *                 example: "Apple"
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, adminMiddleware, createBrand);

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of brands
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, adminMiddleware, getBrands);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to update
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
 *                 description: The new name of the brand
 *                 example: "Sony"
 *     responses:
 *       200:
 *         description: The updated brand
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, adminMiddleware, updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to delete
 *     responses:
 *       200:
 *         description: Brand deleted
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteBrand);

/**
 * @swagger
 * /brands/search:
 *   get:
 *     summary: Search brands by query
 *     tags: [Brands]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for brands
 *         schema:
 *           type: string
 *           example: "Electronics"
 *     responses:
 *       200:
 *         description: A list of matching brands
 *       500:
 *         description: Internal server error
 */
router.get("/search", authMiddleware, adminMiddleware, searchBrand);


module.exports = router;

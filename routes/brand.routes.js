const express = require("express");
const router = express.Router();
const { createBrand, getBrands, updateBrand, deleteBrand } = require("../controllers/brand.controller");

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
router.post("/", createBrand);

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
router.get("/", getBrands);

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
router.put("/:id", updateBrand);

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteBrand);

module.exports = router
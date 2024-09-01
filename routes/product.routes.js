const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteAllProducts,
  deleteProduct,
} = require("../controllers/product.controller");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - images
 *         - price
 *         - description
 *         - stock
 *         - category
 *         - brand
 *       example:
 *         id: 60c72b1f4f1a2c001c9e3d1e
 *         title: iPhone 12
 *         images: ["image1.jpg", "image2.jpg"]
 *         price: 999
 *         description: "New generation iPhone"
 *         bestseller: true
 *         trending: false
 *         new: true
 *         sale: false
 *         stock: 10
 *         category: "Smartphones"
 *         brand: "Apple"
 *         colors: ["Black", "White"]
 *         storages: ["64GB", "128GB"]
 *         sizes: ["5.4 inch", "6.1 inch"]
 *         connectivity: ["WiFi", "4G", "5G"]
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was created successfully
 *       500:
 *         description: Failed to create product
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: All products deleted successfully
 */
router.delete("/", deleteAllProducts);

module.exports = router;

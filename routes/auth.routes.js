const express = require('express');
const router = express.Router();
const { userRegister, userLogin } = require('../controllers/auth.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John
 *         surname:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: password123
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: password123
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', userRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', userLogin);

module.exports = router;

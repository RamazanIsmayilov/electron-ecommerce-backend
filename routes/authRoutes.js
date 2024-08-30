const express = require('express');
const { registerUser, loginUser, registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;

const express = require('express');
const { serveSwaggerDocs, setupSwaggerDocs } = require('../controllers/swaggerController');
const router = express.Router();

router.use('/api-docs', serveSwaggerDocs, setupSwaggerDocs);

module.exports = router;

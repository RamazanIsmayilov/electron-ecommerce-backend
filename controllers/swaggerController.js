const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

exports.serveSwaggerDocs = swaggerUi.serve;
exports.setupSwaggerDocs = swaggerUi.setup(swaggerDocument);

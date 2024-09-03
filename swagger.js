const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eCommerce API',
      version: '1.0.0',
      description: 'API documentation for eCommerce platform',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Endpoint-ləri təyin etdiyiniz faylların yeri
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

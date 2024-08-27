const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require("dotenv").config();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Electron ecommerce");
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

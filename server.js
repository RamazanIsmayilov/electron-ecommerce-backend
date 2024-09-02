const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes")
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

require("dotenv").config();

// Connect to MongoDB
connectDb();

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.get("/", (req, res) => {
  res.send("Electron ecommerce");
});

// Server Setup
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

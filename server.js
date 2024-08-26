const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const { swaggerUiSetup, swaggerUiRender } = require("./config/swagger");
require("dotenv").config();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI 
app.use(require('./routes/swaggerRoutes'));

// Routes
app.use("/auth", authRoutes);
app.use("/", (req, res) => {
  res.send("Electron ecommerce");
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

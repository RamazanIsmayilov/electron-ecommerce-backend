const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");

require("dotenv").config();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.get("/", (req, res) => {
  res.send("Electron ecommerce");
});

// Server Setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

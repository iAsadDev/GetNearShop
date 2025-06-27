const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); 
require("dotenv").config();
// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();



// Routes
app.use('/api/auth', require('./routes/authRoutes.js')); // Authentication routes

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT); // Log the server start message
}); // Start the server on port 5000

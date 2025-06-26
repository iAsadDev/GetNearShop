const express = require('express')
const connectDB = require('./config/db')
const cors = ("cors")

const app = express()
app.use(express.json())
require("dotenv").config()
connectDB();
app.get('/', (req, res) => {
    res.send("Hello World")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`https://localhost:${PORT}`);
})
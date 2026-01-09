const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

//joining routers
const authRoutes=require('./routes/auth');
app.use('/api/auth',authRoutes);


 const returnRoutes = require('./routes/returns');
app.use('/api/returns', returnRoutes);

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-return';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Database Connected Successfully!"))
    .catch((err) => console.log("❌ Database Connection Error: ", err));

// Basic Route
app.get('/', (req, res) => {
    res.send("Smart Return System Server is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}); 
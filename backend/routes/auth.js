const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        const newUser = new User({
            name,
            email,
            password
        });

    
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

    
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

    
        res.status(200).json({ 
            message: "Login Successful!", 
            user: {
                id: user._id,
                name: user.name,
                trustScore: user.trustScore
            } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({
            id: user._id,
            name: user.name,
            trustScore: user.trustScore
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
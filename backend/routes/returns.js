const express = require('express');
const router = express.Router();
const Return = require('../models/Return');
const User = require('../models/user');


router.post('/request', async (req, res) => {
    try {
        const { userId, productName, reason ,imageURL} = req.body;

        
        const user = await User.findById(userId);
        if (user.trustScore < 50) {
            return res.status(403).json({ message: "Your Trust Score is too low for automatic returns. Please contact customer support." });
        }

        const newReturn = new Return({
            userId,
            productName,
            reason,
            imageURL
        });

        await newReturn.save();
        res.status(201).json({ message: "Return request submitted successfully!", returnDetails: newReturn });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


       
router.get('/all', async (req, res) => {
    try {
        const returns = await Return.find().sort({ createdAt: -1 });
        res.json(returns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/verify/:id', async (req, res) => {
    try {
        const { status, adminComment } = req.body; 
        const returnReq = await Return.findById(req.params.id);
        const user = await User.findById(returnReq.userId);

        if (status === "Rejected") {
            user.trustScore -= 20;
            returnReq.imageStatus = "Rejected";
            returnReq.adminComment = adminComment || "No reason provided"; 
        } else {
            returnReq.imageStatus = "Verified";
            returnReq.adminComment = "All good!"; 
        }

        await user.save();
        await returnReq.save();
        res.json({ message: `Status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/user/:userId', async (req, res) => {
    try {
        const history = await Return.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
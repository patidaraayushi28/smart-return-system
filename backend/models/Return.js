const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    reason: { type: String, required: true },
    imageURL: { type: String },
    adminComment: { type: String, default: "" },
    imageStatus: { type: String, default: "Pending" }, // "Pending", "Verified", "Rejected"
    adminComment: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Return', ReturnSchema);

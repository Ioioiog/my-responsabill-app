// models/RecoveryLog.js
const mongoose = require('mongoose');

const RecoveryLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mood: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    activities: [{
        type: String
    }],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RecoveryLog', RecoveryLogSchema);
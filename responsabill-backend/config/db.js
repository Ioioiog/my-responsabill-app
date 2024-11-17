const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Replace ensureIndex with createIndexes
userSchema.index({ email: 1 }, { unique: true });

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

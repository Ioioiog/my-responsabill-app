const express = require('express');
const UserAnalytics = require('../models/UserAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Get all user analytics
router.get('/analytics', [auth, authorize(['admin'])], async (req, res) => {
    try {
        const analytics = await UserAnalytics.find().populate('user', 'name');
        res.json(analytics);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

const express = require('express');
const UserAnalytics = require('../models/UserAnalytics');
const auth = require('../middleware/auth');
const router = express.Router();

// Log user activity
router.post('/log', auth, async (req, res) => {
    const { activity } = req.body;

    try {
        let analytics = await UserAnalytics.findOne({ user: req.user });
        if (!analytics) {
            analytics = new UserAnalytics({ user: req.user, activityLogs: [] });
        }

        analytics.activityLogs.push({ activity });
        await analytics.save();

        res.status(201).json(analytics);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get user analytics
router.get('/', auth, async (req, res) => {
    try {
        const analytics = await UserAnalytics.findOne({ user: req.user });
        if (!analytics) return res.status(404).json({ msg: 'No analytics found' });

        res.json(analytics);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

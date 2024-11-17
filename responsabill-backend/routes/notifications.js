const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a notification
router.post('/', auth, async (req, res) => {
    const { message } = req.body;

    try {
        const notification = new Notification({ user: req.user, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get all notifications for a user
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Mark notification as read
router.put('/:id', auth, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ msg: 'Notification not found' });

        notification.read = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

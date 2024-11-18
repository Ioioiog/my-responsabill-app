// routes/notifications.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// Get all notifications for authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark notification as read
router.put('/:id/read', auth, async (req, res) => {
    try {
        let notification = await Notification.findById(req.params.id);
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { $set: { read: true } },
            { new: true }
        );

        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark all notifications as read
router.put('/read-all', auth, async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user._id, read: false },
            { $set: { read: true } }
        );
        
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a notification
router.delete('/:id', auth, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await notification.remove();
        res.json({ message: 'Notification removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create notification (admin only)
router.post('/', 
    [auth, authorize(['admin'])],
    [
        body('userId').isMongoId(),
        body('message').notEmpty().trim(),
        body('type').isIn(['alert', 'reminder', 'update'])
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newNotification = new Notification({
                user: req.body.userId,
                message: req.body.message,
                type: req.body.type
            });

            const notification = await newNotification.save();
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;
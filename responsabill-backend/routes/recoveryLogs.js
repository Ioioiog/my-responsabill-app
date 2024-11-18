// routes/recoveryLogs.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const RecoveryLog = require('../models/RecoveryLog');
const { body, validationResult } = require('express-validator');

// Get all logs for authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const logs = await RecoveryLog.find({ user: req.user._id })
            .sort({ date: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get log by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const log = await RecoveryLog.findById(req.params.id);
        
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }

        // Verify ownership
        if (log.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(log);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a log
router.post('/',
    auth,
    [
        body('date').isISO8601().toDate(),
        body('mood').isInt({ min: 1, max: 10 }),
        body('activities').isArray(),
        body('notes').optional().trim()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newLog = new RecoveryLog({
                user: req.user._id,
                date: req.body.date,
                mood: req.body.mood,
                activities: req.body.activities,
                notes: req.body.notes
            });

            const log = await newLog.save();
            res.status(201).json(log);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update a log
router.put('/:id',
    auth,
    [
        body('date').optional().isISO8601().toDate(),
        body('mood').optional().isInt({ min: 1, max: 10 }),
        body('activities').optional().isArray(),
        body('notes').optional().trim()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let log = await RecoveryLog.findById(req.params.id);
            
            if (!log) {
                return res.status(404).json({ message: 'Log not found' });
            }

            if (log.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            log = await RecoveryLog.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.json(log);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Delete a log
router.delete('/:id', auth, async (req, res) => {
    try {
        const log = await RecoveryLog.findById(req.params.id);
        
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }

        if (log.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await log.remove();
        res.json({ message: 'Log removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
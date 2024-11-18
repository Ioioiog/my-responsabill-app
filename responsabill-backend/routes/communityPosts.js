// routes/communityPosts.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CommunityPost = require('../models/CommunityPost');
const { body, validationResult } = require('express-validator');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .sort({ createdAt: -1 })
            .populate('user', 'name')
            .populate('comments.user', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a post
router.post('/', 
    auth,
    [
        body('title').notEmpty().trim(),
        body('content').notEmpty().trim()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newPost = new CommunityPost({
                user: req.user._id,
                title: req.body.title,
                content: req.body.content
            });

            const post = await newPost.save();
            await post.populate('user', 'name');
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Update a post
router.put('/:id',
    auth,
    async (req, res) => {
        try {
            let post = await CommunityPost.findById(req.params.id);
            
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Check user ownership
            if (post.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            post = await CommunityPost.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            ).populate('user', 'name');

            res.json(post);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Delete a post
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await post.remove();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add comment to post
router.post('/:id/comments',
    auth,
    [body('content').notEmpty().trim()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const post = await CommunityPost.findById(req.params.id);
            
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            post.comments.unshift({
                user: req.user._id,
                content: req.body.content
            });

            await post.save();
            await post.populate('comments.user', 'name');
            
            res.json(post.comments);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Like/Unlike post
router.put('/:id/like', auth, async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if already liked
        if (post.likes.includes(req.user._id)) {
            // Unlike
            post.likes = post.likes.filter(
                like => like.toString() !== req.user._id.toString()
            );
        } else {
            // Like
            post.likes.unshift(req.user._id);
        }

        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
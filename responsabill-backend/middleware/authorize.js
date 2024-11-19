// middleware/authorize.js
const authorize = (roles = []) => {
    // Convert single role to array if string is provided
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            // User is not logged in
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            // User's role is not authorized
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Authentication and authorization successful
        next();
    };
};

module.exports = authorize;
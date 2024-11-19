const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recovery-logs', require('./routes/recoveryLogs'));
app.use('/api/community-posts', require('./routes/communityPosts'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
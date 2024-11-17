const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // Import auth routes

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', authRoutes); // Use imported auth routes
app.use('/api/users', require('./routes/users'));
app.use(errorHandler); // Use error handler middleware

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
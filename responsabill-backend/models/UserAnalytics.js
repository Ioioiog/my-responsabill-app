const mongoose = require('mongoose');

const UserAnalyticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    activityLogs: [{
        date: {
            type: Date,
            default: Date.now,
        },
        activity: String,
    }],
});

module.exports = mongoose.model('UserAnalytics', UserAnalyticsSchema);

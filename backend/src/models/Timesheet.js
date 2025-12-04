const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
    employeeId: mongoose.Schema.Types.ObjectId,
    employeeName: String,
    date: String,
    timestamp: String,
    hours: Number,
    description: String,
    rating: { type: Number, default: null },
    ratedBy: { type: String, default: null },
    isLocked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);
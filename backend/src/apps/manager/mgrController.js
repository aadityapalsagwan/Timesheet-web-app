const Timesheet = require('../../models/Timesheet');

exports.getAllTimesheets = async (req, res) => {
    try {
        // Real app mein hum sirf manager ki team ko filter karenge
        const sheets = await Timesheet.find().sort({ _id: -1 });
        res.json(sheets);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.rateTimesheet = async (req, res) => {
    try {
        const { id, rating } = req.body;
        await Timesheet.findByIdAndUpdate(id, { rating: rating, isLocked: true });
        res.json({ msg: 'Rated successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
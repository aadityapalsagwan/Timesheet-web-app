const Timesheet = require('../../models/Timesheet');

exports.createTimesheet = async (req, res) => {
    try {
        const { employeeId, employeeName, date, hours, description } = req.body;
        const newSheet = new Timesheet({ employeeId, employeeName, date, hours, description });
        await newSheet.save();
        res.status(201).json({ msg: 'Timesheet submitted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getMyTimesheets = async (req, res) => {
    try {
        const sheets = await Timesheet.find({ employeeId: req.params.id }).sort({ _id: -1 });
        res.json(sheets);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

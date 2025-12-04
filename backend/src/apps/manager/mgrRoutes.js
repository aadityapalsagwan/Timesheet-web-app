const express = require('express');
const router = express.Router();
const Timesheet = require('../../models/Timesheet');

// Get All Timesheets
router.get('/all', async (req, res) => {
    try {
        const sheets = await Timesheet.find().sort({ _id: -1 });
        res.json(sheets);
    } catch (e) { res.status(500).send("Error fetching"); }
});

// Rate Logic
router.post('/rate', async (req, res) => {
    try {
        await Timesheet.findByIdAndUpdate(req.body.id, { 
            rating: req.body.rating, 
            ratedBy: req.body.managerName, 
            isLocked: true 
        });
        res.json({ msg: 'Rated' });
    } catch (e) { res.status(500).send("Error rating"); }
});

module.exports = router;
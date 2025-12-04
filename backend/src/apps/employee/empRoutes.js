const express = require('express');
const router = express.Router();
const Timesheet = require('../../models/Timesheet');

// 1. Add Timesheet
router.post('/add', async (req, res) => {
    try {
        const newSheet = new Timesheet(req.body);
        await newSheet.save();
        res.json({ msg: 'Saved' });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error saving");
    }
});

// 2. Get My Timesheets
router.get('/:id', async (req, res) => {
    try {
        // Sort by date descending (latest first)
        const sheets = await Timesheet.find({ employeeId: req.params.id }).sort({ date: -1 });
        res.json(sheets);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching");
    }
});

// 3. Edit Timesheet
router.put('/edit/:id', async (req, res) => {
    try {
        const sheet = await Timesheet.findById(req.params.id);
        if (!sheet) return res.status(404).json({ msg: "Not found" });
        if (sheet.isLocked) return res.status(403).json({ msg: "Cannot edit locked timesheet" });
        
        await Timesheet.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Updated" });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error updating");
    }
});

// 4. Delete Timesheet (NEW ADDITION)
router.delete('/delete/:id', async (req, res) => {
    try {
        const sheet = await Timesheet.findById(req.params.id);
        if (!sheet) return res.status(404).json({ msg: "Not found" });
        if (sheet.isLocked) return res.status(403).json({ msg: "Cannot delete locked timesheet" });

        await Timesheet.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting");
    }
});

module.exports = router;
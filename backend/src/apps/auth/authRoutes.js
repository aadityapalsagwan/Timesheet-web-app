const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Manager Validation (Single Admin)
        if (role === 'manager') {
            const managerExists = await User.findOne({ role: 'manager' });
            if (managerExists) return res.status(400).json({msg: 'Manager already exists!'});
            if (!email.endsWith('@admin.com')) return res.status(400).json({msg: 'Manager needs @admin.com'});
        }
        
        // Employee Validation
        if(role === 'employee' && !email.match(/(@gmail.com|@outlook.com)$/)) 
            return res.status(400).json({msg: 'Employees need Gmail/Outlook'});

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.json(newUser);
    } catch (err) { res.status(500).json({msg: 'Error creating user'}); }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) return res.status(400).json({ msg: 'Invalid Credentials' });
        res.json(user);
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;
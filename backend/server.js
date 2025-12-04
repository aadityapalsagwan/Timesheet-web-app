const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');

// Import Routes
const authRoutes = require('./src/apps/auth/authRoutes');
const empRoutes = require('./src/apps/employee/empRoutes');
const mgrRoutes = require('./src/apps/manager/mgrRoutes');

// Initialize App
const app = express();
const PORT = 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', empRoutes);
app.use('/api/manager', mgrRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
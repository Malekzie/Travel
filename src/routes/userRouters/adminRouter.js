// routes/adminRouter.js
const express = require('express');
const router = express.Router();

// Example Admin Route
router.get('/dashboard', (req, res) => {
    res.render('Areas/Admin/dashboard', { title: 'Admin Dashboard' });
});

module.exports = router;

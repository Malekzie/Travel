// routes/customerRouter.js
const express = require('express');
const router = express.Router();

// Example Customer Route
router.get('/dashboard', (req, res) => {
    res.render('Areas/Customer/dashboard', { title: 'Customer Dashboard' });
});

module.exports = router;

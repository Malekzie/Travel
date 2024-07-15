// routes/vendorRouter.js
const express = require('express');
const router = express.Router();

// Example Vendor Route
router.get('/dashboard', (req, res) => {
    res.render('Areas/Vendor/dashboard', { title: 'Vendor Dashboard' });
});

module.exports = router;

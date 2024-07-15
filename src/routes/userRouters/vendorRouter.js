// routes/vendorRouter.js
const express = require('express');
const router = express.Router();

// Example Vendor Route
router.get('/dashboard', (req, res) => {
    res.render('pages/Areas/Vendor/dashboard', { title: 'Vendor Dashboard' });
});

module.exports = router;

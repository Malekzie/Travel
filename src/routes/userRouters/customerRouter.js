// routes/customerRouter.js
const express = require('express');
const router = express.Router();

// Example Customer Route
router.get('/', (req, res) => {
    res.render('pages/Areas/Customer/dashboard', { title: 'Customer Dashboard', layout: 'layouts/customer' });
});

module.exports = router;

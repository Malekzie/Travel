const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('pages/packages/index', { title: 'Packages' });
});

module.exports = router;
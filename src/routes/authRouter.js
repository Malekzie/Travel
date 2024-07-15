const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

router.get('/', isAuthenticated ,(req, res) => {
     res.redirect('/profile')
})

router.get('/login', (req, res) => {
     res.render('pages/auth/login', {title: 'Login', layout: 'layouts/auth'});
});

router.get('/register', (req, res) => {
     res.render('pages/auth/register', {title: 'Register', layout: 'layouts/auth'});
});

module.exports = router;
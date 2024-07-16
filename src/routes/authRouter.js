const express = require('express');
const isAuthenticated = require('../middleware/auth');
const authController = require('../controller/authController');
const { uploadProfilePictureHandler } = require('../controller/authController');
const multer = require('multer');
const router = express.Router();
const upload = multer();

router.get('/', isAuthenticated ,(req, res) => {
     res.redirect('/profile')
})

router.get('/login', (req, res) => {
     res.render('pages/auth/login', {title: 'Login', layout: 'layouts/auth'});
});

router.get('/register', (req, res) => {
     res.render('pages/auth/register', {title: 'Register', layout: 'layouts/auth'});
});

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/upload', isAuthenticated, upload.single('profilePicture'), uploadProfilePictureHandler);+

router.post('/logout', authController.logout);
module.exports = router;
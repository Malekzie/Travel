// routes/customerRouter.js
const express = require('express');
const router = express.Router();
const profileController = require('../../controller/profileController');
const profileRepository = require('../../repositories/profileRepository');
const addressRepository = require('../../repositories/addressRepository');

// Example Customer Route
router.get('/', profileController.getProfile, (req, res) => {
    res.render('pages/Areas/Customer/dashboard', { 
        title: 'Customer Dashboard', 
        layout: 'layouts/customer',
    });
});

router.post('/update-profile', async (req, res) => {
    const data = req.body;
    const userId = req.user.id; // Assuming you have the user ID in the session or request object

    try {
        await profileRepository.update(userId, data);
        res.redirect('/profile'); // Redirect to the profile page or another relevant page
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update-address', async (req, res) => {
    const { address } = req.body;
    const userId = req.user.id
    const profile = await profileRepository.findById(userId);
    const profileId = profile.id;
    try {
        await addressRepository.update(profileId, address);
        res.redirect('/profile'); // Redirect to the profile page or another relevant page
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

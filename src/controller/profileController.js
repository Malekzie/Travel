// controllers/profileController.js
const profileService = require('../services/profileService');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user.id` contains the logged-in user's ID.
        const profile = await profileService.getProfile(userId);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        console.log('Fetched Profile:', profile); // Log the profile data
        res.render('pages/Areas/Customer/dashboard', { 
            title: 'Customer Dashboard',
            layout: 'layouts/customer',
            profile: profile
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
};

// controllers/profileController.js
const profileService = require('../services/profileService');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user.id` contains the logged-in user's ID.
        const profile = await profileService.getProfile(userId);
        const address = await profileService.getAddress(profile.id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.render('pages/Areas/Customer/dashboard', { 
            title: 'Customer Dashboard',
            layout: 'layouts/customer',
            profile: profile,
            address: address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getProfile,
};

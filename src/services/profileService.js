// services/profileService.js
const profileRepository = require('../repositories/profileRepository');

const getProfile = async (userId) => {
    return await profileRepository.findProfileByUserId(userId);
};

module.exports = {
    getProfile,
};

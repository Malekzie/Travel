// services/profileService.js
const profileRepository = require('../repositories/profileRepository');

const getProfile = async (userId) => {
    return await profileRepository.findProfileByUserId(userId);
};

const getAddress = async (profileId) => {
    return await profileRepository.findAddressByProfileId(profileId);
}

module.exports = {
    getProfile,
    getAddress
};

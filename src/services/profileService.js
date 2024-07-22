// services/profileService.js
const profileRepository = require('../repositories/profileRepository');
const addressRepository = require('../repositories/addressRepository');

const getProfile = async (userId) => {
    return await profileRepository.findById(userId);
};

const getAddress = async (profileId) => {
    return await addressRepository.findById(profileId);
}

module.exports = {
    getProfile,
    getAddress
};

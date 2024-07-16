const db = require('./prisma');

const findProfileByUserId = async (userId) => {
     return await db.profile.findUnique({
          where: { userId },
          include: {
               address: true
          },
          cacheStrategy: {
               ttl: 60
          }
     });
};

const updateProfile = async (userId, data) => {
     return await db.profile.update({
          where: { userId },
          data
     });
};

const findAddressByProfileId = async (profileId) => {
     return await db.address.findUnique({
          where: { profileId }
     });
}

// profileRepository code
const updateAddress = async (profileId, addressData) => {
     return await db.address.upsert({
         where: { profileId },
         update: {
             address: addressData.address,
             city: addressData.city,
             province: addressData.province,
             country: addressData.country,
             zip: addressData.zip
         },
         create: {
             id: addressData.id, // Make sure to include the ID if necessary
             profileId,
             address: addressData.address,
             city: addressData.city,
             province: addressData.province,
             country: addressData.country,
             zip: addressData.zip
         }
     });
 };
 


module.exports = {
     findProfileByUserId,
     updateProfile,
     findAddressByProfileId,
     updateAddress
}
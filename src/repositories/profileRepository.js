const db = require('./prisma');

const findProfileByUserId = async (userId) => {
     return await db.profile.findFirst({
          where: { userId },
          include: {
               address: true
          }
     });
};


module.exports = {
     findProfileByUserId
}
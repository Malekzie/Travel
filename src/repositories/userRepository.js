const db = require('./prisma');

const findUserByEmail = async (email) => {
     return await db.user.findUnique({
          where: { email: email },
          cacheStrategy: {
               ttl: 60
          }
     });
}

const findUserById = async (id) => {
     return await db.user.findUnique({
          where: {
               id
          },
          select: {
               id: true,
               username: true,
               email: true
          },
          cacheStrategy: {
               ttl: 60
          }
     })
}

const createUser = async (data) => {
     return await db.user.create({
          data
     })
}

const saveImageUrlToDatabase = async (userId, imageUrl) => {
     // Your database logic here
     // Example: await User.findByIdAndUpdate(userId, { profileImageUrl: imageUrl });
};

module.exports = {
     findUserByEmail,
     findUserById,
     createUser,
     saveImageUrlToDatabase
}
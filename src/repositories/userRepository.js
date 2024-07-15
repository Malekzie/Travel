const db = require('./prisma');

const findUserByEmail = async (email) => {
     return await db.user.findUnique({
         where: { email: email },
         select: { email: true, password: true, id: true }
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
           }
     })
}

const createUser = async (data) => {
     return await db.user.create({
          data
     })
}

module.exports = {
     findUserByEmail,
     findUserById,
     createUser
}
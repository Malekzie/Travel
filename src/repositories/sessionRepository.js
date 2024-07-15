const db = require('./prisma');

const createSession = async (data) => {
    return await db.session.create({
        data,
    });
};

module.exports = {
    createSession,
};

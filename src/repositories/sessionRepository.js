// sessionRepository.js

const db = require('./prisma');
const BaseRepository = require('./baseRepository');

class SessionRepository extends BaseRepository {
    async create(data) {
        return await db.session.create({
            data
        });
    }

    async findById(id) {
        return await db.session.findUnique({
            where: { id },
            cacheStrategy: {
                ttl: 40,
                swr: 60
            }
        });
    }

    async findAll() {
        return await db.session.findMany({
            cacheStrategy: {
                ttl: 40,
                swr: 60
            }
        });
    }

    async update(id, data) {
        return await db.session.update({
            where: { id },
            data
        });
    }

    async delete(id) {
        return await db.session.delete({
            where: { id }
        });
    }
}

module.exports = new SessionRepository();

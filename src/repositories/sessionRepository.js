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
            where: { id }
        });
    }

    async findAll() {
        return await db.session.findMany();
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

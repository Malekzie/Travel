// userRepository.js

const db = require('./prisma');
const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
    async findById(id) {
        return await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true
            },
            cacheStrategy: {
                ttl: 60
            }
        });
    }

    async findByEmail(email) {
        return await db.user.findUnique({
            where: { email },
            cacheStrategy: {
                ttl: 60
            }
        });
    }

    async findAll() {
        return await db.user.findMany();
    }

    async create(data) {
        return await db.user.create({
            data
        });
    }

    async update(id, data) {
        return await db.user.update({
            where: { id },
            data
        });
    }

    async delete(id) {
        return await db.user.delete({
            where: { id }
        });
    }

    async saveImageUrlToDatabase(userId, imageUrl) {
        await db.user.update({
            where: { id: userId },
            data: { profileImageUrl: imageUrl }
        });
    }
}

module.exports = new UserRepository();

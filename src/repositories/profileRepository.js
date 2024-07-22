// profileRepository.js

const db = require('./prisma');
const { convertDateToISO } = require('../utils/dateUtils');
const BaseRepository = require('./baseRepository');

class ProfileRepository extends BaseRepository {
    async findById(userId) {
        return await db.profile.findFirst({
            where: { userId },
            include: {
                address: true
            }
        });
    }

    async findAll() {
        return await db.profile.findMany({
            include: {
                address: true
            }
        });
    }

    async create(data) {
        return await db.profile.create({
            data
        });
    }

    async update(userId, data) {
        const profile = await this.findById(userId);

        if (!profile) {
            throw new Error('Profile not found');
        }

        if (data.dateOfBirth) {
            data.dateOfBirth = convertDateToISO(data.dateOfBirth);
        }

        return await db.profile.update({
            where: { id: profile.id },
            data
        });
    }

    async delete(userId) {
        const profile = await this.findById(userId);

        if (!profile) {
            throw new Error('Profile not found');
        }

        return await db.profile.delete({
            where: { id: profile.id }
        });
    }
}

module.exports = new ProfileRepository();

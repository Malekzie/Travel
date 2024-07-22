// addressRepository.js

const db = require('./prisma');
const BaseRepository = require('./baseRepository');

class AddressRepository extends BaseRepository {
    async findById(profileId) {
        return await db.address.findFirst({
            where: { profileId }
        });
    }

    async findAll() {
        return await db.address.findMany();
    }

    async create(data) {
        return await db.address.create({
            data
        });
    }

    async update(profileId, data) {
        const updateData = {
            address: data.address,
            city: data.city,
            province: data.province,
            country: data.country,
            zip: data.zip
        };

        return await db.address.update({
            where: { profileId },
            data: updateData
        });
    }

    async delete(profileId) {
        return await db.address.delete({
            where: { profileId }
        });
    }
}

module.exports = new AddressRepository();

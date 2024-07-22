const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository');
const sessionRepository = require('../repositories/sessionRepository');
const { uploadImageToS3 } = require('../utils/awsUtils');
const { saveImageUrlToDatabase } = require('../repositories/prisma');
const db = require('../repositories/prisma');

const register = async (data) => {
    //Check if user exists
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await argon2.hash(data.password);

    const newUser = await db.$transaction(async (transaction) => {
        const user = await transaction.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            }
        });
        await transaction.profile.create({
            data: {
                userId: user.id,
                username: data.username,
                email: data.email
            }
        });

        return user;
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getHours() + 1);

    await sessionRepository.create({
        userId: newUser.id,
        expiresAt,
    });

    return newUser;
}

// Log in user

const login = async (data) => {
    const { email, password } = data;

    const user = await userRepository.findByEmail(email);

    if (!user) {
        console.error('User or password not found');
        return null;
    }

    try {
        if (await argon2.verify(user.password, password)) {
            return user;
        } else {
            console.error('Password verification failed');
            return null;
        }
    } catch (error) {
        console.error('Argon2 verification error:', error);
        return null;
    }
};

const uploadProfilePicture = async (file, userId) => {
    try {
        const result = await uploadImageToS3(file);
        const imageUrl = result.Location; // URL of the uploaded image

        // Save imageUrl to your database associated with the user
        await saveImageUrlToDatabase(userId, imageUrl);

        return imageUrl;
    } catch (error) {
        throw new Error('Failed to upload image');
    }
};
module.exports = {
    register,
    login,
    uploadProfilePicture
}
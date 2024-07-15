const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository');
const sessionRepository = require('../repositories/sessionRepository');

const register = async (data, id) => {
     //Check if user exists
     const existingUser = await userRepository.findUserByEmail(data.email);
     
     if (existingUser) {
          throw new Error('User already exists');
     }
     
     const hashedPassword = await argon2.hash(data.password);

     const user = await userRepository.createUser({
          username: data.username,
          email: data.email,
          password: hashedPassword
     });


     const expiresAt = new Date();
     expiresAt.setDate(expiresAt.getHours() + 1);

    await sessionRepository.createSession({
            userId: user.id,
            expiresAt,
      });

     return user;
}

// Log in user

const login = async (data) => {
     const { email, password } = data;
 
     const user = await userRepository.findUserByEmail(email);
 
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
module.exports = {
     register,
     login
}
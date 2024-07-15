// middlewares/roleCheck.js
const roleCheck = (roles) => {
     return (req, res, next) => {
         const user = req.user; // assuming user is attached to req after authentication
 
         if (!user) {
             return res.status(401).json({ message: 'Unauthorized' });
         }
 
         if (!roles.includes(user.role)) {
             return res.status(403).json({ message: 'Forbidden' });
         }
 
         next();
     };
 };
 
 module.exports = roleCheck;
 
// middlewares/roleCheck.js
const roleCheck = (roles) => {
    return (req, res, next) => {


        const user = req.user; // assuming user is attached to req after authentication

        if (!user) {
            console.log('User not found');
            return res.status(401).render('pages/unauthorized', { title: 'Unauthorized' });
        }

        if (!roles.includes(user.role)) {
            console.log('User role not allowed:', user.role);
            return res.status(403).send('Forbidden');
        }

        next();
    };
};

module.exports = roleCheck;

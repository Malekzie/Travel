// routes/profileRouter.js
const express = require('express');
const router = express.Router();
const roleCheck = require('../middleware/roleCheck');

const adminRouter = require('./userRouters/adminRouter');
const customerRouter = require('./userRouters/customerRouter');
const vendorRouter = require('./userRouters/vendorRouter');

// Example role constants (adjust according to your actual roles)
const Roles = {
    ADMIN: 'ADMIN',
    CUSTOMER: 'CUSTOMER',
    VENDOR: 'VENDOR'
};

// General Profile Route to redirect based on role
router.get('/', (req, res) => {
    const userRole = req.user.role;

    if (userRole === Roles.ADMIN) {
        return res.redirect('/profile/admin');
    } else if (userRole === Roles.CUSTOMER) {
        return res.redirect('/profile/customer');
    } else if (userRole === Roles.VENDOR) {
        return res.redirect('/profile/vendor');
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

router.use('/admin', roleCheck([Roles.ADMIN]), adminRouter);
router.use('/customer', roleCheck([Roles.CUSTOMER]), customerRouter);
router.use('/vendor', roleCheck([Roles.VENDOR]), vendorRouter);

module.exports = router;

// routes/customerRouter.js
const express = require('express');
const router = express.Router();
const profileController = require('../../controller/profileController');

router.use((req, res, next) => {
    // Example profile data, replace with actual data fetching logic
    res.locals.profile = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'Indromatov',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        dateOfBirth: '1990-01-01',
        nationality: 'American',
        gender: 'Male',
        address: [
            {
                address: '123 Main St',
                city: 'Anytown',
                province: 'Anystate',
                country: 'USA',
                zip: '12345'
            }
        ]
    };
    next();
});
// Example Customer Route
router.get('/', profileController.getProfile, (req, res) => {
    res.render('pages/Areas/Customer/dashboard', { 
        title: 'Customer Dashboard', 
        layout: 'layouts/customer',
    });
});


module.exports = router;

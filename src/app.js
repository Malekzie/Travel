const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const authenticateJWT = require('./middleware/authenticateJWT');
const attachUser = require('./middleware/attachUser');
const rateLimiter = require('./middleware/rateLimiter');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(authenticateJWT);
app.use(attachUser);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);

// Static Files
app.use('/assets', express.static(path.join(__dirname, '../public/assets'),{
     extensions: ["png", "jpg", "jpeg", "svg", "gif", "css"]
}));

//Routes
app.get('/', (req, res) => {
     res.render('pages/index', {title: 'Home'});
});

// Routers
const authRouter = require('./routes/authRouter');
app.use('/auth', rateLimiter, authRouter);

const profileRouter = require('./routes/profileRouter');
app.use('/profile', authenticateJWT, profileRouter);

const packagesRouter = require('./routes/packagesRouter');
app.use('/packages', packagesRouter);

app.get('*', (req, res) => {
     res.render('pages/404', {title: 'Page Not Found', layout: false});
});

module.exports = app;
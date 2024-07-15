const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);

// Static Files
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));


//Routes
app.get('/', (req, res) => {
     res.render('pages/index', {title: 'Home'});
});

module.exports = app;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define Paths for express config 
const publicDir = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(path.join(publicDir)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chris'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Betty'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'What have you done?...',
        title: 'Help Page',
        name: 'Chris Dev'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, weather) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: weather,
                address: req.query.address,
                location
            });
        });
    });
});

app.get('/stuff', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        guitars: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help section not available'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server Started on port 3000');
});
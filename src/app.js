const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const SundayWeather = require('../models/data');
const request = require('request');
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page'
    })
})

app.post('/', (req, res) => {
    const data = new SundayWeather({
        location: 'Boston',
        weather: 'Sunny'
    });
    data.save().then((result) => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})
app.get('/update', (req, res) => {
    // const url = 'http://api.weatherstack.com/current?access_key=933989b3c3a0b1fb30c5dcac0427eb78&query=New York';
    const url = 'http://api.weatherstack.com/current?access_key=933989b3c3a0b1fb30c5dcac0427eb78&query=New York';
    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            const location = response.body.location.name;
            const temp = response.body.current.temperature;
            res.render('update', {
                title: 'Update Weather Page',
                location: location,
                temp: temp
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page'
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
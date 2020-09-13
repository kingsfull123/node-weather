const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongodb-data-sunday-weather', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const SundayWeather = mongoose.model('SundayWeather', {
    location: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    }
})

module.exports = SundayWeather;

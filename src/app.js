const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
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

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
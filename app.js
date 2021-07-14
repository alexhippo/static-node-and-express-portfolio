const express = require('express');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const aboutRoute = require('./routes/about');

app.use(mainRoutes);
app.use('/about', aboutRoute);

app.listen(3000, () => {
    console.log('The application is running on localhost: 3000!')
});
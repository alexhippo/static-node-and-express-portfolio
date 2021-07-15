const express = require('express');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const aboutRoute = require('./routes/about');
const projectRoutes = require('./routes/projects');

app.use('/static', express.static('public'));

app.use(mainRoutes);
app.use('/about', aboutRoute);
app.use('/projects', projectRoutes);

// Create and throw 500 error on route
app.use('/error', (req, res, next) => {
    const err = new Error();
    err.status = 500;
    throw err;
});

app.use((req, res, next) => {
    const err = new Error(`Sorry, we couldn't find that page.`);
    console.log(err.message);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;

    if (err.status === 404) {
        res.status(404);
        res.render('error', err);
        console.log(err.message);
    } else {
        err.message = err.message || "Sorry, something went wrong. Please try again later.";
        res.status(err.status || 500).render('error', err);
        console.log(err.message);
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost: 3000!')
});
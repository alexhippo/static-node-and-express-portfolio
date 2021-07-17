const express = require('express');
const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const mainRoute = require('./routes');
const aboutRoute = require('./routes/about');
const projectRoutes = require('./routes/projects');

app.use(mainRoute);
app.use('/about', aboutRoute);
app.use('/projects', projectRoutes);

// 404 Error Handler
app.use((req, res, next) => {
    const err = new Error(`Sorry, we couldn't find that page.`);
    err.status = 404;
    console.log(`Error Status ${err.status}: ${err.message}`);
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    res.locals.error = err;

    if (err.status === 404) {
        res.status(404).render('page-not-found', err);
    } else {
        err.message = err.message || "Sorry, something went wrong. Please try again later.";
        err.status = err.status || 500;
        console.log(`Error Status ${err.status}: ${err.message}`);
        res.status(err.status || 500).render('error', err);
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost: 3000!')
});
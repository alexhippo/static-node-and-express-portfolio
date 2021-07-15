const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');


router.get('/', (req, res) => {
    const randomProjectNumber = Math.floor(Math.random() * (projects.length - 1));
    res.redirect(`/projects/${randomProjectNumber}`);
});

// Create and throw 500 error on project
router.get('/error', (req, res, next) => {
    const err = new Error();
    err.message = `Sorry, something went wrong loading this project. Please try again later.`
    err.status = 500;
    throw err;
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (projects[id]) {
        res.render('project', projects[id]);
    } else {
        const err = new Error(`Sorry, we couldn't find that project.`);
        err.status = 404;
        throw err;
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/hello/world', csrfProtection, function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;

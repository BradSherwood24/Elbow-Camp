const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })
const apiRouter = require('./api');
const listingRouter = require('./listings')
const reviewRouter = require('./reviews')
const imageRouter = require('./image')
const bookingRouter = require('./bookings')

router.use('/api', apiRouter);
router.use('/listing', listingRouter)
router.use('/review', reviewRouter)
router.use('/image', imageRouter)
router.use('/booking', bookingRouter)

router.get('/hello/world', csrfProtection, function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', csrfProtection, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, csrfProtection, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', csrfProtection, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}

module.exports = router;

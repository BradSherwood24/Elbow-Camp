const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Booking } = require('../../db/models');

router.get('/:id', asyncHandler(async (res, res) => {
    const id = req.params.id
    const bookings = await Booking.findAll({where: {
        spotId: id
    }})
    return res.json({
        bookings,
    });
}))


module.exports = router;

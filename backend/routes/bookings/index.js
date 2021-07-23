const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Booking } = require('../../db/models');

router.get('/all/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const bookings = await Booking.findAll({where: {
        spotId: id
    }})
    return res.json({
        bookings,
    });
}))

router.post('/', asyncHandler(async (req, res) => {
    const { spotId, userId, startDate, endDate} = req.body
    const booking = await Booking.create({ spotId, userId, startDate, endDate})
    return res.json({
        booking,
    });
}))

router.patch('/:id', asyncHandler(async (req, res) => {
    const Id = req.params.id
    const { spotId, userId, startDate, endDate} = req.body
    const booking = await Booking.create({ spotId, userId, startDate, endDate})
    const oldBooking = await Booking.findByPk(Id)
    oldBooking.destroy()
    return res.json({
        booking,
    });
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const oldbooking = await Booking.findByPk(id)
    oldbooking.destroy()
    return res.json({
        Destroy: true,
    });
}))


router.get('/', asyncHandler(async (req, res) => {
    return res.json({
        hello: 'hello',
    });
}))

module.exports = router;

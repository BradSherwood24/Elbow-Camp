const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Review, Booking } = require('../../db/models');

router.post('/create', asyncHandler(async (req, res) => {
    console.log('in create listing')
    const { title, userId, typeId, address, city, state, country, price } = req.body;
    const listing = await Listing.create({ title, userId, typeId, address, city, state, country, price });
    return res.json({
        listing
    });
}));

router.patch('/patch/:id', asyncHandler(async (req, res) => {
    const { title, userId, type, address, city, state, country, price } = req.body;
    const newListing = await Listing.create({ title, userId, typeId: 1, address, city, state, country, price });
    const id = req.params.id
    const listing = await Listing.findByPk(id)
    listing.destroy()
}))

router.delete('/delete/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const listing = await Listing.findByPk(id)
    listing.destroy()
    return res.json({
        destroy: true
    })
}))

router.get('/ten', asyncHandler(async (req, res) => {
    const listing = await Listing.findAll({
        orderBy: 'createdAt',
        limit: 10,
        include: [
            { model: Image },
            { model: Review },
            { model: Booking }
        ]
    })
    return res.json({
        listing
    })
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const listing = await Listing.findByPk(id, {
        include: [
            { model: Image },
            { model: Booking },
            {
                model: Review,
                include: User
            },
        ]
    })
    return res.json({
        listing
    })
}))

router.get('/user/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const listing = await Listing.findAll({
        where: {
            userId: id
        },
        include: [
            { model: Image },
            { model: Review },
            { model: Booking }
        ]
    })
    return res.json({
        listing
    })
}))

module.exports = router;

const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type } = require('../../db/models');

router.post('/create', asyncHandler(async (req, res) => {
    console.log('in create listing')
    const { title, userId, type, address, city, state, country, price } = req.body;
    // const typeId = await Type.findOne({ where: { type } })
    // typeId = typeId.id
    const newListing = await Listing.create({ title, userId, typeId: 1, address, city, state, country, price });

    // setTokenCookie(res, listing)
    return res.json({
        listing: newListing,
    });
}));

router.get('/', asyncHandler(async (req, res) => {
    const listings = Listing.findAll()

    return res.json({
        listings,
    });
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const listing = await Listing.findByPk(id)
    console.log(listing)
    return res.json({
        listing
    })
}))

module.exports = router;

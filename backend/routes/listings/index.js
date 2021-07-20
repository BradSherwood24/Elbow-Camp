const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User, Listing, Image, Type } = require('../../db/models');

router.post('/create', asyncHandler(async (req, res) => {
    console.log('in create listing')
    const { title, userId, type, address, city, state, country, price } = req.body;
    const typeId = await Type.findOne({ where: { type } })
    typeId = typeId.id
    const listing = await Listing.create({ title, userId, typeId, address, city, state, country, price });

    return res.json({
        listing,
    });
}));

router.get('/', asyncHandler(async (req, res) => {
    const listings = Listing.findAll()

    return res.json({
        listings,
    });
}));

module.exports = router;

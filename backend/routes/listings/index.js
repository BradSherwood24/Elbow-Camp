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
    await Listing.create({ title, userId, typeId: 1, address, city, state, country, price });

    // setTokenCookie(res, listing)
    return res.json({
        listing: 'success',
    });
}));

router.get('/', asyncHandler(async (req, res) => {
    const listings = Listing.findAll()

    return res.json({
        listings,
    });
}));

router.get('/types', asyncHandler(async (req, res) => {
    console.log(await Listing.findAll())
    const types = await Type.findAll()
    return res.json({ types })
}))

module.exports = router;

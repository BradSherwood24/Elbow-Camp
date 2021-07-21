const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Review } = require('../../db/models');


router.post('/create/:id', asyncHandler(async (req, res) => {
    const spotId = req.params.id
    const { imgUrl } = req.body;
    const image = await Listing.create({ spotId, imgUrl });
    return res.json({
        image
    });
}));

module.exports = router;

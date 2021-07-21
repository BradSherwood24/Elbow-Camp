const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Review } = require('../../db/models');

router.get('/', (req, res) => {
    return res.json({
        hello: 'hello'
    });
})

router.post('/create/:id', asyncHandler(async (req, res) => {
    const spotId = req.params.id
    const { imgSrc } = req.body;
    const image = await Image.create({ spotId, imgSrc });
    return res.json({
        image
    });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const imgId = req.params.id
    const image = await Image.findByPk(imgId)
    image.destroy()
    return res.json({
        destroy: true
    });
}))

module.exports = router;

const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Listing, Image, Type, Review } = require('../../db/models');


router.post('/create', asyncHandler(async (req, res) => {
    const { userId, spotId, comment, rating } = req.body;
    const review = await Review.create({ userId, spotId, comment, rating });
    return res.json({
        review
    });
}));

router.patch('/update/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const { userId, spotId, updateComment, updateRating } = req.body;
    console.log(userId, spotId, updateComment, updateRating)
    const review = await Review.create({ userId, spotId, comment: updateComment, rating: updateRating });
    const newReview = await Review.findByPk(id)
    newReview.destroy()
    return res.json({
        review
    });
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const newReview = await Review.findByPk(id)
    newReview.destroy()
    return res.json({
        isDestroyed: true
    });
}))

module.exports = router;

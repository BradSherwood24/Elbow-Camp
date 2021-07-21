import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";
import { csrfFetch } from '../../store/csrf';

function SingleListing() {
    let numberOfImages
    const Id = useParams().id
    const userId = useSelector(state => state.session.user.id)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)
    const [image, setImage] = useState('')
    const [imgNum, setImgNum] = useState(0)
    const [updateComment, setUpdateComment] = useState('')
    const [updateRating, setUpdateRating] = useState(5)

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])

    const listing = useSelector(state => state.listing)
    let listingArr
    if (listing.listing) {
        listingArr = Object.values(listing)
        numberOfImages = listing.listing.Images.length - 1
    } else {
        listingArr = []
    }

    const handleSubmit = () => {
    }

    const addReview = async () => {
        if (comment.length === 0) return
        const spotId = Id
        const res = await csrfFetch(`/review/create`, {
            method: 'POST',
            body: JSON.stringify({ userId, spotId, comment, rating })
        })
    }

    const updateReview = async () => {

    }

    const addImage = async (e) => {
        const imgSrc = image
        const res = await csrfFetch(`/image/create/${Id}`, {
            method: 'POST',
            body: JSON.stringify({ imgSrc })
        })
        const json = await res.json()
    }

    const deleteImage = async (imgId) => {
        const res = await csrfFetch(`/image/${imgId}`, {
            method: 'DELETE'
        })
        const json = await res.json
        numberOfImages--
        window.location.reload()
    }

    const prevImg = () => {
        console.log(numberOfImages, imgNum)
        if (imgNum >= 0) {
            setImgNum(imgNum - 1)
        }
    }

    const nextImg = () => {
        if (imgNum < numberOfImages) {
            console.log(numberOfImages, imgNum)
            setImgNum(imgNum + 1)
        }
    }


    return (
        <div>
            {!listingArr.length && <span>loading</span>}
            {listingArr.length && <span>
                <h1>{listing.listing.title}</h1>
                {listing.listing.Images.length &&
                    <div>
                        <img src={listing.listing.Images[imgNum].imgSrc}></img>
                        <button onClick={(e) => prevImg()}>{'<'}</button>
                        <button onClick={(e) => nextImg()}>{'>'}</button>
                        {userId === listing.listing.userId &&
                            <button onClick={(e) => deleteImage(listing.listing.Images[imgNum].id)}>{'delete image'}</button>}
                    </div>}
                {userId === listing.listing.userId && <div>
                    <form
                        onSubmit={(e) => { addImage(e) }}
                    >
                        <label>add images</label>
                        <input
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        ></input>
                        <button type='submit'>submit</button>
                    </form>
                </div>
                }
                <div>
                    <h3>Address</h3>
                    <p>{listing.listing.address}</p>
                    <p>{listing.listing.city}</p>
                    <p>{listing.listing.state}</p>
                    <p>{listing.listing.country}</p>
                </div>
                <div>
                    <h3>price</h3>
                    <p>{listing.listing.price}</p>
                </div>
                <button>
                    Book it
                </button>
                <form onSubmit={(e) => addReview()}>
                    <h3>Add Review for {listing.listing.title}</h3>
                    <label>Comment</label>
                    <input
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></input>
                    <label>Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button type='submit'>Add Review</button>
                </form>
                {listing.listing.Reviews.length &&
                    <table>
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th>Comment</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listing.listing.Reviews.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.User.username}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.rating}</td>
                                    {review.userId === userId &&
                                        <td>
                                            <form onSubmit={(e) => updateReview()}>
                                                <label>Update Comment</label>
                                                <input
                                                    type='text'
                                                    value={updateComment}
                                                    onChange={(e) => setUpdateComment(e.target.value)}
                                                    required
                                                ></input>
                                                <label>Rating</label>
                                                <select
                                                    value={updateRating}
                                                    onChange={(e) => setUpdateRating(e.target.value)}
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </select>
                                                <button type='submit'>Update Review</button>
                                            </form>
                                        </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </span>}
        </div>
    )

}

export default SingleListing;

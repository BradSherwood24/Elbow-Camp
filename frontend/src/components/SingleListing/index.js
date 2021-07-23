import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";
import * as reviewActions from "../../store/review"
import { csrfFetch } from '../../store/csrf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SingleListing.css'


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
    const [bookIt, setBookIt] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [updateYourReview, setUpdateYourReview] = useState(false)

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

    const createBooking = async (e) => {
        const spotId = Id
        const res = await csrfFetch(`/booking`, {
            method: 'POST',
            body: JSON.stringify({ userId, spotId, startDate, endDate })
        })
    }

    const updateBooking = async (id) => {
        const spotId = Id
        const res = await csrfFetch(`/booking/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ userId, spotId, startDate, endDate })
        })
    }

    const deleteBooking = async (id) => {
        console.log(id)
        const res = await csrfFetch(`/booking/${id}`, {
            method: 'DELETE',
        })
    }

    // const addReview = async () => {
    //     if (comment.length === 0) return
    //     const spotId = Id
    //     const res = await csrfFetch(`/review/create`, {
    //         method: 'POST',
    //         body: JSON.stringify({ userId, spotId, comment, rating })
    //     })
    // }

    const addReview = async (e) => {
        e.preventDefault();
        if (comment.length === 0) return
        const spotId = Id
        const Review = { userId, spotId, comment, rating, Id }
        dispatch(reviewActions.addReview({Review}))
        setComment('')
    }

    const updateReview = async (e, id) => {
        console.log(updateComment)
        const spotId = Id
        const res = await csrfFetch(`/review/update/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ userId, spotId, updateComment, updateRating })
        })
    }

    const deleteReview = async (id) => {
        const res = await csrfFetch(`/review/${id}`, {
            method: 'DELETE',
        })
        window.location.reload()
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
        if (imgNum > 0) {
            setImgNum(imgNum - 1)
        } else {
            setImgNum(numberOfImages)
        }
    }

    const nextImg = () => {
        if (imgNum < numberOfImages) {
            console.log(numberOfImages, imgNum)
            setImgNum(imgNum + 1)
        } else {
            setImgNum(0)
        }
    }


    return (
        <div className='Containing'>
            <div className='returnDiv'>
                {!listingArr.length && <span>loading</span>}
                {listingArr.length && <span>
                    <h1 className='title'>{listing.listing.title}</h1>
                    {listing.listing.Images.length &&
                        <div>
                            <img className='Image' src={listing.listing.Images[imgNum].imgSrc}></img>
                            <button onClick={(e) => prevImg()}>{'<'}</button>
                            <button onClick={(e) => nextImg()}>{'>'}</button>
                            {userId === listing.listing.userId &&
                                <button onClick={(e) => deleteImage(listing.listing.Images[imgNum].id)}>{'delete image'}</button>}
                        </div>}
                    <div>
                        {listing.listing.Images.map((image) => (
                            <img className='smallImage' src={image.imgSrc}></img>
                        ))}
                    </div>
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
                        <h3 className='address'>Address</h3>
                        <p>{listing.listing.address}, {listing.listing.city}, {listing.listing.state}, {listing.listing.country}</p>
                        {/* <p>{listing.listing.address}</p>
                        <p>{listing.listing.city}</p>
                        <p>{listing.listing.state}</p>
                        <p>{listing.listing.country}</p> */}
                    </div>
                    <div>
                        <h3 className='priceLabel'>price per night:</h3>
                        <p className='price'>{listing.listing.price}</p>
                    </div>
                    {!listing.listing.Bookings.find((booking) => booking.userId === userId) &&
                        <div>
                            {bookIt &&
                                <div>
                                    <form onSubmit={(e) => createBooking(e)}>
                                        <label>Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        >
                                        </DatePicker>
                                        <label>End Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                        >
                                        </DatePicker>
                                        <button type='submit'>Book it</button>
                                    </form>
                                    <button onClick={(e) => setBookIt(false)}>
                                        Don't Book it
                                    </button>
                                </div>
                            }
                            {!bookIt &&
                                <div>
                                    <button onClick={(e) => setBookIt(true)}>
                                        Book it
                                    </button>
                                </div>
                            }
                        </div>
                    }
                    {listing.listing.Bookings.find((booking) => booking.userId === userId) &&
                        <div>
                            <h2>Your Booking:</h2>
                            <h3>Start Date</h3>
                            <h4>{new Date(listing.listing.Bookings.find((booking) => booking.userId === userId).startDate).toDateString()}</h4>
                            <h3>End Date</h3>
                            <h4>{new Date(listing.listing.Bookings.find((booking) => booking.userId === userId).endDate).toDateString()}</h4>
                            <form
                                onSubmit={(e) => updateBooking(listing.listing.Bookings.find((booking) => booking.userId === userId).id)}
                            >
                                <label>Start Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                >
                                </DatePicker>
                                <label>End Date</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                >
                                </DatePicker>

                                <button type='submit'>Update Booking</button>
                            </form>
                            <button onClick={(e) => deleteBooking(listing.listing.Bookings.find((booking) => booking.userId === userId).id)}>Delete Booking</button>
                        </div>
                    }
                    {!listing.listing.Reviews.find((review) => review.userId === userId) &&
                        <div>
                            <form onSubmit={(e) => addReview(e)}>
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
                        </div>
                    }
                    {listing.listing.Reviews.map((review) => (
                        <div>
                            {review.userId === userId &&
                                <div>
                                    {updateYourReview &&
                                        <div>
                                            <form onSubmit={(e) => updateReview(e, review.id)}>
                                                <h3>Your Review: {review.comment}, rating: {review.rating}</h3>
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
                                                <button onClick={(e) => deleteReview(review.id)}>Delete Review</button>
                                            </form>
                                                <button onClick={(e) => setUpdateYourReview(false)}>Don't Edit Review</button>
                                        </div>
                                    }
                                    {!updateYourReview &&
                                        <div>
                                            <button onClick={(e) => setUpdateYourReview(true)}>
                                                Edit Review?
                                            </button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    ))}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </span>}
            </div>
        </div>
    )

}

export default SingleListing;

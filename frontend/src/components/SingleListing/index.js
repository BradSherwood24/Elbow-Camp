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
    const [addAReview, setAddAReview] = useState(false)
    const [updateYourBooking, setUpdateYourBooking] = useState(false)
    const [addImg, setAddImg] = useState(false)

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
        e.preventDefault()
        const spotId = Id
        const booking = { userId, spotId, startDate, endDate }
        dispatch(listingActions.createBooking(booking))
        setBookIt(false)
        setUpdateYourBooking(false)
    }

    const updateBooking = async (e, id) => {
        e.preventDefault()
        const spotId = Id
        const newBooking = { userId, spotId, startDate, endDate, id }
        dispatch(listingActions.updateBooking(newBooking))
        setBookIt(false)
    }

    const deleteBooking = async (e, id) => {
        e.preventDefault()
        console.log(id)
        dispatch(listingActions.deleteBooking({ id, Id }))
        setBookIt(false)
    }

    const addReview = async (e) => {
        e.preventDefault();
        const spotId = Id
        const Review = { userId, spotId, comment, rating, Id }
        dispatch(listingActions.addReview(Review))
        setComment('')
        setRating('')
        setAddAReview(false)
    }

    const updateReview = async (e, id) => {
        e.preventDefault()
        const spotId = Id
        const Review = { userId, spotId, updateComment, updateRating, id }
        dispatch(listingActions.updateReview(Review))
        setAddAReview(false)
        setUpdateYourReview(false)
    }

    const deleteYourReview = async (e, id) => {
        e.preventDefault();
        console.log(id)
        dispatch(listingActions.deleteReview({ id, Id }))
        setComment('')
        setRating('')
        setAddAReview(false)
    }

    const addImage = async (e) => {
        e.preventDefault()
        const imgSrc = image
        dispatch(listingActions.addImage({ imgSrc, Id }))
        setImage('')
    }


    const deleteImage = async (e, imgId) => {
        e.preventDefault()
        if(numberOfImages !== 0) {
            dispatch(listingActions.deleteImage({ imgId, Id }))
            if(imgNum === 0) {
                setImgNum(0)
            }else {
                setImgNum(imgNum -1)
            }
            numberOfImages--
        }
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
                                <button onClick={(e) => deleteImage(e, listing.listing.Images[imgNum].id)}>{'delete image'}</button>}
                        </div>}
                    <div>
                        {listing.listing.Images.map((image) => (
                            <img key={image.id} className='smallImage' src={image.imgSrc}></img>
                        ))}
                    </div>
                    {userId === listing.listing.userId && <div>
                        {!addImg &&
                            <div>
                                <button onClick={(e) => setAddImg(true)}>Add Images</button>
                            </div>
                        }
                        {addImg &&
                            <div>
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
                                <div>
                                    <button onClick={(e) => setAddImg(false)}>Done Adding Images</button>
                                </div>
                            </div>

                        }
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
                            {!updateYourBooking &&
                                <button onClick={(e) => setUpdateYourBooking(true)}>Update Booking?</button>
                            }
                            {updateYourBooking &&
                                <div>
                                    <form
                                        onSubmit={(e) => updateBooking(e, listing.listing.Bookings.find((booking) => booking.userId === userId).id)}
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

                                        <button onClick={(e) => deleteBooking(e, listing.listing.Bookings.find((booking) => booking.userId === userId).id)}>Delete Booking</button>
                                        <button type='submit'>Update Booking</button>
                                    </form>
                                    <button onClick={(e) => setUpdateYourBooking(false)}>Done Update Booking?</button>
                                </div>
                            }
                        </div>
                    }
                    {addAReview &&
                        <div>
                            {!listing.listing.Reviews.find((review) => review.userId === userId) &&
                                <button onClick={(e) => setAddAReview(false)}>
                                    Don't Add A Review
                                </button>
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
                        </div>
                    }
                    {!addAReview &&
                        <div>
                            {!listing.listing.Reviews.find((review) => review.userId === userId) &&
                                <button onClick={(e) => setAddAReview(true)}>
                                    Add A Review
                                </button>
                            }
                        </div>
                    }
                    {listing.listing.Reviews.map((review) => (
                        <div key={review.id}>
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
                                                <button onClick={(e) => deleteYourReview(e, review.id)}>Delete Review</button>
                                                <button type='submit'>Update Review</button>
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
                    <h2>Reviews:</h2>
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
                                    <tr key={review.id} className='row'>
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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";

function SingleListing() {
    const Id = useParams().id
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])

    const listing = useSelector(state => state.listing)
    let listingArr
    if (listing.listing) {
        listingArr = Object.values(listing)
    } else {
        listingArr = []
    }

    const handleSubmit = () => {

    }


    return (
        <div>
            {!listingArr.length && <span>loading</span>}
            {listingArr.length && <span>
                <h1>{listing.listing.title}</h1>
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
                <form onSubmit={handleSubmit}>
                    <h3>Review for {listing.listing.title}</h3>
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
                        <option value={1}>2</option>
                        <option value={1}>3</option>
                        <option value={1}>4</option>
                        <option value={1}>5</option>
                    </select>
                    <button type='submit'>Add Review</button>
                </form>
            </span>}
        </div>
    )

}

export default SingleListing;

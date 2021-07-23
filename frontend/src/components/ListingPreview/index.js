import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";
import { csrfFetch } from '../../store/csrf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './OneListing.css'


function ListingPreview({ listing }) {
    const numberOfImages = listing.Images.length - 1
    const [imgNum, setImgNum] = useState(0)
    const userId = useSelector(state => state.session.user.id)
    const dispatch = useDispatch()
    let listings = useSelector(state => state.listing)



    const prevImg = () => {
        if (imgNum > 0) {
            setImgNum(imgNum - 1)
        } else {
            setImgNum(numberOfImages)
        }
    }

    const deleteListing = (id, e) => {
        e.preventDefault()
        const images = listing.Images
        const bookings = listing.Bookings
        const reviews = listing.Reviews
        dispatch(listingActions.deleteListing({id, images, bookings, reviews, userId}))
        // window.location = '/profile'
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
        <div className='returnDiv'>
            <h1 className='title'>{listing.title}</h1>
            {listing.Images.length &&
                <div>
                    <a href={`/listing/${listing.id}`}>
                        <img className='Image' src={listing.Images[imgNum].imgSrc}></img>
                    </a>
                </div>}
            <div className='changeImg'>
                <button className='imgSelect' onClick={(e) => prevImg()}>{'<'}</button>
                <button className='imgSelect' onClick={(e) => nextImg()}>{'>'}</button>
            </div>
            <div>
                {listing.Images.map((image) => (
                    <img className='smallImage' src={image.imgSrc}></img>
                ))}
            </div>
            <div className='address'>
                <h3 className='addressLabel'>Address</h3>
                <p>{listing.address}, {listing.city}, {listing.state}, {listing.country}</p>
            </div>
            <div>
                <h3 className='priceLabel'>price per night:</h3>
                <p className='price'>${listing.price}</p>
            </div>
            <div className='toListingDiv'>
                <button className='toListing'>
                    <NavLink className='NavLink' to={`/listing/${listing.id}`}>go to listing</NavLink>
                </button>
                {!listings.isHome &&
                    <div>
                        <button
                            onClick={(e) => deleteListing(listing.id, e)}
                        >Delete</button>
                        <button>
                            <NavLink className='NavLink' to={`/edit/${listing.id}`}>edit</NavLink>
                        </button>
                    </div>
                }
            </div>
        </div>
    )

}

export default ListingPreview;

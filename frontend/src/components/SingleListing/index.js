import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";

function SingleListing() {
    const Id = useParams().id
    const [isComponent, setIsComponent] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])

    const listing = useSelector(state => state.listing)
    let listingArr
    if (listing && !listing.listings) {
        listingArr = Object.values(listing)
    } else {
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        listingArr = []
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
            </span>}
        </div>
    )

}

export default SingleListing;

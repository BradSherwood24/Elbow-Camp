import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import * as listingActions from "../../store/listing";


function HomePage() {
    const user = useSelector(state => state.session.user)
    if(!user) window.location = '/login'
    const userName = useSelector(state => state.session.user.username)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listingActions.fetchAllListings())
    }, [dispatch])

    let listingArrs
    let listings = useSelector(state => state.listing)
    if(listings.listings){
        listingArrs = Object.values(listings)
    }else {
        listingArrs = []
    }



    return (
        <div>
            <h1>hello {userName}</h1>
            {!listingArrs.length && <span>Loading</span>}
            {listingArrs.length && listings.listings.map((listing) =>
            <span>
                <h1>{listing.title}</h1>
                <div>
                    <h3>Address</h3>
                    <p>{listing.address}</p>
                    <p>{listing.city}</p>
                    <p>{listing.state}</p>
                    <p>{listing.country}</p>
                </div>
                <div>
                    <h3>price</h3>
                    <p>{listing.price}</p>
                </div>
                <button>
                    <NavLink to={`/listing/${listing.id}`}>go to listing</NavLink>
                </button>

            </span>)}
        </div>
    );
}

export default HomePage;

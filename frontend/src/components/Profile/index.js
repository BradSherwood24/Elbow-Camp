import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import * as listingActions from "../../store/listing";


// const fetchListings = async (id) => {
//     const res = await csrfFetch(`/listing/user/${id}`)
//     const json = await res.json
//     return json
// }

function Profile() {
    const userId = useSelector(state => state.session.user.id)
    const [isComponent, setIsComponent] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listingActions.fetchListings(userId))
    }, [dispatch])

    let listings = useSelector(state => state.listing)
    let listingArrs
    if (listings && !listings.listing) {
        listingArrs = Object.values(listings)
    } else {
        dispatch(listingActions.fetchListings(userId))
        listingArrs = []
    }


    return (
        <div>
            <h1>hello from Profile</h1>
            <NavLink to='/new-listing'>create a listing</NavLink>
            {!listingArrs.length && <span>You have no listings</span>}
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

export default Profile;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';


const fetchListings = async (id) => {
    const res = await csrfFetch(`/listing/user/${id}`)
    const json = await res.json
    return json
}

function HomePage() {
    const userId = useSelector(state => state.session.user.id)
    const [listings, setListings] = useState(fetchListings(userId))


    const listingArr = Object.values(listings)



    return (
        <div>
            <h1>hello from Profile</h1>
            <NavLink to='/new-listing'>create a listing</NavLink>
            {!listingArr.length && <span>You have no listings</span>}
            {listingArr.length && <span>
                <h1>{listings.title}</h1>
                <div>
                    <h3>Address</h3>
                    <p>{listings.address}</p>
                    <p>{listings.city}</p>
                    <p>{listings.state}</p>
                    <p>{listings.country}</p>
                </div>
                <div>
                    <h3>price</h3>
                    <p>{listings.price}</p>
                </div>
                </span>}
        </div>
    );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import OneListing from '../oneListing';
import CreateListing from '../CreateListingPage';
import './profile.css'
import * as listingActions from "../../store/listing";


function Profile() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [image, setImage] = useState('')
    const [create, setCreate] = useState(false)

    useEffect(() => {
        dispatch(listingActions.fetchListings(userId))
    }, [dispatch])

    let listings = useSelector(state => state.listing)
    let listingArrs
    if (!listings.isHome) {
        listingArrs = Object.values(listings)
    } else {
        listingArrs = []
    }

    const deleteListing = (id) => {
        dispatch(listingActions.deleteListing(id))
        window.location.reload()
    }



    return (
        <div >
            {!listingArrs.length && <span>You have no listings</span>}
            {!create &&
                <button onClick={(e) => setCreate(true)}>
                    Create a Listing
                    {/* <NavLink className='NavLink' to='/new-listing'>create a listing</NavLink> */}
                </button>
            }
            {create &&
                <div>
                    <button onClick={(e) => setCreate(false)}>
                        Don't Create Listing
                        {/* <NavLink className='NavLink' to='/new-listing'>Don't Create Listing</NavLink> */}
                    </button>
                    <CreateListing setCreate={setCreate} />
                </div>
            }

            <h1>Your Listings</h1>
            {listingArrs.length && listings.listings.map((listing) =>
                <div>
                    {listing.userId === userId &&
                        <div className='Containing'>
                            <OneListing listing={listing} />
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

export default Profile;

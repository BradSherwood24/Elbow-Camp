import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";

function EditListing() {
    const Id = useParams().id
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [title, setTitle] = useState('');
    const [typeId, setTypeId] = useState(1);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setlat] = useState('');
    const [long, setLong] = useState('');
    const [price, setPrice] = useState(100);

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])

    const listing = useSelector(state => state.listing)
    let listingArrs =[]
    if (listing.listing) {
        listingArrs = Object.values(listing)
    } else {
        listingArrs = []
    }
    // setTitle(listing.listing.title);
    // setTypeId(listing.listing.typeId);
    // setAddress(listing.listing.address);
    // setCity(listing.listing.city);
    // setState(listing.listing.state);
    // setCountry(listing.listing.country);
    // setlat(listing.listing.lat);
    // setLong(listing.listing.long);
    // setPrice(listing.listing.price);




    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(listingActions.createListing({ title, userId, typeId, address, city, state, country, price }))
        dispatch(listingActions.deleteListing(Id))
        window.location = '/profile'
    }

    return (
        <div>
            <h1>hello from edit listing</h1>
            {!listingArrs.length && <span>Loading</span>}
            {listingArrs.length &&
                <form onSubmit={handleSubmit}>
                    <label>Title of listing
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>Type of site
                        <select
                            value={typeId}
                            onChange={(e) => setTypeId(e.target.value)}>
                            <option value={1}>Camp Ground</option>
                            <option value={2}>Woods</option>
                            <option value={3}>Cabin</option>
                            <option value={4}>Tree house</option>
                            <option value={5}>Glamping</option>
                            <option value={6}>RV Park</option>
                        </select>
                    </label>
                    <label>Address
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <label>City
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label>State
                        <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                    <label>Country
                        <input
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label>Price per night
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.price)}
                            required
                        />
                    </label>
                    <button type='submit'>submit</button>
                </form>
            }
        </div>
    );
}

export default EditListing;

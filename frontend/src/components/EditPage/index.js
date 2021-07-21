import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";

function EditListing() {
    const listing = useSelector(state => state.listing)
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
    const [isLoaded, setIsLoaded] = useState(false)

    let Title
    let TypeId
    let Address
    let City
    let State
    let Country
    let Lat
    let Long
    let Price

    const fill = () => {
        setTitle(Title);
        setTypeId(typeId);
        setAddress(Address);
        setCity(City);
        setState(State);
        setCountry(Country);
        setlat(Lat);
        setLong(Long);
        setPrice(Price);
    }

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])

    useEffect(() => {
        fill()
    }, [listing])



    let listingArrs = []
    if (listing.listing) {
        listingArrs = Object.values(listing)
        Title = listing.listing.title
        TypeId = listing.listing.typeId
        Address = listing.listing.address
        City = listing.listing.city
        State = listing.listing.state
        Country = listing.listing.country
        Lat = listing.listing.lat
        Long = listing.listing.long
        Price = listing.listing.price
    } else {
        listingArrs = []
    }





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
                    <button type='submit'>Update</button>
                </form>
            }
        </div>
    );
}

export default EditListing;
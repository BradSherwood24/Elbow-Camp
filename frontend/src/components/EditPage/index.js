import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";

function EditListing({ listing }) {
    const Id = listing.id
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [title, setTitle] = useState(listing.title);
    const [typeId, setTypeId] = useState(listing.typeId);
    const [address, setAddress] = useState(listing.address);
    const [city, setCity] = useState(listing.city);
    const [state, setState] = useState(listing.state);
    const [country, setCountry] = useState(listing.country);
    const [lat, setlat] = useState('');
    const [long, setLong] = useState('');
    const [price, setPrice] = useState(listing.price);
    const [image, setImage] = useState(listing.Images[0].imgSrc)
    const [edit, setEdit] = useState(false)

    // let Title
    // let TypeId
    // let Address
    // let City
    // let State
    // let Country
    // let Lat
    // let Long
    // let Price

    // const fill = () => {
    //     setTitle(Title);
    //     setTypeId(typeId);
    //     setAddress(Address);
    //     setCity(City);
    //     setState(State);
    //     setCountry(Country);
    //     setlat(Lat);
    //     setLong(Long);
    //     setPrice(Price);
    // }

    useEffect(() => {
        dispatch(listingActions.fetchListing(Id))
    }, [dispatch])







    const handleSubmit = async (e) => {
        e.preventDefault()
        const images = listing.Images
        const bookings = listing.Bookings
        const reviews = listing.Reviews
        const imgSrc = image
        const newListing = {  title, userId, typeId, address, city, state, country, price, imgSrc }
        dispatch(listingActions.updateListing({ Id, images, bookings, reviews, newListing }))
        setEdit(false)

    }

    return (
        <div>
            {!edit &&
                <button onClick={(e) => setEdit(true)}>
                    Edit
                </button>
            }
            {edit &&
                <div>
                    <button onClick={(e) => setEdit(false)}>
                        Don't Edit
                    </button>
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
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </label>
                        <label>Cover Image
                            <input
                                type='text'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </label>
                        <button type='submit'>Update</button>
                    </form>

                </div>
            }

        </div>
    );
}

export default EditListing;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import Cookies from 'js-cookie';
import * as listingActions from "../../store/listing";


function CreateListing() {
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
    const [image, setImage] = useState('')
    const [create, setCreate] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const imgSrc = image
        dispatch(listingActions.createListing({ title, userId, typeId, address, city, state, country, price, imgSrc }))
        setCreate(false)
        setTitle('')
        setTypeId(1)
        setAddress('')
        setCity('')
        setState('')
        setCountry('')
        setPrice('')
        setImage('')
    }

    return (
        <div>
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
                    <form onSubmit={(e) => handleSubmit(e)}>
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
                        <button type='submit'>submit</button>
                    </form>
                </div>
            }

        </div>
    );
}

export default CreateListing;


// window.csrfFetch('/listing/create', {
//     method: 'POST',
//     body: JSON.stringify({ title:'asdf', userId: 2, type: 'Camp Ground', address: 'Demo-lition', city: 'asdf', state: 'asdf', country: 'asdf', price: 135 })
//   }).then(res => res.json()).then(data => console.log(data));

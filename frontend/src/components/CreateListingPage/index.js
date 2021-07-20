import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import Cookies from 'js-cookie';


function CreateListing() {

    const userId = useSelector(state => state.session.user.id)

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setlat] = useState('');
    const [long, setLong] = useState('');
    const [price, setPrice] = useState(100);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log('fetching')
        const token = Cookies.get('XSRF-TOKEN')
        const res = await csrfFetch('/listing/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'XSRF-Token': token
            },
            body: JSON.stringify({
                title,
                userId,
                type,
                address,
                city,
                state,
                country,
                lat,
                long,
                price
            })
        })
        const json = res.json()
        if (json.ok) Redirect(`/listing/${json.id}`) //make this redirect to new listing page to add images

    }

    return (
        <div>
            <h1>hello from make listing</h1>
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
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                        <option value='Camp Ground'>Camp Ground</option>
                        <option value='Woods'>Woods</option>
                        <option value='Cabin'>Cabin</option>
                        <option value='Tree house'>Tree house</option>
                        <option value='Glamping'>Glamping</option>
                        <option value='RV Park'>RV Park</option>
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

        </div>
    );
}

export default CreateListing;


// window.csrfFetch('/listing/create', {
//     method: 'POST',
//     body: JSON.stringify({ title:'asdf', userId: 2, type: 'Camp Ground', address: 'Demo-lition', city: 'asdf', state: 'asdf', country: 'asdf', price: 135 })
//   }).then(res => res.json()).then(data => console.log(data));

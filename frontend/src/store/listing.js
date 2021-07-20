import { csrfFetch } from "./csrf";
import Cookies from 'js-cookie';


const GET_LISTING = 'listing/getListing';
const ADD_LISTING = 'listing/addListing';
const GET_LISTINGS = 'listing/getListings';

export const getListing = (listing) => {
    return {
        type: GET_LISTING,
        payload: listing
    };
};

export const addListing = (NewListing) => ({
    type: ADD_LISTING,
    NewListing
});

export const getListings = (listings) => ({
    type: GET_LISTINGS,
    listings
})


export const fetchListing = (id) => async (dispatch) => {
    const res = await csrfFetch(`/listing/${id}`)
    const listing = await res.json()
    dispatch(getListing(listing))
    return listing
}

export const fetchListings = (id) => async (dispatch) => {
    const res = await csrfFetch(`/listing/user/${id}`)
    const listings = await res.json()
    dispatch(getListings(listings))
    return listings
}

export const createListing = (listing) => async (dispatch) => {
    try {
        const token = Cookies.get('XSRF-TOKEN')
        const { title, userId, typeId, address, city, state, country, price } = listing
        const res = await csrfFetch('/listing/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'XSRF-Token': token
            },
            body: JSON.stringify({
                title,
                userId,
                typeId,
                address,
                city,
                state,
                country,
                price
            })
        })
        const json = await res.json()
        dispatch(addListing(json))
        return json
    } catch (e) {
        console.log('error', e)
    }
}

const listingReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_LISTING:
            newState = Object.assign({}, state);
            newState.listing = action.payload.listing;
            return newState;
        case ADD_LISTING:
            newState = Object.assign({}, state);
            newState.listing = action.NewListing.listing;
            return newState;
        case GET_LISTINGS:
            newState = Object.assign({}, state);
            newState.listings = action.listings.listing;
            return newState;
        default:
            return state;
    }
};

export default listingReducer;

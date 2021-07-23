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

export const getListings = (listings, isHome) => ({
    type: GET_LISTINGS,
    listings,
    isHome
})

export const deleteOneBooking = (id) => async (dispatch) => {
    const res = await csrfFetch(`/booking/${id}`, {
        method: 'DELETE',
    })
}

export const deleteOneReview = (id) => async (dispatch) => {
    const res = await csrfFetch(`/review/${id}`, {
        method: 'DELETE',
    })
}

export const deleteOneImage = (id) => async (dispatch) => {
    const res = await csrfFetch(`/image/${id}`, {
        method: 'DELETE'
    })
}


export const fetchListing = (id) => async (dispatch) => {
    const res = await csrfFetch(`/listing/${id}`)
    const listing = await res.json()
    dispatch(getListing(listing))
    return listing
}

export const fetchListings = (id) => async (dispatch) => {
    const res = await csrfFetch(`/listing/user/${id}`)
    const listings = await res.json()
    dispatch(getListings(listings, false))
    return listings
}

export const fetchAllListings = () => async (dispatch) => {
    const res = await csrfFetch(`/listing/ten`)
    const listings = await res.json()
    dispatch(getListings(listings, true))
    return listings
}

export const deleteListing = ({id, reviews, bookings, images, userId}) => async (dispatch) => {
    reviews.forEach(review => {
        dispatch(deleteOneReview(review.id))
    });
    bookings.forEach(booking => {
        dispatch(deleteOneBooking(booking.id))
    });
    images.forEach(image => {
        dispatch(deleteOneImage(image.id))
    });
    const res = await csrfFetch(`/listing/delete/${id}`, {
        method: "DELETE"
    })
    const json = await res.json()
    const ListingRes = await csrfFetch(`/listing/ten`)
    const listings = await ListingRes.json()
    dispatch(getListings(listings, false))
    return json
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

export const addReview = (Review) => async (dispatch) => {
    const { userId, spotId, comment, rating } = Review
    const res = await csrfFetch(`/review/create`, {
        method: 'POST',
        body: JSON.stringify({ userId, spotId, comment, rating })
    })
    dispatch(fetchListing(spotId))
    return (spotId)
}

export const deleteReview = ({ id, Id }) => async (dispatch) => {
    const res = await csrfFetch(`/review/${id}`, {
        method: 'DELETE',
    })
    dispatch(fetchListing(Id))
    return (id)
}

export const updateReview = (Review) => async (dispatch) => {
    const { userId, spotId, updateComment, updateRating, id } = Review
    const res = await csrfFetch(`/review/update/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ userId, spotId, updateComment, updateRating })
    })
    dispatch(fetchListing(spotId))
    return (spotId)
}

export const createBooking = (booking) => async (dispatch) => {
    const { userId, spotId, startDate, endDate } = booking
    const res = await csrfFetch(`/booking`, {
        method: 'POST',
        body: JSON.stringify({ userId, spotId, startDate, endDate })
    })
    dispatch(fetchListing(spotId))
    return (spotId)
}

export const updateBooking = (newBooking) => async (dispatch) => {
    const { userId, spotId, startDate, endDate, id } = newBooking
    const res = await csrfFetch(`/booking/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ userId, spotId, startDate, endDate })
    })
    dispatch(fetchListing(spotId))
    return (spotId)
}

export const deleteBooking = ({id, Id}) => async (dispatch) => {
    const res = await csrfFetch(`/booking/${id}`, {
        method: 'DELETE',
    })
    dispatch(fetchListing(Id))
    return (Id)
}

export const addImage = ({ imgSrc, Id }) => async (dispatch) => {
    const res = await csrfFetch(`/image/create/${Id}`, {
        method: 'POST',
        body: JSON.stringify({ imgSrc })
    })
    dispatch(fetchListing(Id))
    return (Id)
}

export const deleteImage = ({imgId, Id}) => async (dispatch) => {
    const res = await csrfFetch(`/image/${imgId}`, {
        method: 'DELETE'
    })
    dispatch(fetchListing(Id))
    return (Id)
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
            newState.isHome = action.isHome;
            return newState;
        default:
            return state;
    }
};

export default listingReducer;

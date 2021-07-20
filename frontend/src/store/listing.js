import { csrfFetch } from "./csrf";


const GET_LISTING = 'listing/getListing';
const ADD_LISTING = 'listing/addListing';

export const getListing = (id) => {
    return {
        type: GET_LISTING,
        payload: id
    };
};

const addListing = (NewListing) => ({
    type: ADD_LISTING,
    NewListing
});


export const fetchListing = (id) => async (dispatch) => {
    const res = await csrfFetch(`/listing/${id}`)
    const listing = await res.json()
    console.log('listing')
    // return listing
    dispatch(getListing(listing))
}

const listingReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_LISTING:
            const listing = fetchListing(action.payload.id)
            console.log(listing)
            newState = Object.assign({}, state);
            newState.listing = action.payload.listing;
            return newState;
        case ADD_LISTING:
            return state
        default:
            return state;
    }
};

export default listingReducer;

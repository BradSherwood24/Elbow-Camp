import { csrfFetch } from "./csrf";
import Cookies from 'js-cookie';
import * as listingActions from "./listing";
import { fetchListing } from "./listing";

export const addReview = async ({Review}) => {
    const { userId, spotId, comment, rating} = Review
    const res = await csrfFetch(`/review/create`, {
        method: 'POST',
        body: JSON.stringify({ userId, spotId, comment, rating })
    })
    // if(res.ok) {
    //     listingActions.fetchListing(id)
    // }
}

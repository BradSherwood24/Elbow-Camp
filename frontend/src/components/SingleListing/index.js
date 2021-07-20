import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {getListing} from '../../store/listing'
import * as listingActions from "../../store/listing";

function SingleListing() {
    const Id = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListing({Id}))
    }, [dispatch])

    const listing = useSelector(state => state.listing)
    console.log(listing)
    return (
        <div>
            <h1>hello from single listing</h1>
            <h1>{listing.title}</h1>
        </div>
    );
}

export default SingleListing;

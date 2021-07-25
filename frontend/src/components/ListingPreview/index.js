import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listing'
import * as listingActions from "../../store/listing";
import { csrfFetch } from '../../store/csrf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ListingPreview.css'


function ListingPreview({ listing }) {
    const [imgNum, setImgNum] = useState(0)
    const userId = useSelector(state => state.session.user.id)


    return (
        <div className='preview'>
            <a href={`/listing/${listing.id}`}>
                <h1 className='previewTitle'>{listing.title}</h1>
                {listing.Images.length &&
                    <div>
                        <img className='previewImage' src={listing.Images[imgNum].imgSrc}></img>
                    </div>}
                <div>
                    <h3 className='previewPriceLabel'>price per night:</h3>
                    <p className='previewPrice'>${listing.price}</p>
                </div>
            </a>
        </div>
    )

}

export default ListingPreview;

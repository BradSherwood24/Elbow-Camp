import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import * as listingActions from "../../store/listing";
import './home.css'
import OneListing from '../oneListing';


function HomePage() {
    const user = useSelector(state => state.session.user)
    if (!user) window.location = '/login'
    const userName = useSelector(state => state.session.user.username)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listingActions.fetchAllListings())
    }, [dispatch])

    let listingArrs
    let listings = useSelector(state => state.listing)
    if (listings.listings) {
        listingArrs = Object.values(listings)
    } else {
        listingArrs = []
    }

    // const prevImg = () => {
    //     console.log(numberOfImages, imgNum)
    //     if (imgNum >= 0){
    //         setImgNum(imgNum - 1)
    //     }
    // }

    // const nextImg = () => {
    //     if (imgNum < numberOfImages){
    //         console.log(numberOfImages, imgNum)
    //         setImgNum(imgNum + 1)
    //     }
    // }



    return (
        <div className='backGround'>
            <h1>hello {userName}</h1>
            {!listingArrs.length && <span>Loading</span>}
            <div className='Containing'>
                {listingArrs.length && listings.listings.map((listing) =>
                    <OneListing listing={listing} />
                    // <span>
                    //     <h1>{listing.title}</h1>
                    //     {listing.Images.length &&
                    //     <div>
                    //         <img className='Image' src={listing.Images[0].imgSrc}></img>
                    //         {/* <button onClick={(e) => prevImg()}>{'<'}</button>
                    //         <button onClick={(e) => nextImg()}>{'>'}</button> */}
                    //     </div>}
                    //     <div>
                    //         <h3>Address</h3>
                    //         <p>{listing.address}</p>
                    //         <p>{listing.city}</p>
                    //         <p>{listing.state}</p>
                    //         <p>{listing.country}</p>
                    //     </div>
                    //     <div>
                    //         <h3>price</h3>
                    //         <p>{listing.price}</p>
                    //     </div>
                    //     <button>
                    //         <NavLink to={`/listing/${listing.id}`}>go to listing</NavLink>
                    //     </button>

                    // </span>)}
                )}
            </div>
        </div>
    );
}

export default HomePage;

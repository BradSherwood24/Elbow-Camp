import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function HomePage() {


    return (
        <div>
            <h1>hello from Profile</h1>
            <NavLink to='/new-listing'>create a listing</NavLink>
        </div>
    );
}

export default HomePage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="profile fa fa-login" to="/login"> Log In </NavLink>
        <NavLink className="profile" to="/signup"> Sign Up </NavLink>
      </>
    );
  }

  return (
    <div className='header'>
      <ul>
        <li>
          <NavLink className="profile fa fa-home" exact to="/"></NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

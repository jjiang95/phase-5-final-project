import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ user, onLogout }) {
    return (
        <div className='navbar'>
            <h1>{ user ? `Hello, ${user.username}` : `Welcome!`}</h1>
            <NavLink className='nav-link' exact to='/'>Home</NavLink>
            {user ? <NavLink className='nav-link' exact to={`/users/${user.username}`}>Profile</NavLink> : null}
            {user ? <NavLink className='nav-link' exact to='/' onClick={onLogout}>Logout</NavLink> : <NavLink className='nav-link' exact to='/login'>Login</NavLink>}
            {user ? null : <NavLink className='nav-link' exact to='/signup'>Signup</NavLink>}
            {user && user.admin ? <NavLink className='nav-link' exact to='/newprompt'>+Create Prompt</NavLink> : null}   
        </div>
    )
}

export default Nav
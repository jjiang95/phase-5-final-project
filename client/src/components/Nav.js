import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ user, onLogout }) {
    return (
        <div className='navbar'>
            <span>{ user ? `Hello, ${user.username}!` : `Welcome!`}</span>
            <NavLink className='nav-link' exact to='/'>Home</NavLink>
            {user ? <NavLink className='nav-link' exact to={`/users/${user.username}`}>Profile</NavLink> : null}
            {user ? <NavLink className='nav-link' exact to='/' onClick={onLogout}>Logout</NavLink> : <NavLink className='nav-link' exact to='/login'>Login</NavLink>}
            {user ? null : <NavLink className='nav-link' exact to='/signup'>Signup</NavLink>}
            <br/>
            {user && user.admin ? <button className='nav-link' exact to='/newprompt'>+Create Prompt</button> : null}   
        </div>
    )
}

export default Nav
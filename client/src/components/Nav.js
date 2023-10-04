import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

function Nav({ user, onLogout }) {

    const history = useHistory()
    return (
        <div className='navbar'>
            <p>{ user ? `Hello, ${user.username}!` : `Welcome!`}</p>
            <NavLink className='nav-link' exact to='/'>Home</NavLink>
            {user ? <NavLink className='nav-link' exact to={`/profile/${user.username}`}>Profile</NavLink> : null}
            {user ? <NavLink className='nav-link' exact to='/' onClick={onLogout}>Logout</NavLink> : <NavLink className='nav-link' exact to='/signin'>Login</NavLink>}
            {user ? null : <NavLink className='nav-link' exact to='/createaccount'>Signup</NavLink>}
            <br/>
            {user && user.admin ? <button onClick={() => history.push('/newprompt')}>Create Prompt 📝</button> : null}   
        </div>
    )
}

export default Nav
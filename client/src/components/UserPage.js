import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function UserPage({ user, setUser }) {
    
    const history = useHistory()
    const params = useParams()
    const [profile, setProfile] = useState(null)
    const [notFound, setNotFound] = useState('')
    const [posts, setPosts] = useState([])
    const [prompts, setPrompts] = useState([])
    const [favorites, setFavorites] = useState([])
    const [passwordChange, setPasswordChange] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(true)
    const [adminChange, setAdminChange] = useState(false)
    const [adminCode, setAdminCode] = useState('')
    const [validCode, setValidCode] = useState(true)

    useEffect(() => {
        fetch(`/users/${params.username}`)
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then((profile) => {
                    setProfile(profile)
                    setPosts(profile.posts.sort((a, b) => {
                        return new Date(b.created) - new Date(a.created)
                    }))
                    setFavorites(profile.favorite_posts.sort((a, b) => {
                        return new Date(b.created) - new Date(a.created)
                    }))
                    setPrompts(profile.prompts.sort((a, b) => {
                        return new Date(b.created) - new Date(a.created)
                    }))
                })
            } else {
                res.json()
                setNotFound('User not found.')
            }
        });
    }, [params.username]);

    function handleDelete(id) {
        const updatedPosts = posts.filter(post => post.id !== id)
        setPosts(updatedPosts)       
    }

    function handleDeleteAccount() {
        fetch(`/users/${params.username}`, {
            method:"DELETE"
        })
        .then((res) => {
            if (res.ok) {
                history.push('/')
                if (user.username === profile.username) {
                    setUser(null)
                }
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if ((password.length < 5) || (password.length > 20)) {
            setValidPassword(false)
            return
        }

        fetch(`/users/${profile.username}`, {
          method:"PATCH",  
          headers: {
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              password:password,
          })          
        })
        setValidPassword(true)
        setPassword('')
        setPasswordChange(false)
    }

    function handleAdminChange(e) {
        e.preventDefault()
        fetch(`/admintoggle/${profile.username}/${adminCode}`, {
            method:"PATCH"  
        })
        .then(res => {
            if (res.status === 401) {
                setValidCode(false)
            } else if (res.status === 200) {
                setValidCode(true)
                setAdminChange(false)
                setAdminCode('')
            }
        })      
    }

    function handleAddFavorite(post) {
        if (user.username === profile.username) {
            if (!favorites.some((favorite) => favorite.id === post.id)) {
                setFavorites([...favorites, post])
            }
        }
    }
    
    function handleDeleteFavorite(id) {
        if (user.username === profile.username) {
            const updatedFavorites = favorites.filter(post => post.id !== id)
            setFavorites(updatedFavorites)
        }
    }

    if (!profile) {
        return (
            <h1>{notFound ? notFound : ''}</h1>
        )
    }

    return (
        <div className='user-page'>
            <h1>{profile.username} {profile.admin ? `(Admin)` : null}</h1>
            <p>Joined on: {profile.created}</p>
            {((user && user.id === profile.id) || (user && user.admin === true)) ? <button onClick={() => setAdminChange(!adminChange)}>Toggle Admin</button> : null}
            {adminChange ? 
                <form onSubmit={handleAdminChange}>
                    {validCode ? null : <p style={{color:"red"}}>Invalid code</p>}
                    <input id='admin-code' name='admin-code' placeholder='ADMIN CODE' onChange={(e) => setAdminCode(e.target.value)} value={adminCode}/>
                    <button type='submit'>Submit</button>
                </form> : null}
            {profile.admin ? <h1>Prompts</h1> : null}
            {profile.admin ? prompts.map((prompt) => (
                <Prompt key={prompt.id} prompt={prompt} user={user}/>
            )) : null}
            <h1>Posts</h1>
            {posts.map((post => (
                <Post key={post.id} post={post} user={user} onDelete={handleDelete} onAddFavorite={handleAddFavorite} onDeleteFavorite={handleDeleteFavorite}/>
            )))}
            <h1>Favorites</h1>
            {favorites.map((post => (
                <Post key={post.id} post={post} user={user} onDelete={handleDelete} onAddFavorite={handleAddFavorite} onDeleteFavorite={handleDeleteFavorite}/>
            )))}
            {(user && user.id === profile.id) ? <button onClick={() => setPasswordChange(!passwordChange)}>Change Password</button> : null}
            {(user && user.id === profile.id) || (user && user.admin) ? <button onClick={handleDeleteAccount}>Delete Account</button> : null}
            <br/>
            {passwordChange ? 
                <form onSubmit={handleSubmit}>
                    {validPassword ? null : <p style={{color:"red"}}>Password must be between 5 and 20 characters</p>}
                    <input id='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <button type='submit'>Submit</button>
                </form> : null}
        </div>
    )

}

export default UserPage
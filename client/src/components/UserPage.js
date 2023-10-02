import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function UserPage({ user, setUser }) {
    
    const history = useHistory()
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState('');
    const [posts, setPosts] = useState([])
    const [prompts, setPrompts] = useState([])
    const [favorites, setFavorites] = useState([])
    
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
            {(user && user.id === profile.id) || (user && user.admin) ? <button onClick={handleDeleteAccount}>Delete Account</button> : null}
            <br/>
        </div>
    )

}

export default UserPage
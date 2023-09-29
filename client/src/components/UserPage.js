import React, { useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function UserPage({ user, setUser }) {
    
    const history = useHistory()
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState('');
    const [posts, setPosts] = useState([])
    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        fetch(`/users/${params.username}`)
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then((profile) => {
                    setProfile(profile)
                    setPosts(profile.posts)
                    setFavorites(profile.favorite_posts)
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
                setUser(null)
            }
        })
    }

    function handleAddFavorite(post) {
        setFavorites([...favorites, post])
    }

    function handleDeleteFavorite(id) {
        const updatedFavorites = favorites.filter(post => post.id !== id)
        setFavorites(updatedFavorites)
    }
    
    if (!profile) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }

    return (
        <>
            <h1>{profile.username}</h1>
            <p>Joined on: {profile.created}</p>
            {profile.admin ? <h2>Prompts</h2> : null}
            {profile.admin ? profile.prompts.map((prompt) => (
                <Prompt key={prompt.id} prompt={prompt} user={user}/>
            )) : null}
            <h2>Posts</h2>
            {posts.map((post => (
                <Post key={post.id} post={post} user={user} onDelete={handleDelete} onAddFavorite={handleAddFavorite} onDeleteFavorite={handleDeleteFavorite}/>
            )))}
            <h2>Favorites</h2>
            {favorites.map((post => (
                <Post key={post.id} post={post} user={user} onDelete={handleDelete} onAddFavorite={handleAddFavorite} onDeleteFavorite={handleDeleteFavorite}/>
            )))}
            { (user && user.id === profile.id) ? <button onClick={handleDeleteAccount}>Delete Account</button> : null}
            <br/>
        </>
    )

}

export default UserPage
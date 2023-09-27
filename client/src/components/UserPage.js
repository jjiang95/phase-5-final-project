import React, { useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";

function UserPage({ user }) {
    
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState('')
    
    useEffect(() => {
        fetch(`/users/${params.username}`)
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then((user) => {
                    setProfile(user)
                })
            } else {
                res.json()
                setNotFound('User not found.')
            }
        });
    }, [params.username]);

    if (!profile) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }

    return (
        <>
            <h1>{profile.username}</h1>
            <p>Joined on: {profile.created}</p>
            <h2>Posts</h2>
            {profile.posts.map((post => (
                <div className='post' key={post.id}>
                    <p>{post.content}</p>
                    <span>Likes: {post.likes} </span>
                    <span>Created: {post.created}</span>
                    <br/>
                    { user && user.username === profile.username ? <button>Edit</button> : null}
                    { user && user.username === profile.username ? <button>Delete</button> : null}
                </div>
            )))}
        </>
    )

}

export default UserPage
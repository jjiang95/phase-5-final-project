import React from 'react';
import { useHistory } from "react-router-dom";

function Post({ post, user }) {

    const history = useHistory()
    function handleCreatedClick() {
        if (post.user) {
            history.push(`/users/${post.user.username}`)
        }
    }
    return (
        <div className='post' key={post.id}>
            <p>{post.content}</p>
            <span>Likes: {post.likes} </span>
            <br/>
            <span onClick={handleCreatedClick}>Posted {post.user ? `by ${post.user.username}` : ''} on {post.created}</span>
            <br/>
            <button>Favorite</button>
            { user && user.id === post.user_id ? <button>Edit</button> : null}
            { user && user.id === post.user_id ? <button>Delete</button> : null}
        </div>
    )
}

export default Post
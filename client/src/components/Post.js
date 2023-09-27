import React from 'react';

function Post({ post, profile, user }) {
    return (
        <div className='post' key={post.id}>
            <p>{post.content}</p>
            <span>Likes: {post.likes} </span>
            <span>Created: {post.created}</span>
            <br/>
            { user && user.username === profile.username ? <button>Edit</button> : null}
            { user && user.username === profile.username ? <button>Delete</button> : null}
        </div>
    )
}

export default Post
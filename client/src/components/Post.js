import React from 'react';

function Post({ post, user }) {
    return (
        <div className='post' key={post.id}>
            <p>{post.content}</p>
            <span>Likes: {post.likes} </span>
            <span>Created: {post.created}</span>
            <br/>
            { user && user.id === post.user_id ? <button>Edit</button> : null}
            { user && user.id === post.user_id ? <button>Delete</button> : null}
        </div>
    )
}

export default Post
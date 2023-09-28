import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Post({ post, user, onDelete }) {

    const [postContent, setPostContent] = useState(post.content)
    const [body, setBody] = useState(postContent)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()
    
    function handleCreatedClick() {
        if (post.user) {
            history.push(`/users/${post.user.username}`)
        }
    }

    function handleEditClick() {
        setEdit(!edit)
    }

    function handleChange(e) {
        setBody(e.target.value)
    }

    function handleDeleteClick() {
        fetch(`/posts/${post.id}`, {
            method:"DELETE",        
        })
        .then(() => onDelete(post.id))
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/posts/${post.id}`, {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                content:body,
            })
        })
        .then((res) => {
            if (res.status === 200) {
                res.json()
                .then((editedPost) => {
                    setPostContent(editedPost.content)
                    setEdit(!edit)
                })
            } else {
                setError('Post cannot be empty.')
            }
        })
    }

    return (
        <div className='post' key={post.id}>
            { edit ? (
                <form onSubmit={handleSubmit} className='edit-post'>
                    <textarea name='edit-post' rows="2" cols="50" value={body} onChange={handleChange}/>
                    <button type='submit'>Post</button>
                    <p style={{color:"red"}}>{error}</p>
                </form>
                ) : <p>{postContent}</p>}
            <span onClick={handleCreatedClick}>Posted {post.user ? `by ${post.user.username}` : ''} on {post.created}</span>
            <br/>
            { user ? <button>{post.likes} 👍</button> : null}
            { user ? <button>Favorite 💗</button> : null}
            { (user && user.id === post.user_id) || (user && user.admin === true) ? <button onClick={handleEditClick}>{ edit ? 'Cancel ❌' : 'Edit ✏️'}</button> : null}
            { (user && user.id === post.user_id) || (user && user.admin === true) ? <button onClick={handleDeleteClick}>Delete 🗑️</button> : null}
        </div>
    )
}

export default Post
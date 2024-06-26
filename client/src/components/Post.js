import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Post({ post, user, onDelete, onReplyClick=null, onAddFavorite=null, onDeleteFavorite=null }) {

    const [postContent, setPostContent] = useState(post.content)
    const [body, setBody] = useState(postContent)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')
    const [favorited, setFavorited] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        function checkFavorited() {
            return user.favorite_posts.some(item => item.id === post.id)
        }
        
        if (user) {
            setFavorited(checkFavorited())
        }
    }, [user, post, setFavorited])
    
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

    function handleFavoriteClick() {
        if (!favorited) {
            fetch(`/favorites/${user.id}/${post.id}`, {
                method:"POST"
            })
            .then((res) => {
                setFavorited(!favorited)
                res.json()
                .then((post) => {
                    if (onAddFavorite) {
                        onAddFavorite(post)
                    }
                })
            })
        } else {
            fetch(`/favorites/${user.id}/${post.id}`, {
                method:"DELETE"
            })
            .then((res) => {
                setFavorited(!favorited)
                res.json()
                .then((post) => {
                    if (onDeleteFavorite) {
                        onDeleteFavorite(post.id)
                    }
                })
            })
        }
    }


    function handleReplyClick() {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
        if (post.user) {
            onReplyClick(post.content, post.user.username)
        } else {
            onReplyClick(post.content)
        }
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
            {post.user ? <span onClick={() => {history.push(`/profile/${post.user.username}`)}}>{post.user.username}:</span> : null}
            {edit ? (
                <form onSubmit={handleSubmit} className='edit-post'>
                    <textarea name='edit-post' rows="10" cols="50" value={body} onChange={handleChange}/>
                    <button type='submit'>Post</button>
                    <p style={{color:"red"}}>{error}</p>
                </form>
                ) : <p className='content'>{postContent}</p>}
            <p>Posted on: {post.created}</p>
            {post.updated_at ? <p>Edited on: {post.updated_at}</p> : null}
            {user ? <button onClick={handleFavoriteClick}>{favorited ? `♥` : `♡`}</button> : null}
            {(user && user.id === post.user_id) || (user && user.admin === true) ? <button onClick={handleEditClick}>{ edit ? 'Cancel' : '✎'}</button> : null}
            {(user && user.id === post.user_id) || (user && user.admin === true) ? <button onClick={handleDeleteClick}>🗑</button> : null}
            {(user && post.user) || (user && post.user === null) ? <button onClick={handleReplyClick}>↩</button> : null}
            {(user && post.user) || (user && post.user === null) || !user ? null : <button onClick={() => {history.push(`/prompt/${post.prompt_id}`)}}>⬅</button>}
        </div>
    )
}

export default Post
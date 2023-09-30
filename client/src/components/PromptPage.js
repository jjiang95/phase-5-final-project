import React, { useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function PromptPage({ user }) {

    const history = useHistory()
    const params = useParams()
    const [prompt, setPrompt] = useState(null)
    const [posts, setPosts] = useState(null)
    const [notFound, setNotFound] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (params.id === 'null') {
            setNotFound('Prompt not found.')
        } else {
            fetch(`/prompts/${params.id}`)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                    .then((prompt) => {
                        setPrompt(prompt)
                        setPosts(prompt.posts)
                    })
                } else {
                    res.json()
                    setNotFound('Prompt not found.')
                }
            });
        }
    }, [params.id]);

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: body,
                user_id: user.id,
                prompt_id: prompt.id
            }),
        })
        .then((res) => {
            if (res.status === 201) {
                res.json()
                .then((newPost) => {
                    setPosts([...posts, newPost])
                    setBody('')
                    setError('')
                })
            } else if (res.status === 422) {
                setError('Post cannot be empty or >600 characters.')
            }
        });
    }

    function handleDelete(id) {
        const updatedPosts = posts.filter(post => post.id !== id)
        setPosts(updatedPosts)
    }

    function handlePromptDelete() {
        fetch(`/prompts/${prompt.id}`, {
            method:"DELETE",        
        })
        .then(() => history.push(`/`))       
    }

    function handleChange(e) {
        setBody(e.target.value)
    }

    function handleReplyClick(username) {
        setBody(`Replying to ${username}:`)
    }

    if (!prompt) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }

    return (
        <>
            <Prompt prompt={prompt}/>
            { user && user.admin === true ? <button onClick={handlePromptDelete}>Delete 🗑️</button> : null}
            { user ? <form onSubmit={handleSubmit} className="new-post">
                <textarea name='post' rows="5" cols="200" placeholder="Add a post..." value={body} onChange={handleChange}/>
                <button type='submit'>Post</button>
                <p style={{color:"red"}}>{error}</p>
            </form> : null}
            {posts.map((post) => (
                <Post onDelete={handleDelete} key={post.id} user={user} post={post} onReplyClick={handleReplyClick}/>
            ))}
        </>
    )
}

export default PromptPage
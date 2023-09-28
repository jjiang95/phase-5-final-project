import React, { useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function PromptPage({ user }) {

    const params = useParams()
    const [prompt, setPrompt] = useState(null)
    const [posts, setPosts] = useState(null)
    const [notFound, setNotFound] = useState('')
    const [newPost, setNewPost] = useState('')

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/prompts/${params.id}`)
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
    }, [params.id]);

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {
        setNewPost(e.target.value)
    }

    if (!prompt) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }


    return (
        <>
            <Prompt prompt={prompt} user={user}/>
            <form onSubmit={handleSubmit} className="new-post">
                <input type='text' name='post' value={newPost} onChange={handleChange}/>
                <button type='submit'>Post</button>
            </form>
            {posts.map((post) => (
                <Post key={post.id} user={user} post={post}/>
            ))}
        </>
    )
}

export default PromptPage
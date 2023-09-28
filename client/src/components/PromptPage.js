import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function PromptPage({ user }) {

    const params = useParams()
    const [prompt, setPrompt] = useState(null)
    const [posts, setPosts] = useState(null)
    const [notFound, setNotFound] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
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
                })
            }
        });
    }

    function handleChange(e) {
        setBody(e.target.value)
    }

    if (!prompt) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }


    return (
        <>
            <Prompt prompt={prompt} user={user}/>
            { user ? <form onSubmit={handleSubmit} className="new-post">
                <input type='text' name='post' value={body} onChange={handleChange}/>
                <button type='submit'>Post</button>
            </form> : null}
            {posts.map((post) => (
                <Post key={post.id} user={user} post={post}/>
            ))}
        </>
    )
}

export default PromptPage
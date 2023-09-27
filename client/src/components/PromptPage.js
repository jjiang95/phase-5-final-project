import React, { useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import Post from './Post';
import Prompt from './Prompt';

function PromptPage({ user }) {

    const params = useParams()
    const [prompt, setPrompt] = useState(null)
    const [notFound, setNotFound] = useState('')

    useEffect(() => {
        fetch(`/prompts/${params.id}`)
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then((prompt) => {
                    setPrompt(prompt)
                })
            } else {
                res.json()
                setNotFound('Prompt not found.')
            }
        });
    }, [params.id]);

    if (!prompt) {
        return (
            <h1>{ notFound ? notFound : ''}</h1>
        )
    }


    return (
        <>
            <Prompt prompt={prompt} user={user}/>
            {prompt.posts.map((post) => (
                <Post key={post.id} user={user} post={post}/>
            ))}
        </>
    )
}

export default PromptPage
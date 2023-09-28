import React from 'react';
import { useHistory } from "react-router-dom";

function Prompt({ prompt, user }) {

    const history = useHistory()

    function onPromptClick() {
        history.push(`/prompts/${prompt.id}`)
    }
    
    function onCreatedClick() {
        if (prompt.user) {
            history.push(`/users/${prompt.user.username}`)
        }
    }

    return (
        <div className='prompt' key={prompt.id}>
            <h1 onClick={onPromptClick}>{prompt.content}</h1>
            <span onClick={onCreatedClick}>Created {prompt.user ? `by ${prompt.user.username}` : ''} on {prompt.created}</span>
            <br/>
            { user && user.id === prompt.user_id ? <button>Delete 🗑️</button> : null}   
        </div>
    )
}

export default Prompt
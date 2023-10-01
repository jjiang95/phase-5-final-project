import React from 'react';
import { useHistory } from "react-router-dom";

function Prompt({ prompt }) {

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
            <h2 onClick={onPromptClick}>{prompt.content}</h2>
            <p onClick={onCreatedClick}>Created {prompt.user ? `by ${prompt.user.username}` : ''} on {prompt.created}</p>
        </div>
    )
}

export default Prompt
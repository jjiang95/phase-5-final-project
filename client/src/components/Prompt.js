import React from 'react';

function Prompt({ prompt, user }) {
    return (
        <div className='prompt' key={prompt.id}>
            <h1>{prompt.content}</h1>
            <p>{prompt.created}</p>
            { user && user.id === prompt.user_id ? <button>Edit</button> : null}
            { user && user.id === prompt.user_id ? <button>Delete</button> : null}        
        </div>
    )
}

export default Prompt
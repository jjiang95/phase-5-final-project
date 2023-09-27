import React from 'react';

function Prompt({ prompt }) {
    return (
        <div className='prompt' key={prompt.id}>
            <h1>{prompt.content}</h1>
            <p>{prompt.created}</p>
        </div>
    )
}

export default Prompt
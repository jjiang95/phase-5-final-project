import React, { useState, useEffect } from 'react';
import Prompt from './Prompt';

function Home() {
    const [prompts, setPrompts] = useState([])
    
    useEffect(() => {
        fetch(`/prompts/all`)
        .then((r) => r.json())
        .then(prompts => {
            setPrompts(prompts)
        })
    }, [])

    return (
        <>
            {prompts.map((prompt => (
                <Prompt key={prompt.id} prompt={prompt}/>
            )))}
        </>
    )
}

export default Home;
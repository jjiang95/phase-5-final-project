import React, { useState, useEffect } from 'react';
import Prompt from './Prompt';

function Home() {
    const [prompts, setPrompts] = useState([])
    
    useEffect(() => {
        fetch(`/prompts/all`)
        .then((r) => r.json())
        .then(prompts => {            
            setPrompts(prompts.sort((a, b) => {
                return new Date(b.created) - new Date(a.created)
            }))
        })
    }, [])
    
    return (
        <div className='home'>
            {prompts.map((prompt => (
                <Prompt key={prompt.id} prompt={prompt}/>
            )))}
        </div>
    )
}

export default Home;
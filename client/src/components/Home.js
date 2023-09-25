import React, { useState, useEffect } from 'react';

function Home() {
    const [prompts, setPrompts] = useState([])
    
    useEffect(() => {
        fetch('/prompts/all')
        .then((r) => r.json())
        .then(prompts => {
            setPrompts(prompts)
        })
    }, [])

    return (
        <>
            {prompts.map((item => (
            <div className='prompt-card' key={item.id}>
              <h1>{item.content}</h1>
              <p>{item.created}</p>
            </div>
            )))}
        </>
    )
}

export default Home;
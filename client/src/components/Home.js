import React, { useState, useEffect } from 'react';

function Home() {

    const [prompts, setPrompts] = useState([])
    
    useEffect(() => {
        fetch('/all-prompts')
        .then((r) => r.json())
        .then(prompts => {
            console.log(prompts)
            setPrompts(prompts)
        })
    }, [])

    return (
        <>
            {prompts.map((item => (
            <div className='prompt-card'>
              <h1 key={item.id}>{item.content}</h1>
              <p key={item.id}>{item.created}</p>
            </div>
            )))}
        </>
    )
}

export default Home;
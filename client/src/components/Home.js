import React, { useState, useEffect } from 'react';

function Home() {

    const [data, setData] = useState([])
    
    useEffect(() => {
        fetch('/home')
        .then((r) => r.json())
        .then(data => setData(data))
    }, [])

    return (
        <div>
            {data.map((item => (
                <>
                <h1 key={item.id}>{item.username}</h1>
                <p key={item.id}>{item.posts[0]['content']}</p>
                <span key={item.id}>{item.posts[0]['created']}</span>
                </>
            )))}
        </div>
    )
}

export default Home;
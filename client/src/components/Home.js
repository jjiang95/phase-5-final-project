import React, { useState, useEffect } from 'react';

function Home() {

    const [data, setData] = useState([])
    
    useEffect(() => {
        fetch('/home')
        .then((r) => r.json())
        .then(data => {
            console.log(data)
            setData(data)
        })
    }, [])

    return (
        <div>
            {data.map((item => (
              <h1 key={item.id}>{item.id}</h1>
            )))}
        </div>
    )
}

export default Home;
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewPrompt({ user }) {
    const history = useHistory()
    const [body, setBody] = useState('')
    const [error, setError] = useState('')
    
    function handleChange(e) {
        setBody(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/prompts/all`, {
           method: "POST",
           headers: {
            "Content-Type": "application/json",            
           },
           body: JSON.stringify({
            content:body,
            user_id:user.id
           }),
        })
        .then((res) => {
            if (res.status === 201) {
                res.json()
                .then((newPrompt) => {
                    history.push(`/prompts/${newPrompt.id}`)
                })
            } else if (res.status === 422) {
                setError('Prompt cannot be empty or >150 characters.')
            }
        })
    }

    if (!user || user.admin === false)
    return (
        <h1>401 -- Unauthorized</h1>
    )

    return (
        <>
            <h1>Create New Prompt</h1>
            <form onSubmit={handleSubmit} className="new-post">
                <textarea name='post' rows="5" cols="200" placeholder="Add a post..." value={body} onChange={handleChange}/>
                <button type='submit'>Post ✍️</button>
                <p style={{color:"red"}}>{error}</p>
            </form>
        </>
    )
}

export default NewPrompt
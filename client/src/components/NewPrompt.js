import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewPrompt({ user }) {
    const history = useHistory()
    const [body, setBody] = useState('')
    
    function handleChange(e) {
        setBody(e.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
    }

    if (!user || user.admin === false)
    return (
        <h1>Unauthorized.</h1>
    )

    return (
        <>
            <h1>Create New Prompt</h1>
            <form onSubmit={handleSubmit} className="new-post">
                <textarea name='post' rows="5" cols="200" placeholder="Add a post..." value={body} onChange={handleChange}/>
                <button type='submit'>Post</button>
            </form>
        </>
    )
}

export default NewPrompt
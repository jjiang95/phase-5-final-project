import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from 'yup';

function Signup({ handleLogin }) {
    const history = useHistory()
    const [errorState, setErrorState] = useState('')

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(20),
        password: yup.string().required("Must enter a password").max(20),
        confirmation: yup.string().required("Must confirm password").max(20),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmation: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 201) {
                    setErrorState('Success')
                    handleLogin(res)
                } else if (res.status === 400) {
                    setErrorState('Username already taken')
                } else if (res.status === 422) {
                    setErrorState('Invalid inputs')
                }
            }).then(history.push('/'))
        },   
    });
    return (
        <>
            <h1>Create Account</h1>
            <form onSubmit={formik.handleSubmit}>
                <p>{errorState}</p>
                <label htmlFor='username'>Username:</label>
                <br/>
                <input id='username' name='username' onChange={formik.handleChange} value={formik.values.username}/>
                <p style={{ color: "red"}}>{formik.errors.username}</p>
                <label htmlFor='password'>Password:</label>
                <br/>
                <input id='password' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                <p style={{ color: "red"}}>{formik.errors.password}</p>
                <label htmlFor='confirmation'>Confirm Password:</label>
                <br/>
                <input id='confirmation' name='confirmation' onChange={formik.handleChange} value={formik.values.confirmation}/>
                <p style={{ color: "red"}}>{formik.errors.confirmation}</p>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Signup